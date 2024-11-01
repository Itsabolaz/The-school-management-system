function ParentsForm({ children, register, isDoing, errors }) {
  return (
    <div className="flex flex-col space-y-6">
      {children}
      <section className="flex flex-wrap gap-x-16 gap-y-6 [&>div]:flex [&>div]:w-56 [&>div]:flex-col [&>div]:gap-y-2">
        <div>
          <label htmlFor="fatherName">Father&apos;s Name*</label>
          <input
            type="text"
            id="fatherName"
            disabled={isDoing}
            {...register("fatherName", {
              required: "This field is required!",
            })}
          />
          <p className={`${!errors?.fatherName ? "hidden" : ""} error-message`}>
            {errors?.fatherName?.message}
          </p>
        </div>
        <div>
          <label htmlFor="motherName">Mother&apos;s Name*</label>
          <input
            type="text"
            id="motherName"
            disabled={isDoing}
            {...register("motherName", {
              required: "This field is required!",
            })}
          />
          <p className={`${!errors?.motherName ? "hidden" : ""} error-message`}>
            {errors?.motherName?.message}
          </p>
        </div>
        <div>
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            disabled={isDoing}
            {...register("email", {
              required: "This field is required!",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format!",
              },
            })}
          />
          <p className={`${!errors?.email ? "hidden" : ""} error-message`}>
            {errors?.email?.message}
          </p>
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone (e.g: 09123456789)*</label>
          <input
            type="number"
            id="phoneNumber"
            disabled={isDoing}
            {...register("phoneNumber", {
              required: "This field is required!",
              pattern: {
                value: /^09\d{9}$/,
                message: "Invalid phone number format!",
              },
            })}
          />
          <p
            className={`${!errors?.phoneNumber ? "hidden" : ""} error-message`}
          >
            {errors?.phoneNumber?.message}
          </p>
        </div>
        <div>
          <label htmlFor="fatherOccupation">Father&apos;s Occupation*</label>
          <input
            type="text"
            id="fatherOccupation"
            disabled={isDoing}
            {...register("fatherOccupation", {
              required: "This field is required!",
            })}
          />
          <p
            className={`${!errors?.fatherOccupation ? "hidden" : ""} error-message`}
          >
            {errors?.fatherOccupation?.message}
          </p>
        </div>
        <div>
          <label htmlFor="address">Address*</label>
          <input
            id="address"
            disabled={isDoing}
            {...register("address", {
              required: "This field is required!",
            })}
          />
          <p className={`${!errors?.address ? "hidden" : ""} error-message`}>
            {errors?.address?.message}
          </p>
        </div>
        <div>
          <label htmlFor="description">Description (Optional)</label>
          <input
            type="text"
            id="description"
            placeholder="Remarks or something else"
            className="placeholder:text-sm"
            disabled={isDoing}
            {...register("parentsDescription")}
          />
          <p
            className={`${!errors?.parentsDescription ? "hidden" : ""} error-message`}
          >
            {errors?.parentsDescription?.message}
          </p>
        </div>
      </section>
    </div>
  );
}

export default ParentsForm;
