

"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import socket from "./socket";

export default function AllUsers({ roomid, users, host, onClose }) {
  const [allowedlist, setallowedlist] = useState([]);

  useEffect(() => {
    const handler = (list) => setallowedlist(list);
    socket.on("granted", handler);
    return () => socket.off("granted", handler);
  }, []);

  function handelremove(targetedid) {
    socket.emit("re-assign", { roomid, targetedid });
  }

  useEffect(() => {
    if (!roomid) return;
    socket.emit("allow-list", roomid);

    const listHandler = (list) => setallowedlist(list);
    socket.on("list", listHandler);

    return () => socket.off("list", listHandler);
  }, [roomid]);

  if (!users || users.length === 0) return null;

  const hostUser = users.find((u) => u.user === host) || null;
  const otherUsers = hostUser
    ? users.filter((u) => u.user !== host)
    : users;

  function handleclick(targetedid) {
    socket.emit("grant-draw", { roomid, targetedid });
  }

  const hoster = allowedlist[0];
  const properhost = socket.id == hoster;

  return createPortal(
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-[99999]" />

      {/* Modal */}
      <div className="fixed inset-0 z-[100000] flex items-center justify-center px-4">
        <div
          className="
            w-full max-w-md
            bg-gradient-to-br from-[#1b253a] to-[#111827]
            rounded-3xl
            p-7
            shadow-[0_20px_60px_rgba(0,0,0,0.6)]
            text-white
            flex flex-col
            border border-white/10
          "
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Collaborators
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage drawing permissions
            </p>
          </div>

          {/* Host */}
          <div className="mt-7">
            <h3 className="text-sm uppercase tracking-wide text-gray-400 mb-2">
              Host
            </h3>

            {hostUser && (
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 border border-yellow-400/20">
                <div>
                  <p className="font-semibold text-yellow-300 text-lg">
                    {hostUser.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    Created this room
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-black shadow">
                  HOST
                </span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Users */}
          <div className="flex-1">
            <h3 className="text-sm uppercase tracking-wide text-gray-400 mb-3">
              Users Joined · {otherUsers.length}
            </h3>

            <div
              className="
                space-y-3
                max-h-[260px]
                overflow-y-auto
                pr-1
                scrollbar-thin
                scrollbar-thumb-white/20
                scrollbar-track-transparent
              "
            >
              {otherUsers.map((u, i) => {
                const assigned = allowedlist.includes(u.user);

                return (
                  <div
                    key={i}
                    className="
                      flex items-center justify-between
                      rounded-xl
                      bg-white/5
                      px-4 py-3
                      border border-white/10
                      hover:bg-white/10
                      transition
                    "
                  >
                    <span className="font-medium">{u.name}</span>

                    {properhost && (
                      assigned ? (
                        <button
                          onClick={() => handelremove(u.user)}
                          className="
                            px-4 py-1.5
                            rounded-full
                            text-xs font-semibold
                            bg-red-500/90
                            hover:bg-red-600
                            transition
                          "
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={() => handleclick(u.user)}
                          className="
                            h-8 w-8
                            flex items-center justify-center
                            rounded-full
                            bg-emerald-500
                            hover:bg-emerald-600
                            text-lg font-bold
                            transition
                          "
                        >
                          +
                        </button>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 text-center">
            <button
              onClick={onClose}
              className="
                w-full
                py-2.5
                rounded-xl
                bg-white/10
                hover:bg-white/20
                transition
                font-medium
              "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
