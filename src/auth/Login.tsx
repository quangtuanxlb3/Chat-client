import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

// Schema validate với Yup
const LoginSchema = Yup.object({
  username: Yup.string()
    .required("Vui lòng nhập tài khoản")
    .min(3, "Tài khoản phải từ 3 ký tự"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải từ 6 ký tự"),
  remember: Yup.boolean(),
});

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(undefined);
      try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values.username,
            password: values.password,
          }),
        });

        const data = await res.json();

        if (!res.ok || data.status !== "success") {
          setStatus(
            data.message || "Đăng nhập thất bại, vui lòng kiểm tra lại.",
          );
          return;
        }

        // Lưu token + user
        localStorage.setItem("chat-token", data.data.token);
        localStorage.setItem("chat-user", JSON.stringify(data.data.user));

        if (values.remember) {
          localStorage.setItem("chat-remember-username", values.username);
        } else {
          localStorage.removeItem("chat-remember-username");
        }

        navigate("/chat");
      } catch (err) {
        setStatus(
          "Không kết nối được server. Hãy kiểm tra lại server backend.",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-900 dark:to-slate-800">
      <div className="flex w-full max-w-4xl flex-col gap-8 rounded-2xl bg-white/90 p-8 shadow-xl backdrop-blur md:flex-row dark:bg-slate-900/90">
        {/* BÊN TRÁI: INFO / BRANDING */}
        <div className="flex flex-1 flex-col justify-center border-b border-slate-200 pr-0 pb-6 md:border-r md:border-b-0 md:pr-6 md:pb-0 dark:border-slate-700">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            UTH Chat
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Ứng dụng chat nội bộ: trao đổi nhanh, đồng bộ giữa các thành viên.
            Đăng nhập để tiếp tục cuộc trò chuyện.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>• Chat 1-1, xem lại cuộc trò chuyện cũ</li>
            <li>• Đồng bộ dữ liệu qua trên server</li>
            <li>• Đăng nhập bằng tài khoản riêng của bạn</li>
          </ul>

          <p className="mt-6 rounded-lg bg-slate-100 p-3 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            💡 Tạo tài khoản ở trang Đăng ký, sau đó đăng nhập lại ở đây để test
            full flow client ↔ server.
          </p>
        </div>

        {/* BÊN PHẢI: FORM LOGIN */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 text-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                Đăng nhập
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Nhập tài khoản và mật khẩu để truy cập phòng chat.
              </p>
            </div>

            {/* LỖI CHUNG TỪ SERVER */}
            {formik.status && (
              <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-500/60 dark:bg-red-950/40 dark:text-red-200">
                {formik.status}
              </div>
            )}

            <form
              className="flex flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
              {/* USERNAME */}
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="username">Tài khoản</Label>
                </div>
                <TextInput
                  id="username"
                  name="username"
                  type="text"
                  placeholder="vd: tuancry"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  color={
                    formik.touched.username && formik.errors.username
                      ? "failure"
                      : "gray"
                  }
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.username}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <button
                    type="button"
                    className="text-xs text-blue-500 hover:underline"
                    onClick={() => alert("Demo thôi, chưa có quên mật khẩu 😄")}
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  color={
                    formik.touched.password && formik.errors.password
                      ? "failure"
                      : "gray"
                  }
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* REMEMBER + LINK ĐĂNG KÝ */}
              <div className="mt-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    name="remember"
                    checked={formik.values.remember}
                    onChange={formik.handleChange}
                  />
                  <Label htmlFor="remember" className="text-xs">
                    Nhớ tài khoản
                  </Label>
                </div>
                <a
                  href="/auth/register"
                  className="text-xs text-blue-500 hover:underline"
                >
                  Chưa có tài khoản? Đăng ký
                </a>
              </div>

              {/* NÚT SUBMIT */}
              <Button
                className="mt-3"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>

              <p className="mt-2 text-center text-[11px] text-slate-500 dark:text-slate-400">
                Khi đăng nhập, bạn đồng ý tuân thủ quy định sử dụng hệ thống
                chat nội bộ của lớp/nhóm.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
