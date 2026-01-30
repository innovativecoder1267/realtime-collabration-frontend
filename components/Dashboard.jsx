 "use client"
 import React, { use, useEffect, useRef, useState } from "react"
 import Whiteboard from "./excalidraw"
 import socket from "./socket"
 import Invite from "./Invitemembers"
 import { motion } from "framer-motion"
 import AllUsers from "./user"
 import { useSearchParams } from "next/navigation"
 import { jwtDecode } from "jwt-decode"
 import ChatSystem from "./chatsystem"
 import RolePopup from "./rolepopup"
 import KanbanBoard from "./kanban"
 import AudioControls from "./audio"
 import HostVoicePopup from "./hostpopup"
 import InCallControls from "./Incallcontrols"
 import { createPortal } from "react-dom"
 import ManageRoom from "./Manageroom"
 import { useRouter } from "next/navigation";
 import {
  LayoutList,
  Users,
  Sun,
  Moon,
  Bell, 
  MessageCircle,
  MessageCircleHeart,
} from "lucide-react"
import axios from "axios" 
import { AlertDemo } from "./alertdemo"       

export default function Dashboard() {
  const [darkMode,setDarkMode] = useState(true)
  const [url, seturl] = useState("")
  const [joined, setjoined] = useState(false)
  const [user,setuser] = useState()
  const [invite, setinvite]=useState(false)
  const [numbers, setnumbers] = useState(0)
  const [notifications, setnotification] = useState([])
  const [Openbell, setOpenbell] = useState(false)
  const [openchat, setChatOpen] = useState(false)
  const [openusers, setopenusers] = useState(false)
  const [usersinroom,setusers]=useState([])
  const [allowed,setallowed]=useState([])
  const [avatar,setavatar]=useState("")
  const [hostid,sethostid]=useState(null)
  const [closed,setclosed]=useState(false)
  const [name,setname]=useState([])
  const param=useSearchParams()
  const [fromsocket,setfromsocket]=useState([])
  const [fromname,setfromname]=useState([])
  const roomid=param.get("room")
    const [popup,setpopup]=useState("")
  const [visible,setvisible]=useState(false)
  const [comingsoon,setcomingsoon]=useState(false)
  const [hostmessage,sethostmessage]=useState([])
  const [alertpopup,setalertpopup]=useState(null);
  const [connectmssg,setuimessage]=useState([])
  const [callState, setCallState] = useState("idle");
  const [popuptrue,setpopuptrue]=useState(false)
  const [muted,setmuted]=useState(false)
  const [Manageroom,setmanageroom]=useState(false)
  const [endroom,setendroom]=useState([])
  const [activeroom,setactiveroom]=useState(false)
  const [endtrue,setendroomtrue]=useState(false)
  const router=useRouter();
function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // not expired
  } catch (e) {
    return false; // decode failed = invalid token
  }
}
  const pcref=useRef(null)
  useEffect(()=>{
    const token=localStorage.getItem("token")

    function getrandomavatar(){
    const list = [
          "https://api.dicebearcom/7.x/thumbs/svg?seed=Neo",
          "https://api.dicebear.com/7.x/thumbs/svg?seed=Sam",
          "https://api.dicebear.com/7.x/bottts/svg?seed=Alpha",
          "https://api.dicebear.com./7.x/big-smile/svg?seed=Joy",
      "https://api.dicebear.com/7.x/pixel-art/svg?seed=UserX",
       
    ];
 return list[Math.floor(Math.random() * list.length)];
    }
    if(!token||!isTokenValid(token)){
      const guest=getrandomavatar()
      setavatar(guest)
      console.log(guest)
      return;
    }
    async function makereq() {
    try {
       const res=await axios.get(" https://realtime-collabration-backend.onrender.com/getavatar",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log("avatar is",res.data.data)
      setavatar(res.data.data)
    
    } catch (error) {
     console.error("error is",error?.message)
     alert("something went wrong"+error.message) 
    }
    }
    if(token){
      makereq();
    }
    },[])
    useEffect(()=>{
      socket.on("host-updated",(host)=>{
        console.log("Host updated",host.socketid)
        sethostid(host.socketid)
      })
      return () => socket.off("host-updated")
    },[])
    useEffect(()=>{
      setTimeout(() => {
        setpopuptrue(false)
      }, 3000);
    },[popuptrue])
      useEffect(()=>{
        const handler=(alertmessage)=>{
          setalertpopup(alertmessage)
          setpopuptrue(true)
        }
        socket.on("leaved",handler)
        return ()=>socket.off("leaved",handler)
      },[])


    useEffect(() => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    
    pc.onnegotiationneeded = async () => {
    if (!fromsocket) return;

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("webrtc-offer", {
    targetedsocketid: fromsocket,
    offer,
  });
};
    pcref.current = pc;

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          targetedsocketid:fromsocket,
          candidate: event.candidate,
        });
      }
    };
  

    pc.ontrack = (event) => {
      const audio = document.createElement("audio");
      audio.srcObject = event.streams[0];
      audio.autoplay = true;
    };

    const iceHandler = async ({ candidate }) => {
      if (candidate && pcref.current) {
        await pcref.current.addIceCandidate(candidate);
      }
    };

    socket.on("ice-candidate", iceHandler);

    return () => {
      socket.off("ice-candidate", iceHandler);
      pc.close();
      pcref.current = null;
    };
  }, [fromsocket]);
  useEffect(() => {
  const handler = async ({ from, offer }) => {
    console.log("WEBRTC OFFER RECEIVED");

    const pc = pcref.current;
    if (!pc) return;

    await pc.setRemoteDescription(offer);

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    socket.emit("webrtc-answer", {
      targetedsocketid: from,
      answer,
    });
    setCallState("connecting")
  };
  
  socket.on("webrtc-offer", handler);
  return () => socket.off("webrtc-offer", handler);
}, []);
useEffect(() => {
  socket.on("webrtc-answer", async ({ answer, from }) => {
    const pc = pcref.current;
    if (!pc) return;

    // 🔥 MOST IMPORTANT LINE
    await pc.setRemoteDescription(answer);

    setCallState(prev =>(prev==="connecting"? "connected":prev))
  });

  return () => socket.off("webrtc-answer");
}, []);
 async function handleAccept() {
  console.log("function started")
  const pc = pcref.current;
  if (!pc) return;

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  stream.getTracks().forEach(track => pc.addTrack(track, stream));
   console.log("HOST ACCEPTED → START WEBRTC");
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  setCallState("connecting");
  socket.emit("webrtc-offer", {
    targetedsocketid: fromsocket, //  ya host jisko bhi
    offer,
  });

}


  function handle() {
    setinvite(true)
    setactiveroom(true)
  }
  useEffect(()=>{
    socket.on("role-popup",(data)=>{
      setpopup(data.message)
      setvisible(true)
    })
  },[])
  useEffect(()=>{
    socket.on("voice-popup",({name,fromsocketid,message})=>{
      
    sethostmessage(message)
    setfromsocket(fromsocketid)
    console.log("socket id is ",fromsocketid)
    setfromname(name)
    setCallState("ringing")
  })
  },[])
  useEffect(()=>{
    if(!endtrue)return
    setTimeout(() => {
      setendroomtrue(false)
    },3000);
  },[endtrue])
  useEffect(()=>{
    if(!visible)return; 
    setTimeout(() => {
      setvisible(false)
    }, 3000);
  },[visible])
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server", socket.id)
    })

    // 1️⃣ Load saved notifications on mount    
    socket.on("disconnect", () => {
      console.log("Disconnected from server")
    })

    return () => {
      socket.off("new-user")
    }
  }, []) 
  useEffect(() => {
  const savedNotifications = sessionStorage.getItem("notifications");
  const savedCount = sessionStorage.getItem("notificationCount");

  if (savedNotifications) {
    setnotification(JSON.parse(savedNotifications));
  }
  if (savedCount) {
    setnumbers(Number(savedCount));
  }
}, []);

