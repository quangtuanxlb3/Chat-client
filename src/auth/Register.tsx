import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

const RegisterSchema = Yup.object({
  fullname: Yup.string()
    .required("Vui lòng nhập họ tên")
    .min(3, "Họ tên phải từ 3 ký tự"),
  username: Yup.string()
    .required("Vui lòng nhập tài khoản")
    .min(3, "Tài khoản phải từ 3 ký tự"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải từ 6 ký tự"),
  confirmPassword: Yup.string()
    .required("Vui lòng xác nhận mật khẩu")
    .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không khớp"),
});

export default function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(undefined);
      try {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: values.fullname,
            username: values.username,
            password: values.password,
          }),
        });

        const data = await res.json();

        if (!res.ok || data.status !== "success") {
          setStatus(data.message || "Đăng ký thất bại, vui lòng thử lại.");
          return;
        }

        setStatus("Đăng ký thành công! Vui lòng đăng nhập.");
        // Chờ 1 tí rồi chuyển sang login
        setTimeout(() => {
          navigate("/auth/login");
        }, 800);
      } catch (err) {
        setStatus("Không kết nối được server. Hãy kiểm tra lại backend.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-lg rounded-2xl bg-white/90 p-8 shadow-xl backdrop-blur dark:bg-slate-900/90">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Đăng ký tài khoản
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Tạo tài khoản mới để sử dụng UTH Chat.
          </p>
        </div>

        {formik.status && (
          <div className="mb-4 rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 text-xs text-blue-700 dark:border-blue-500/60 dark:bg-blue-950/40 dark:text-blue-200">
            {formik.status}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          {/* HỌ TÊN */}
          <div>
            <div className="mb-1 block">
              <Label htmlFor="fullname">Họ tên</Label>
            </div>
            <TextInput
              id="fullname"
              name="fullname"
              type="text"
              placeholder="vd: Trịnh Quang Tuấn"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              color={
                formik.touched.fullname && formik.errors.fullname
                  ? "failure"
                  : "gray"
              }
            />
            {formik.touched.fullname && formik.errors.fullname && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.fullname}
              </p>
            )}
          </div>

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
            <div className="mb-1 block">
              <Label htmlFor="password">Mật khẩu</Label>
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

          {/* CONFIRM PASSWORD */}
          <div>
            <div className="mb-1 block">
              <Label htmlFor="confirmPassword">Nhập lại mật khẩu</Label>
            </div>
            <TextInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              color={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "failure"
                  : "gray"
              }
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          <Button className="mt-3" type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
          </Button>

          <p className="mt-2 text-center text-[11px] text-slate-500 dark:text-slate-400">
            Đã có tài khoản?{" "}
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Đăng nhập
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
