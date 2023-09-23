"use client";

import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { useParams } from "next/navigation";

import BottomBar from "@/components/BottomBar";
import SideBar from "@/components/SideBar";

import type { User } from "firebase/auth";

const ChatPage = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);

  return (
    <main className="grid w-full grid-cols-8">
      <div className="col-span-2">
        <SideBar />
      </div>

      <div className="flex flex-col w-full col-span-6">
        {/* Top bar */}
        Top bar
        <div className="flex w-full h-full px-6 pt-4 mb-2 overflow-y-scroll no-scrollbar">
          <div className="flex flex-col w-full">{/* Message */}</div>
          Message
        </div>
        {/* Bottom bar */}
        <BottomBar user={user as User} chatId={id as string} />
      </div>
    </main>
  );
};

export default ChatPage;
