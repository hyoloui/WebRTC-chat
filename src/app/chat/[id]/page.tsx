import SideBar from "@/components/SideBar";
import { useParams } from "next/navigation";

const ChatPage = () => {
  const { id } = useParams();
  const selectedChatId = typeof id === "string" ? id : undefined;

  return (
    <main className="grid w-full grid-cols-8">
      <div className="col-span-2">
        <SideBar selectedChatId={selectedChatId} />
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