// 2️⃣ Save notifications + count whenever they change
useEffect(() => {
  sessionStorage.setItem("notifications", JSON.stringify(notifications));
  sessionStorage.setItem("notificationCount", numbers.toString());
}, [notifications, numbers]);

// 3️⃣ Handle new user join
useEffect(() => {
  socket.on("new-user", (message) => {
    setjoined(true);
    setuser(message);

    setnumbers((prev) => prev + 1);
    setnotification((prev) => [...prev, message]);
  });

  return () => socket.off("new-user");
}, []);


  useEffect(() => {
    if (joined) {
      setTimeout(() => {
      setjoined(false)
      }, 3000)
    }
  })
  useEffect(()=>{
      socket.on("name",(rooms)=>{
      setname(rooms.name)
      setusers(rooms)
  })
  },[])
  useEffect(()=>{
    socket.on("user",(list)=>{
      console.log(list)
      setusers(list)
    })
  },[])
  useEffect(()=>{
    socket.emit("allow-list",roomid)
    const listenhandler=(list)=>{
      setallowed(list)
      sethostid(list[0])
      console.log("host id is",hostid)
    }
    socket.on("list",listenhandler)
    return ()=>{
      socket.off("list",listenhandler)
    }
  },[])
  function MuteLogic(){
    const pc=pcref.current
    if(!pc)return

    pc.getSenders().forEach(sender =>{
      if(sender.track && sender.track.kind=="audio"){
        sender.track.enabled=muted
      }
    })
    setmuted(prev =>!prev)
  }
     function handleEndroom(){
     console.log("END ROOM EMIT", roomId);
     socket.emit("end-room",roomId)
  }
  
  function handleleave(){
  console.log("CALL ENDED");
  /* 1️⃣ WebRTC cleanup */
   
  if (pcref.current) {
    pcref.current.getSenders().forEach(sender => {
      sender.track?.stop();   // mic stop
    });

    pcref.current.close();
    pcref.current = null;
  }

  /* 2️⃣ Notify other peer */
    console.log("socket id is ",fromsocket)
    socket.emit("leave-call", {
      roomid,
      uimessage:"Host has disconnected"
  })
  setCallState("idle")
  /* 3️⃣ Reset states */
 
}
  useEffect(()=>{
    const handler=(message)=>{
      setendroom(message)
      setendroomtrue(true)
      setallowed([])
      setusers([])
      setmanageroom(false)
      setopenusers(false)
      sethostid("")
      router.replace("/dashboard")
    }
    socket.on("ended",handler)
    return () =>socket.off("ended",handler)
  },[])
  useEffect(()=>{
    socket.on("user-removed",(message)=>{
      console.log("user removed successfully",message)
    })
  },[])

