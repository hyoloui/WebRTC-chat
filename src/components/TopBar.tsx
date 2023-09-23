"use client";

import type { User } from "firebase/auth";
import Image from "next/image";

const TopBar = ({ user }: { user: User }) => {
  return (
    <div className="h-[70px] border-b-[1px] space-x-4 flex items-center px-6 py-4">
      <Image
        src={user.photoURL!}
        alt={user.displayName!}
        width={40}
        height={40}
        className="object-cover rounded-full"
      />

      <span className="font-bold">{user.displayName}</span>
    </div>
  );
};

export default TopBar;
