import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useLogin } from "./useLogin";
import { useEffect } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import { HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";
import { usePasswordInputType } from "../../hooks/usePasswordInputType";

function LoginForm() {
  const navigate = useNavigate();
  const [passwordType, handleChangePasswordType] = usePasswordInputType();
  const { isLoggingIn, login } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(function () {
    document.title = "Log in to the school system";
  }, []);

  function onSubmit(data) {
    reset();
    login(
      { email: data.email, password: data.password },
      {
        onSettled: () => reset(),
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-3/5 flex-col items-center rounded-lg bg-white py-14 [&>div>input]:h-[60px] [&>div>input]:w-full [&>div>input]:rounded [&>div>input]:bg-secendary-gray [&>div>input]:p-4 [&>div>input]:transition-all focus:[&>div>input]:border focus:[&>div>input]:border-solid focus:[&>div>input]:border-third-gray focus:[&>div>input]:bg-white [&>div]:w-10/12 [&>p]:w-10/12"
    >
      <div className="group relative">
        <input
          type="text"
          id="email"
          disabled={isLoggingIn}
          className="peer"
          required
          {...register("email", {
            required: "Email is required!",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format!",
            },
          })}
        />
        <label
          htmlFor="email"
          className="absolute left-0 top-0 flex h-full transform items-center pl-4 text-primary-gray transition-all duration-300 group-focus-within:h-1/2 group-focus-within:-translate-y-full group-focus-within:pl-0 group-focus-within:text-xs peer-valid:h-1/2 peer-valid:-translate-y-full peer-valid:pl-0 peer-valid:text-xs"
        >
          Enter your email
        </label>
      </div>
      <p
        className={`${!errors?.email ? "hidden" : ""} error-message mt-2 cursor-context-menu`}
      >
        {errors?.email?.message}
      </p>
      <div className="group relative mt-7">
        <input
          type={passwordType}
          id="password"
          disabled={isLoggingIn}
          className="peer"
          required
          {...register("password", {
            required: "Password is required!",
            pattern: {
              value: /^.{8,}$/,
              message: "Password must contain at least 8 characters!",
            },
          })}
        />
        <span className="absolute right-0 top-0 flex h-full transform items-center pr-4 text-primary-gray [&>svg]:h-5 [&>svg]:w-5 [&>svg]:cursor-pointer">
          {passwordType === "password" ? (
            <HiMiniEye onClick={handleChangePasswordType} />
          ) : (
            <HiMiniEyeSlash onClick={handleChangePasswordType} />
          )}
        </span>
        <label
          htmlFor="password"
          className="absolute left-0 top-0 flex h-full transform items-center pl-4 text-primary-gray transition-all duration-300 group-focus-within:h-1/2 group-focus-within:-translate-y-full group-focus-within:pl-0 group-focus-within:text-xs peer-valid:h-1/2 peer-valid:-translate-y-full peer-valid:pl-0 peer-valid:text-xs"
        >
          Enter your password
        </label>
      </div>
      <p
        className={`${!errors?.password ? "hidden" : ""} error-message mt-3 cursor-context-menu`}
      >
        {errors?.password?.message}
      </p>

      <div className="flex w-10/12 flex-col pt-3">
        <div>
          <Link
            to="/send-email"
            className="cursor-pointer text-sm text-primary-blue underline underline-offset-4 hover:no-underline"
          >
            Forgot your password?
          </Link>
        </div>
        <Button style="uppercase bg-primary-red text-white rounded w-full py-4 text-xl font-medium mt-8 mb-4">
          Sign in
        </Button>
        <div className="text-center">
          <Link
            to="/sign-up"
            className="cursor-pointer text-sm text-primary-gray underline-offset-4 hover:underline"
          >
            Don&apos;t have an account?
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
