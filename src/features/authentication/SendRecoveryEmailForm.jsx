import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useEffect } from "react";
import { useSendRecoveryEmail } from "./useSendRecoveryEmail";

function SendRecoveryEmailForm() {
  const { sendRecoveryEmail, isSending } = useSendRecoveryEmail();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(function () {
    document.title = "Send Recovery Email";
  }, []);

  function onSubmit(data) {
    sendRecoveryEmail(data.email);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-3/5 flex-col items-center rounded-lg bg-white py-10 [&>div>input]:h-[60px] [&>div>input]:w-full [&>div>input]:rounded [&>div>input]:bg-secendary-gray [&>div>input]:p-4 [&>div>input]:transition-all focus:[&>div>input]:border focus:[&>div>input]:border-solid focus:[&>div>input]:border-third-gray focus:[&>div>input]:bg-white [&>div]:w-10/12 [&>p]:w-10/12"
    >
      <div className="group relative">
        <input
          type="text"
          id="email"
          disabled={isSending}
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
        className={`${!errors?.email ? "hidden" : ""} error-message mt-3 cursor-context-menu`}
      >
        {errors?.email?.message}
      </p>

      <div className="flex w-10/12 flex-col">
        <Button
          disabled={isSending}
          style="uppercase bg-primary-red text-white rounded w-full py-4 text-lg font-medium mt-8"
        >
          Send Recovery Email
        </Button>
      </div>
    </form>
  );
}

export default SendRecoveryEmailForm;
