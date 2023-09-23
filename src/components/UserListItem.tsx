"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

import type { IChat } from "@/types";
import type { User } from "firebase/auth";

interface IUserListItemProps {
  sender: User;
  receiver: User;
  chats: IChat[];
  selectedChatId?: string;
}
const UserListItem = ({
  sender,
  receiver,
  chats,
  selectedChatId,
}: IUserListItemProps) => {
  const router = useRouter();

  const chatExists = (receiverEmail: string) => {
    const senderEmail = sender.email!;
    return chats?.find(
      (chat: IChat) =>
        chat?.users?.includes(senderEmail) && chat.users.includes(receiverEmail)
    );
  };

  const chat = chatExists(receiver.email!);

  const handleClick = async () => {
    const senderData = {
      displayName: sender.displayName,
      photoURL: sender.photoURL,
      email: sender.email,
    };
    const receiverData = {
      displayName: receiver.displayName,
      photoURL: receiver.photoURL,
      email: receiver.email,
    };
    if (!chat) {
      const { id } = await addDoc(collection(db, "chats"), {
        usersData: [senderData, receiverData],
        users: [sender.email, receiver.email],
        timestamp: serverTimestamp(),
      });

      router.push(`/chat/${id}`);
    } else {
      router.push(`/chat/${chat.id}`);
    }
  };
  return (
    <div className="w-full p-4">
      <div
        className={
          `w-5/6 mx-auto px-4 flex flex-row items-center py-2 cursor-pointer` +
          (chat && selectedChatId === chat.id ? " border  rounded-xl" : " ")
        }
        onClick={handleClick}
      >
        <div>
          <Image
            src={receiver.photoURL!}
            alt={receiver.displayName!}
            className="rounded-full"
            width={40}
            height={40}
          />
        </div>
        <div className="ml-4">
          <p>{receiver.displayName}</p>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
