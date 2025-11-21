import { useState, useRef, useEffect } from "react";

export default function Header() {
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
    <header className="flex h-[60px] items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">UTHChat</span>
        <span className="hidden text-xs text-gray-500 sm:inline dark:text-gray-400">ứng dụng chat đơn giản</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right text-xs">
          <div className="font-semibold text-gray-900 dark:text-gray-100">Tuancry</div>
          <div className="text-[11px] text-emerald-500">Đang hoạt động</div>
        </div>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
          >
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-100">AT</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
              <div className="py-1">
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
