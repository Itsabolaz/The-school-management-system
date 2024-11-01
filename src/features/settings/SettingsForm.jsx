import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useUpdateUser } from "../authentication/useUpdateUser";
import { useUser } from "../authentication/useUser";
import { checkUserPremission } from "../../services/apiAuth";
import { useEffect, useState } from "react";

function SettingsForm() {
  const [userRole, setUserRole] = useState("Guest");
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  useEffect(
    function () {
      const checkPremission = async () => {
        // check user role for EDIT
        const { error: premissionError } = await checkUserPremission();

        if (premissionError) {
          setUserRole("Guest");
        } else {
          setUserRole("Manager");
        }
      };

      checkPremission();
    },
    [setUserRole],
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { email: user.email, ...user.user_metadata },
  });

  function onSubmit(data) {
    const { email, ...otherData } = data;
    updateUser({ email, otherData });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-10 mt-36 space-y-4 px-8 py-5 [&>div>div>label]:text-lg [&>div>input]:w-2/3 [&>div>input]:rounded [&>div>input]:border-2 [&>div>input]:border-solid [&>div>input]:border-secendary-gray [&>div>input]:p-2 [&>div>input]:focus:border-primary-gray [&>div>label]:text-lg [&>div]:flex [&>div]:items-center [&>div]:justify-between"
    >
      <h1 className="pb-4 text-2xl font-semibold">
        {user.user_metadata.userName} ({userRole})
      </h1>
      <div>
        <div>
          <label htmlFor="schoolName">School Name</label>
          <p className={`${!errors?.schoolName ? "hidden" : ""} error-message`}>
            {errors?.schoolName?.message}
          </p>
        </div>
        <input
          type="text"
          id="schoolName"
          disabled={userRole === "Guest" || isUpdating}
          title="Only manager can change school name"
          className="transition-all focus:border-primary-gray disabled:bg-secendary-gray"
          {...register("schoolName", {
            required: "The school name field must not be empty!",
          })}
        />
      </div>
      <div>
        <div>
          <label htmlFor="email">Email *</label>
          <p className={`${!errors?.email ? "hidden" : ""} error-message`}>
            {errors?.email?.message}
          </p>
        </div>
        <input
          type="email"
          id="email"
          disabled={isUpdating}
          className="transition-all focus:border-primary-gray"
          {...register("email", {
            required: "The email field must not be empty!",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format!",
            },
          })}
        />
      </div>
      <div>
        <div>
          <label htmlFor="username">User name *</label>
          <p className={`${!errors?.userName ? "hidden" : ""} error-message`}>
            {errors?.userName?.message}
          </p>
        </div>
        <input
          type="text"
          id="username"
          disabled={isUpdating}
          className="transition-all focus:border-primary-gray"
          {...register("userName", {
            required: "The user name field must not be empty!",
            minLength: {
              value: 4,
              message: "Username must have at least 4 characters",
            },
          })}
        />
      </div>
      <div>
        <label htmlFor="mobileNumber">Mobile (e.g: 09123456789)</label>
        <input
          type="text"
          id="mobileNumber"
          disabled={isUpdating}
          className="transition-all focus:border-primary-gray"
          {...register("mobileNumber", {
            pattern: {
              value: /^09\d{9}$/,
              message: "Invalid phone number format!",
            },
          })}
        />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          disabled={isUpdating}
          className="transition-all focus:border-primary-gray"
          {...register("city")}
        />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          disabled={isUpdating}
          className="transition-all focus:border-primary-gray"
          {...register("address")}
        />
      </div>

      <Button
        disabled={isUpdating}
        style="rounded-md bg-primary-red px-12 py-2 uppercase text-white !mt-10 text-lg"
      >
        Save
      </Button>
    </form>
  );
}

export default SettingsForm;
