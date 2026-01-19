"use client";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useEffect, useRef, useState } from "react";
import socket from "./socket";
import { useSearchParams } from "next/navigation";
import SpinnerButton from "./spinner";
export default function Whiteboard({ avatar,host }) {
  const editorRef = useRef(null);
  const params = useSearchParams();
  const roomId = params.get("room");
  const [showDrawHint, setShowDrawHint] = useState(true);
  const [allowedList, setAllowedList] = useState([]);
  const [isSynced,setisSynced]=useState(false)
  const [editorReady, setEditorReady] = useState(false);

  // store pending diffs before editor mounts
  const pendingDiffs = useRef([]);
  // remember join state so we don't emit join multiple times
  const hasJoined = useRef(false);

  // stable name: generate once
  const nameRef = useRef(null);
  if (!nameRef.current) {
    const firstNames = ["Blue", "Silent", "Mighty", "Golden", "Shadow", "Rapid"];
    const lastNames = ["Tiger", "Falcon", "Wolf", "Eagle", "Lion"];
    const f = firstNames[Math.floor(Math.random() * firstNames.length)];
    const l = lastNames[Math.floor(Math.random() * lastNames.length)];
    const num = Math.floor(Math.random() * 9000);
    nameRef.current = `${f} ${l}`;
  }
  const name = nameRef.current;

  // persistent client id (survives refresh in same tab)
  let userid = sessionStorage.getItem("userid");
  if (!userid) {
    userid = "UX-" + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem("userid", userid);
  }

  // On connect / when socket id becomes available: join once (or reconnect)
  useEffect(() => {
    const tryJoin = () => {
   
      // if already joined, this is a reconnect: request allow-list + state
      if (hasJoined.current) {
        if (!roomId) return;
        socket.emit("allow-list", roomId);
        socket.emit("get-state", roomId);
        return;
      }
      

      // first-time join
      if (!roomId || !avatar) return;
      socket.emit("join-room", { roomId, userid, avatar, name });
      setisSynced(true)
      // request initial lists/state
      socket.emit("allow-list", roomId);
      socket.emit("get-state", roomId);
    };

    // If socket already connected, try to join immediately
    if (socket.connected) tryJoin();
    // Also listen to future connect events (reconnect)
    socket.on("connect", tryJoin);

    return () => {
      socket.off("connect", tryJoin);
    };
  }, [roomId, avatar, userid, name]);

  // single place for socket listeners
  useEffect(() => {
    // ALLOWED list (server sends array)
    const onGranted = (list) => {
      if (!Array.isArray(list)) return setAllowedList([]);
      setAllowedList(list);
    };
    socket.on("granted", onGranted);

    // LIST response when requesting allow-list (sender gets it)
    const onList = (list) => {
      if (!Array.isArray(list)) return setAllowedList([]);
      setAllowedList(list);
    };
    socket.on("list", onList);

    // SYNC-UPDATES from other clients (patch)
    const onSyncUpdate = (diff) => {
      const editor = editorRef.current;
      if (!editor || !diff) return;
      editor.store.mergeRemoteChanges(() => editor.store.applyDiff(diff));
    };
    socket.on("sync-update", onSyncUpdate);

    // STATE: array of diffs from server (apply all in order)
    const onState = (diffArray) => {
       setisSynced(false)
      if (!Array.isArray(diffArray) || diffArray.length === 0) return;
      const editor = editorRef.current;
      if (!editor) {
        // queue up diffs until editor mounts
        pendingDiffs.current.push(...diffArray);
        return;
      }
      editor.store.mergeRemoteChanges(() => {
        diffArray.forEach((d) => {
          try {
            editor.store.applyDiff(d);
          } catch (e) {
            console.warn("applyDiff failed for element in state", e);
          }
        });
      });
      
    };
    socket.on("state", onState);

    // cleanup
    return () => {
      socket.off("granted", onGranted);
      socket.off("list", onList);
      socket.off("sync-update", onSyncUpdate);
      socket.off("state", onState);
    };
  }, []);



  // handle mount: set editorRef, apply pending diffs, register store listener if allowed
  const handleMount = (editor) => {
    editorRef.current = editor;
    setEditorReady(true)
    
    // apply any queued diffs
   const unsubscribeInteraction = editor.store.listen(
    (event) => {
      if (event.source === "user") {
        setShowDrawHint(false);
        unsubscribeInteraction(); // run only once
      }
    },
    { scope: "document" }
  );
    if (pendingDiffs.current && pendingDiffs.current.length > 0) {
      try {
        editor.store.mergeRemoteChanges(() => {
          pendingDiffs.current.forEach((d) => editor.store.applyDiff(d));
        });
      } catch (e) {
        console.warn("Failed applying pending diffs:", e);
      }
      pendingDiffs.current = [];
      setisSynced(true)
    }
    if(pendingDiffs.current.length===0){
      setisSynced(false)
    }
    // only start listening to local changes if allowed to draw
    const canDraw = host || allowedList.includes(socket.id);
    if (!canDraw) {
      // readOnly handled via prop too
      return;
    }

    // register store listener and keep unsubscribe
    const unsubscribe = editor.store.listen(
      (event) => {
        if (event.source === "remote") return;
        const diff = event.changes;
        if (!diff) return;
        socket.emit("sync-update", { roomId, diff });
      },
      { source: "user", scope: "document" }
    );

    // save unsubscribe on editorRef so we can call it when needed (e.g., on re-mount)
    editorRef.current._unlisten = unsubscribe;
 
  };

 
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const canDraw = host || allowedList.includes(socket.id);

    if (canDraw && !editorRef.current._unlisten) {
      // attach listener if not already attached
      const unsubscribe = editor.store.listen(
        (event) => {
          if (event.source === "remote") return;
          const diff = event.changes;
          if (!diff) return;
          socket.emit("sync-update", { roomId, diff });
        },
        { source: "user", scope: "document" }
      );
      editorRef.current._unlisten = unsubscribe;
    }

    if (!canDraw && editorRef.current._unlisten) {
      // detach if we lost permission
      try {
        editorRef.current._unlisten();
      } catch (e) {}
      delete editorRef.current._unlisten;
    }
  }, [allowedList, roomId]);

  if (!roomId) return <div>No room found</div>;


  // );
  return (
  <div className="relative w-full h-[calc(100vh-90px)] bg-gray-100">
    
    { host && showDrawHint && (
<div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 pointer-events-none">
  <div className="text-gray-400/70 text-lg font-medium">
    Start drawing...
  </div>
  <div className="text-gray-500 text-sm">
    Select a tool from below or press <span className="font-semibold">B</span>
  </div>
</div>
    )}
    {   isSynced && (
  <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur">
    <SpinnerButton />
  </div>
)}


    <Tldraw
      onMount={handleMount}
      onPointerDown={() => setShowDrawHint(false)}
    />
  </div>
);



}