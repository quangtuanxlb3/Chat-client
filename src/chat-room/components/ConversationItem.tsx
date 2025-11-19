import { Avatar } from "flowbite-react";

export default function ConversationItem({ id }: { id: number }) {
  return (
    <div className="mb-5 flex flex-row items-start gap-3">
      <Avatar
        size="sm"
        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        alt="avatar of Jese"
        rounded
      />
      <div className="flex flex-col gap-2">
        <span className="text-md font-semibold text-gray-900 dark:text-white">
          Nguyễn Duy Phúc
          <span className="ms-3 text-sm font-normal text-gray-500 dark:text-gray-400">
            11:30 18/11/2025
          </span>
        </span>
        <div className="max-w-8/12 rounded-xl bg-gray-200 p-3 dark:bg-gray-700">
          <p className="text-md font-normal text-gray-800 dark:text-gray-100">
            That's awesome. I think our users will really appreciate the
            improvements. {id}
          </p>
        </div>
      </div>
    </div>
  );
}
