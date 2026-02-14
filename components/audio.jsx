import socket from "./socket"
export default  function  AudioControls({
  isHost,
  inCall,
  muted,
  onMute,
  onLeave,
  roomid,
  name,
  targetedsocketid,
  ismanageroom
})
{
  function handleclick(){
    socket.emit("voice-request",({
      roomid,
      name,
      targetedid:targetedsocketid
    }
  )
)
  }
  

  return (
    <div className="flex items-center gap-3   px-4 py-2 rounded-xl shadow">

      {/* User → Request */}
      
      {!isHost && !inCall && (
       <button
        onClick={handleclick}
        className="px-4 py-2 bg-indigo-600 
             rounded-lg text-sm font-semibold
             transition-colors duration-200 delay-75
             hover:bg-indigo-700"
        >
        🎤 Request to Talk
        </button>
  )}

      {/* Host → Incoming */}
      {isHost &&  (
        <>
              <button
            onClick={ismanageroom}
            className="px-4 py-2 bg-indigo-600 
             rounded-lg text-sm font-semibold
             transition-colors duration-200 delay-150
             hover:bg-indigo-700"
        >
       ⚙️ Manage room
        </button>
         
        </>
      )}
      {/* In Call */}
      {inCall && (
        <>
          <button
            onClick={onMute}
            className="px-3 py-2 bg-gray-600 rounded-lg"
          >
            {muted ? "🔈 Unmute" : "🔇 Mute"}
          </button>

          <button
            onClick={onLeave}
            className="px-3 py-2 bg-red-600 rounded-lg"
          >
            ❌ Leave
          </button>
        </>
      )}
    </div>
  )}
