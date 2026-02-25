
"use client";
import { X, Copy, Trash2, Users, Crown } from "lucide-react";
import socket from "./socket";

export default function ManageRoom({
  roomId,
  participants = [],
  onClose,
  onRemoveUser,
  onEndRoom,
  host,
}) {
  const inviteURL = `https://realtime-collabration-frontend.vercel.app/dashboard?room${roomId}`;

  const hostUser = participants.find((u) => u.user === host);
  const otherUsers = participants.filter((u) => u.user !== host);

  function handleEndRoom() {
    socket.emit("end-room", roomId);
    onEndRoom?.();
  }
  function handleremove(targetedid){
    socket.emit("remove-user",{
      roomId,
      targetedid
    })
  }
  function copyInviteLink() {
    navigator.clipboard.writeText(inviteURL);
    alert("✅ Link copied to clipboard");
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl bg-gradient-to-b from-[#0b1220] to-[#050814] border border-white/10 shadow-2xl p-6 text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users size={18} className="opacity-80" />
            <h2 className="text-lg font-semibold">Manage Room</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-white/10 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Room ID */}
        <div className="mb-5 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm text-white/60 mb-1">Room ID</p>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-mono truncate">{roomId}</span>
         
          </div>
        </div>

        {/* Invite */}
        <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm text-white/60 mb-2">Invite members</p>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs truncate">{inviteURL}</span>
            <button
              onClick={copyInviteLink}
              className="p-2 rounded-md hover:bg-white/10"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        {/* Host */}
        {hostUser && (
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Host</p>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
              <Crown size={14} className="text-yellow-400" />
              <span className="text-sm">{hostUser.name}</span>
            </div>
          </div>
        )}

        {/* Participants */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-3">
            Participants ({otherUsers.length})
          </p>

          {otherUsers.length === 0 ? (
            <p className="text-sm text-white/40">No participants found</p>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {otherUsers.map((user) => (
                <div
                  key={user.user}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                >
                  <span className="text-sm">{user.name}</span>

                  <button
                    onClick={() => handleremove(user.user)}
                    className="p-1 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-xs text-red-400 mb-2">Danger Zone</p>
          <button
            onClick={handleEndRoom}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 font-semibold transition"
          >
            End Room for Everyone
          </button>
          <p className="text-xs text-center text-white/40 mt-2">
            This action cannot be undone
          </p>
        </div>
      </div>
    </div>
  );
}


