"use client";

import SideBar from "@/components/SideBar";

const ChatPage = () => {
  return (
    <main className="grid w-full grid-cols-8">
      <div className="col-span-2">
        <SideBar />
      </div>

      <div className="col-span-6 flex justify-center h-screen">
        <div className="flex flex-col items-center justify-center space-y-4">
          initail page
        </div>
      </div>
    </main>
  );
};

export default ChatPage;
