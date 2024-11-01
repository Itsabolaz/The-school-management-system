import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";
import { usePasswordInputType } from "../../hooks/usePasswordInputType";
import { useSignUp } from "./useSignUp";

function SignUpForm() {
  const [
    passwordType,
    handleChangePasswordType,
    confirmPasswordType,
    handleChangeConfirmPasswordType,
  ] = usePasswordInputType();
  const { signup, isSigningUp } = useSignUp();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(function () {
    document.title = "Sign up to the school system";
  }, []);

  function onSubmit({ email, password, userName }) {
    reset();
    signup(
      { email, password, userName },
      { onSettled: () => reset() },
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[70%] flex-col items-center rounded-lg bg-white pb-7 pt-14 [&>div>input]:h-[50px] [&>div>input]:w-full [&>div>input]:rounded [&>div>input]:bg-secendary-gray [&>div>input]:p-4 [&>div>input]:transition-all focus:[&>div>input]:border focus:[&>div>input]:border-solid focus:[&>div>input]:border-third-gray focus:[&>div>input]:bg-white [&>div]:w-[80%] [&>p]:w-[80%]"
    >
      <div className="group relative">
        <input
          type="text"
          id="email"
          disabled={isSigningUp}
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
          className="pointer-events-none absolute left-0 top-0 flex h-full transform select-none items-center pl-4 text-primary-gray transition-all duration-300 group-focus-within:h-1/2 group-focus-within:-translate-y-full group-focus-within:pl-0 group-focus-within:text-xs peer-valid:h-1/2 peer-valid:-translate-y-full peer-valid:pl-0 peer-valid:text-xs"
        >
          Enter your email*
        </label>
      </div>
      <p
        className={`${!errors?.email ? "hidden" : ""} error-message my-2 cursor-context-menu select-none`}
      >
        {errors?.email?.message}
      </p>
      <div className="group relative mt-7">
        <input
          type="text"
          id="userName"
          disabled={isSigningUp}
          className="peer"
          required
          {...register("userName", {
            required: "User name is requied!",
            minLength: {
              value: 4,
              message: "user name must contain at least 4 characters!"
            }
          })}
        />
        <label
          htmlFor="userName"
          className="pointer-events-none absolute left-0 top-0 flex h-full transform select-none items-center pl-4 text-primary-gray transition-all duration-300 group-focus-within:h-1/2 group-focus-within:-translate-y-full group-focus-within:pl-0 group-focus-within:text-xs peer-valid:h-1/2 peer-valid:-translate-y-full peer-valid:pl-0 peer-valid:text-xs"
        >
          Enter your Username*
        </label>
      </div>
      <p
        className={`${!errors?.userName ? "hidden" : ""} error-message my-2 cursor-context-menu select-none`}
      >
        {errors?.userName?.message}
      </p>
      <div className="group relative mt-7">
        <input
          type={passwordType}
          id="password"
          disabled={isSigningUp}
          className="peer"
          required
          {...register("password", {
            required: "Password is empty!",
            pattern: {
              value: /^.{8,}$/,
              message: "Password must contain at least 8 characters!",
            },
            validate: {
              minLength: (cur) =>
                cur.length >= 8 ||
                "Password must contain at least 8 characters!",
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
          className="pointer-events-none absolute left-0 top-0 flex h-full transform select-none items-center pl-4 text-primary-gray transition-all duration-300 group-focus-within:h-1/2 group-focus-within:-translate-y-full group-focus-within:pl-0 group-focus-within:text-xs peer-valid:h-1/2 peer-valid:-translate-y-full peer-valid:pl-0 peer-valid:text-xs"
        >
          Enter new password*
        </label>
      </div>
      <p
        className={`${!errors?.password ? "hidden" : ""} error-message my-2 cursor-context-menu select-none`}
      >
        {errors?.password?.message}
      </p>
      <div className="group relative mt-7">
        <input
          type={confirmPasswordType}
          id="confirmPassword"
          disabled={isSigningUp}
          className="peer"
          required
          {...register("confirmPassword", {
            required: "Confirm password is empty!",
            validate: {
              minLength: (cur) =>
                cur.length >= 8 ||
                "Password must contain at least 8 characters!",
              matchPassword: (cur) =>
                cur === getValues().password || "The passwords don't match!",
            },
          })}
        />
        <span className="absolute right-0 top-0 flex h-full transform items-center pr-4 text-primary-gray [&>svg]:h-5 [&>svg]:w-5 [&>svg]:cursor-pointer">
          {confirmPasswordType === "password" ? (
            <HiMiniEye onClick={handleChangeConfirmPasswordType} />
          ) : (
            <HiMiniEyeSlash onClick={handleChangeConfirmPasswordType} />
          )}
        </span>
        <label
          htmlFor="confirmPassword"
          className="pointer-events-none absolute left-0 top-0 flex h-full transform select-none items-center pl-4 text-primary-gray transition-all duration-300 group-focus-within:h-1/2 group-focus-within:-translate-y-full group-focus-within:pl-0 group-focus-within:text-xs peer-valid:h-1/2 peer-valid:-translate-y-full peer-valid:pl-0 peer-valid:text-xs"
        >
          Enter confirm password*
        </label>
      </div>
      <p
        className={`${!errors?.confirmPassword ? "hidden" : ""} error-message my-2 cursor-context-menu select-none`}
      >
        {errors?.confirmPassword?.message}
      </p>
      {/* <div className="group relative mt-7">
        <input
          type="text"
          id="mobileNumber"
          disabled={isSigningUp}
          className="peer"
          required
          {...register("mobileNumber", {
            required: "Mobile numbder is required!",
            pattern: {
              value: /^09\d{9}$/,
              message: "Invalid Mobile number format!",
            },
          })}
        />
        <label
          htmlFor="mobileNumber"
          className="pointer-events-none absolute left-0 top-0 flex h-full transform select-none items-center pl-4 text-primary-gray transition-all duration-300 group-focus-within:h-1/2 group-focus-within:-translate-y-full group-focus-within:pl-0 group-focus-within:text-xs peer-valid:h-1/2 peer-valid:-translate-y-full peer-valid:pl-0 peer-valid:text-xs"
        >
          Enter your Mobile number*
        </label>
      </div>
      <p
        className={`${!errors?.mobileNumber ? "hidden" : ""} error-message my-2 cursor-context-menu select-none`}
      >
        {errors?.mobileNumber?.message}
      </p> */}

      <div className="flex w-10/12 flex-col">
        <Button style="uppercase bg-primary-red text-white rounded w-full py-4 text-xl font-medium mt-8 mb-4">
          Sign in
        </Button>
        <div className="text-center">
          <Link
            to="/login"
            className="cursor-pointer text-sm text-primary-gray underline-offset-4 hover:underline"
          >
            Do you already have an account?
          </Link>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;

// "pointer-events-none absolute left-0 top-0 flex h-full transform items-center pl-4 text-primary-gray transition-all duration-300 ease-in-out peer-placeholder-shown:translate-y-0 peer-placeholder-shown:pl-4 peer-placeholder-shown:text-base peer-focus:-translate-y-full peer-focus:pl-0 peer-focus:text-xs peer-focus:text-primary-gray"

// "pointer-events-none absolute left-0 top-0 flex h-full transform items-center pl-4 text-sm text-primary-gray transition-all duration-300 group-focus-within:h-1/2 group-focus-within:-translate-y-full group-focus-within:pl-0 group-focus-within:text-xs peer-valid:h-1/2 peer-valid:-translate-y-full peer-valid:pl-0 peer-valid:text-xs"
