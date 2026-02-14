import { Suspense } from "react";
import ChatSystem from "../components/chatsystem";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatSystem />
    </Suspense>
  );
}
