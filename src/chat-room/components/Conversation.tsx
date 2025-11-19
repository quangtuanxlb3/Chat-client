import { Button, Textarea } from "flowbite-react";
import { HiLink, HiPaperAirplane } from "react-icons/hi";
import ConversationItem from "./ConversationItem";

export default function Conversation() {
  return (
    <div className="flex w-full flex-col">
      <div className="border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        header
      </div>
      <div className="flex grow-1 flex-col-reverse overflow-auto p-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <ConversationItem id={item} key={item} />
        ))}
      </div>
      <div className="flex flex-row items-center gap-2 border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <Button size="sm" color="gray" className="cursor-pointer">
          <HiLink className="h-5 w-5" />
        </Button>
        <Textarea
          id="comment"
          style={{ padding: 6 }}
          placeholder="Nhập tin nhắn..."
          required
          rows={1}
        />
        <Button size="sm" className="cursor-pointer">
          <HiPaperAirplane className="h-5 w-5 rotate-90" />
        </Button>
      </div>
    </div>
  );
}
