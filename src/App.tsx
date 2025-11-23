import { ToastContainer } from "react-toastify";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <AppRouter />
      <ToastContainer />
    </div>
  );
}
