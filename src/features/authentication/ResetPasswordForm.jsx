import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useResetPassword } from "./useResetPassword";
import { HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";
import { usePasswordInputType } from "../../hooks/usePasswordInputType";
import { useEffect } from "react";

function ResetPasswordForm() {
  const [
    passwordType,
    handleChangePasswordType,
    confirmPasswordType,
    handleChangeConfirmPasswordType,
  ] = usePasswordInputType();

  const { resetPassword, isResetting } = useResetPassword();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
    clearErrors,
  } = useForm();

  useEffect(function () {
    document.title = "Reset Password";
  }, []);

  function onSubmit(data) {
    resetPassword(data.password, { onSettled: () => reset });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-3/5 flex-col items-center rounded-lg bg-white py-10 [&>div>input]:h-[60px] [&>div>input]:w-full [&>div>input]:rounded [&>div>input]:bg-secendary-gray [&>div>input]:p-4 [&>div>input]:transition-all focus:[&>div>input]:border focus:[&>div>input]:border-solid focus:[&>div>input]:border-third-gray focus:[&>div>input]:bg-white [&>div>label]:cursor-pointer [&>div>label]:select-none [&>div]:w-10/12 [&>p]:w-10/12"
    >
      <div className="group relative">
        <input
          type={passwordType}
          id="password"
          disabled={isResetting}
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
              matchPassword: (cur) =>
                cur === getValues().confirmPassword &&
                errors?.confirmPassword &&
                clearErrors("confirmPassword"),
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
          Enter new password
        </label>
      </div>
      <p
        className={`${!errors?.password ? "hidden" : ""} error-message mt-3 cursor-context-menu`}
      >
        {errors?.password?.message}
      </p>
      <div className="group relative mt-7">
        <input
          type={confirmPasswordType}
          id="confirm-password"
          disabled={isResetting}
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
          htmlFor="confirm-password"
          className="absolute left-0 top-0 flex h-full transform items-center pl-4 text-primary-gray transition-all duration-300 group-focus-within:h-1/2 group-focus-within:-translate-y-full group-focus-within:pl-0 group-focus-within:text-xs peer-valid:h-1/2 peer-valid:-translate-y-full peer-valid:pl-0 peer-valid:text-xs"
        >
          Confirm new password
        </label>
      </div>
      <p
        className={`${!errors?.confirmPassword ? "hidden" : ""} error-message mt-3 cursor-context-menu`}
      >
        {errors?.confirmPassword?.message}
      </p>

      <div className="flex w-10/12 flex-col">
        <Button
          disabled={isResetting}
          style="uppercase bg-primary-red text-white rounded w-full py-4 text-lg font-medium mt-8"
        >
          Reset Password
        </Button>
      </div>
    </form>
  );
}

export default ResetPasswordForm;
