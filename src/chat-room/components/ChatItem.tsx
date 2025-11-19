import { Avatar } from "flowbite-react";

export default function ChatItem() {
  return (
    <li>
      <div className="flex cursor-pointer flex-row items-center gap-4 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700">
        <Avatar
          className="shrink-0"
          img="https://flowbite-react.com/_next/image?url=%2Fimages%2Fpeople%2Fprofile-picture-5.jpg&w=48&q=75"
          rounded
          status="online"
          statusPosition="bottom-right"
        />
        <div className="flex w-full flex-row">
          <div className="flex flex-col">
            <span className="text-md font-semibold text-gray-900 dark:text-white">
              Bonnie Green
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Send you a message
            </span>
          </div>
          <div className="ms-auto">10:00</div>
        </div>
      </div>
    </li>
  );
}
