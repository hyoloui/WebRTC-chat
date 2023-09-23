"use client";

import { auth, db } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { useParams } from "next/navigation";

import BottomBar from "@/components/BottomBar";
import SideBar from "@/components/SideBar";

import type { User } from "firebase/auth";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { useCollectionData, useDocument } from "react-firebase-hooks/firestore";
import { CgSpinner } from "react-icons/cg";
import { IoChatbubbleOutline } from "react-icons/io5";

const ChatPage = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);

  const q = query(
    collection(db, "chats", id as string, "messages"),
    orderBy("timestamp")
  );

  const [messages, loading] = useCollectionData(q);
  const [chat] = useDocument(doc(db, "chats", id as string));

  return (
    <main className="grid w-full grid-cols-8">
      <div className="col-span-2">
        <SideBar />
      </div>

      <div className="flex flex-col w-full col-span-6">
        {/* Top bar */}
        Top bar
        <div className="flex w-full h-full px-6 pt-4 mb-2 overflow-y-scroll no-scrollbar">
          <div className="flex flex-col w-full">
            {/* Message */}
            {loading && (
              <div className="flex flex-col w-full h-full">
                <CgSpinner className="w-full h-12 text-gray-400 animate-spin" />
              </div>
            )}
            {!loading && messages?.length === 0 && (
              <div className="flex flex-col items-center justify-center flex-1 w-full h-full">
                <IoChatbubbleOutline className="w-24 h-24 text-gray-300" />
                <p className="text-2xl font-medium tracking-tight text-gray-300">
                  대화를 시작합니다.
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Bottom bar */}
        <BottomBar user={user as User} chatId={id as string} />
      </div>
    </main>
  );
};

export default ChatPage;
