import { HiPencilAlt } from "react-icons/hi";
import ChatItem from "./ChatItem";
import { Button } from "flowbite-react";

export default function ChatList() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-row items-center justify-between py-4 ps-6 pe-3">
        <h4 className="text-xl font-semibold dark:text-white">Chats</h4>
        <Button size="xs" color="light" className="cursor-pointer border-0">
          <HiPencilAlt className="h-5 w-5" />
        </Button>
      </div>
      <div className="h-full overflow-auto px-2 py-0">
        <ul>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <ChatItem key={item} />
          ))}
        </ul>
      </div>
      {/* <div className="border-t-1 border-gray-200 p-4 dark:border-gray-700">
        abc
      </div> */}
    </div>
  );
}
