"use client";

import { auth, db } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, orderBy, query } from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

import { useParams } from "next/navigation";

import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";
import MessageBubble from "@/components/MessageBubble";

import { CgSpinner } from "react-icons/cg";
import { IoChatbubbleOutline } from "react-icons/io5";

import type { User } from "firebase/auth";
import type { IMessage } from "@/types";
import { useEffect, useRef } from "react";

const ChatPage = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const ref = useRef<null | HTMLDivElement>(null);

  const q = query(
    collection(db, "chats", id as string, "messages"),
    orderBy("timestamp")
  );

  const [messages, loading] = useCollectionData(q);
  const [chat] = useDocumentData(doc(db, "chats", id as string));

  const getOtherUser = (users: User[], currentUser: User) => {
    return users?.filter((user) => user.email !== currentUser?.email)[0];
  };

  useEffect(() => {
    // Scroll to bottom
    ref.current?.scrollIntoView();
  }, [messages]);

  return (
    <main className="grid w-full grid-cols-8">
      <div className="col-span-2">
        <SideBar />
      </div>

      <div className="flex flex-col w-full col-span-6">
        {/* Top bar */}
        {user && chat && (
          <TopBar user={getOtherUser(chat.usersData, user as User)} />
        )}

        <div className="flex w-full h-full px-6 pt-4 mb-2 max-h-[calc(100vh_-_70px_-_74px_-_10px)] overflow-y-scroll no-scrollbar">
          <div className="flex flex-col w-full">
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

            {/* Message */}
            {messages?.map((message, index) => (
              <MessageBubble
                key={index}
                user={user as User}
                message={message as IMessage}
              />
            ))}

            <div ref={ref}></div>
          </div>
        </div>

        {/* Bottom bar */}
        <BottomBar user={user as User} chatId={id as string} />
      </div>
    </main>
  );
};

export default ChatPage;
