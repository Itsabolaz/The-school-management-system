import { calculateAge } from "../../utils/helper";

function TeacherForm({ children, register, isDoing, errors }) {
  return (
    <div className="flex flex-col space-y-6">
      {children}
      <section className="flex flex-wrap gap-x-16 gap-y-6 [&>div]:flex [&>div]:w-56 [&>div]:flex-col [&>div]:gap-y-2">
        <div>
          <label htmlFor="name">FullName*</label>
          <input
            type="text"
            id="name"
            disabled={isDoing}
            {...register("fullName", {
              required: "This field is required!",
            })}
          />
          <p className={`${!errors?.fullName ? "hidden" : ""} error-message`}>
            {errors?.fullName?.message}
          </p>
        </div>
        <div>
          <label htmlFor="nationalId">National ID*</label>
          <input
            type="text"
            id="nationalId"
            maxLength="10"
            disabled={isDoing}
            {...register("nationalId", {
              required: "This field is required!",
              minLength: {
                value: 10,
                message: "National Id muse be 10 characters!",
              },
            })}
          />
          <p className={`${!errors?.nationalId ? "hidden" : ""} error-message`}>
            {errors?.nationalId?.message}
          </p>
        </div>
        <div>
          <label htmlFor="fatherName">Father Name*</label>
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
          <label htmlFor="gender">Gender*</label>
          <select
            id="gender"
            disabled={isDoing}
            {...register("gender", {
              required: "This box is required!",
              validate: (value) =>
                value !== "selectGender" || "Please select a gender!",
            })}
          >
            <option value="selectGender" hidden>
              Please select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p className={`${!errors?.gender ? "hidden" : ""} error-message`}>
            {errors?.gender?.message}
          </p>
        </div>
        <div>
          <label htmlFor="grade">Grade*</label>
          <select
            id="grade"
            disabled={isDoing}
            {...register("grade", {
              required: "This box is required!",
              validate: (value) =>
                value !== "selectGrade" || "Please select a grade!",
            })}
          >
            <option value="selectGrade" hidden>
              Please select grade
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <p className={`${!errors?.grade ? "hidden" : ""} error-message`}>
            {errors?.grade?.message}
          </p>
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth*</label>
          <input
            type="date"
            id="dateOfBirth"
            disabled={isDoing}
            {...register("dateOfBirth", {
              required: "This field is required!",
              validate: (value) => {
                return (
                  calculateAge(value, 20) ||
                  "The teacher must be at least 20 years old!"
                );
              },
            })}
          />
          <p
            className={`${!errors?.dateOfBirth ? "hidden" : ""} error-message`}
          >
            {errors?.dateOfBirth?.message}
          </p>
        </div>
        <div>
          <label htmlFor="religion">Religion*</label>
          <select
            id="religion"
            disabled={isDoing}
            {...register("religion", {
              required: "This box is required!",
              validate: (value) =>
                value !== "selectReligion" || "Please select a religion!",
            })}
          >
            <option value="selectReligion" hidden>
              Please select religion
            </option>
            <option value="islam">Islam</option>
            <option value="christianity">Christianity</option>
            <option value="judaism">Judaism</option>
            <option value="other">Other</option>
          </select>
          <p className={`${!errors?.religion ? "hidden" : ""} error-message`}>
            {errors?.religion?.message}
          </p>
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone* (e.g: 09123456789)</label>
          <input
            type="text"
            id="phoneNumber"
            className="placeholder:text-sm"
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
          <label htmlFor="address">Address*</label>
          <input
            type="text"
            id="address"
            className="placeholder:text-sm"
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
          <label htmlFor="email">Email*</label>
          <input
            type="text"
            id="email"
            className="placeholder:text-sm"
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
          <label htmlFor="description">Description (Optional)</label>
          <input
            type="text"
            id="description"
            placeholder="Remarks or something else"
            className="placeholder:text-sm"
            disabled={isDoing}
            {...register("teacherDescription")}
          />
          <p
            className={`${!errors?.teacherDescription ? "hidden" : ""} error-message`}
          >
            {errors?.teacherDescription?.message}
          </p>
        </div>
      </section>
    </div>
  );
}

export default TeacherForm;
