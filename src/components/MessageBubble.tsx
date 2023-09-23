"use client";

import type { IMessage } from "@/types";
import type { User } from "firebase/auth";
import Image from "next/image";

interface IMessageBubbleProps {
  user: User;
  message: IMessage;
}
const MessageBubble = ({ user, message }: IMessageBubbleProps) => {
  const sender = message.sender === user.email;

  return (
    <div className={!sender ? "flex justify-start" : "flex justify-end"}>
      {!sender && (
        <div className="mr-3">
          <Image
            src={message.photoURL}
            alt={message.sender}
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
      )}
      <div
        className={
          !sender
            ? "bg-[#D9D9D9] py-3 px-4 rounded-lg rounded-tl-none my-1 text-sm w-auto max-w-lg"
            : "bg-[#EDEDED] py-3 px-4 rounded-lg rounded-br-none my-1 text-sm w-auto max-w-lg"
        }
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
