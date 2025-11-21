import { useState, useRef, useEffect } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const logout = () => {
    try {
      localStorage.clear();
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <aside className="w-72 min-w-[220px] border-r border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 p-4">
      <div className="flex items-center gap-3">
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm text-gray-800 dark:text-gray-100"
            aria-haspopup="true"
            aria-expanded={open}
          >
            YT
          </button>

          {open && (
            <div className="absolute left-0 mt-2 w-44 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
              <div className="py-1">
                <button onClick={logout} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700">Đăng xuất</button>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="font-medium text-sm text-gray-900 dark:text-gray-100">Your Name</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Active now</div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <button className="w-full rounded-md bg-white px-3 py-2 text-sm text-left shadow-sm hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800">New Chat</button>
        <button className="w-full rounded-md bg-white px-3 py-2 text-sm text-left shadow-sm hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800">Create Group</button>
      </div>
    </aside>
  );
}