const otherusers=usersinroom.find((u)=>u.user!=hostid)
 
return (
  <div
    className={`flex h-screen w-screen overflow-hidden transition-colors duration-300 ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
    }`}
  >
    {/* SIDEBAR */}
    <div
      className={`w-64 p-4 flex-col hidden md:flex ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`flex items-center gap-2 mb-6 px-3 py-2 rounded-md ${
          darkMode
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
      </button>

      <nav className="space-y-2">
        <div
          className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white cursor-pointer"
          onClick={() => setcomingsoon(true)}
        >
          <div className="flex items-center gap-3">
            <LayoutList size={18} />
            <span>Kanban</span>
          </div>
          <span className="text-xs bg-gray-600 px-2 py-0.5 rounded-md">
            Pro
          </span>
        </div>

        <div className="border-t border-gray-600 my-4"></div>

        <div
          onClick={() => setopenusers(true)}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white cursor-pointer"
        >
          <Users size={18} />
          <span>Users</span>
        </div>
      </nav>
    </div>

    {/* MAIN AREA */}
    <div className="flex-1 flex flex-col min-w-0">

      {/* TOP BAR */}
      <div
        className="
          flex flex-wrap md:flex-nowrap
          items-center gap-2
          justify-between
          px-3 md:px-6 py-3
        "
      >
        {/* LEFT */}
        <div className="flex-shrink-0">
          <AudioControls
            isHost={socket.id===hostid}
            roomid={roomid}
            targetedsocketid={socket.id}
            name={name}
            callstate={callState}
            ismanageroom={() => setmanageroom(true)}
          />
        </div>

        {/* CREATE ROOM – NEVER HIDES */}
        {!roomid && (
          <button
            onClick={handle}
            className="
              h-9 px-4
              rounded-lg
              bg-gradient-to-r from-indigo-600 to-purple-600
              text-white text-sm font-medium
              shadow-md
              whitespace-nowrap
              transition-all
              scale-95 sm:scale-100
            "
          >
            + Create Room
          </button>
        )}

        {/* RIGHT CLUSTER */}
        <div
          className="
            flex items-center gap-3
            ml-auto
            scale-95 sm:scale-100
          "
        >
          {/* CHAT */}
          <button
            onClick={() => setChatOpen(true)}
            className="
              bg-indigo-600 text-white
              px-3 py-2 rounded-lg
              text-sm
              hidden sm:flex
              items-center gap-2
              hover:bg-indigo-700
            "
          >
            <MessageCircle size={16} />
            <span className="hidden md:inline">Chat</span>
          </button>

          {/* BELL */}
          <div className="relative cursor-pointer">
            <Bell size={20} onClick={() => setOpenbell(!Openbell)} />
            <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white rounded-full px-1">
              {numbers > 99 ? "99+" : numbers}
            </span>
          </div>

          {/* AVATAR */}
          <img
            src={avatar}
            className="h-8 w-8 rounded-full border border-white"
          />
        </div>
      </div>

      {/* NOTIFICATIONS */}
      {Openbell && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            fixed top-16 right-3
            w-72
            rounded-xl shadow-xl
            bg-gray-800
            z-[9999]
          "
        >
          <div className="p-3 font-semibold border-b">Notifications</div>
          <div className="max-h-60 overflow-y-auto p-3 space-y-2">
            {notifications.length === 0 ? (
              <p className="text-sm opacity-60">No notifications</p>
            ) : (
              notifications.map((n, i) => (
                <div
                  key={i}
                  className="p-2 rounded bg-gray-700 text-sm"
                >
                  {n}
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}

      {/* POPUPS */}
      {popuptrue &&
        alertpopup &&
        createPortal(
          <div className="fixed top-6 right-6 z-[999999]">
            <AlertDemo message={alertpopup} />
          </div>,
          document.body
        )}

      {Manageroom && (
        <ManageRoom
          roomId={roomid}
          participants={usersinroom}
          onClose={() => setmanageroom(false)}
          onEndRoom={handleEndroom}
          host={hostid}
          otheruser={otherusers}
        />
      )}

      {callState === "connected" &&
        createPortal(
          <InCallControls
            onLeave={handleleave}
            isMuted={muted}
            onMute={MuteLogic}
          />,
          document.body
        )}

      {endtrue && <AlertDemo message={endroom} />}

      {/* USERS MODAL */}
      {openusers && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-md flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-96 max-w-[90vw]"
          >
            <AllUsers
              users={usersinroom}
              host={hostid}
              roomid={roomid}
              onClose={() => setopenusers(false)}
            />
          </motion.div>
        </div>
      )}

      {invite && <Invite />}
      <RolePopup visible={visible} message={popup} />

      {callState === "ringing" && (
        <HostVoicePopup
          targetedsocketid={fromsocket}
          name={fromname}
          avatar={avatar}
          onAccept={handleAccept}
          onReject={() => setCallState("idle")}
        />
      )}

      {/* WHITEBOARD */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <Whiteboard avatar={avatar} host={socket.id === hostid} />
      </div>
    </div>

    {/* CHAT OVERLAY */}
    {openchat && (
      <div className="fixed inset-0 bg-black/50 z-[9999]">
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 0.9 }}
          className="absolute bottom-4 right-4"
        >
          <ChatSystem avatar={avatar} />
        </motion.div>
        <button
          onClick={() => setChatOpen(false)}
          className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded"
        >
          ✕
        </button>
      </div>
    )}

    {comingsoon && <KanbanBoard onClose={() => setcomingsoon(false)} />}
  </div>
);


}
