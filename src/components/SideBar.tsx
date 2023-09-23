"use client";

import { auth, db } from "@/firebase";
import { type DocumentData, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { useParams, useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";

import UserListItem from "./UserListItem";
import type { IChat } from "@/types";

const SideBar = () => {
  const router = useRouter();
  const { id } = useParams();

  const [user] = useAuthState(auth);
  const [snapshotUser] = useCollection(collection(db, "users"));

  const users = snapshotUser?.docs.map((doc: DocumentData) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const filteredUsers = users?.filter(
    (singleUser) => singleUser.email !== user?.email
  );

  const [snapshotChat] = useCollection(collection(db, "chats"));
  const chats = snapshotChat?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const logout = () => {
    auth.signOut();
    router.push("/");
  };

  if (!user) {
    return (
      <div className="flex justify-center mt-10">
        <CgSpinner className="animate-spin w-10 h-10" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-start w-full h-screen border-l border-r border-gray-200">
      <div className="flex items-center justify-between w-full p-4 text-xl font-bold border-b border-gray-200 h-[4.375rem]">
        <p>채팅</p>
        <button
          type="button"
          className="text-sm font-medium "
          onClick={() => logout()}
        >
          로그아웃
        </button>
      </div>
      <div className="w-full">
        {filteredUsers?.map((receiver) => (
          <UserListItem
            key={receiver.id}
            sender={user}
            receiver={receiver}
            chats={chats as IChat[]}
            selectedChatId={typeof id === "string" ? id : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
