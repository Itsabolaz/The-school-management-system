import { calculateAge } from "../../utils/helper";

function StudentForm({ children, register, isDoing, errors }) {
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
            {...register("studentName", {
              required: "This field is required!",
            })}
          />
          <p
            className={`${!errors?.studentName ? "hidden" : ""} error-message`}
          >
            {errors?.studentName?.message}
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
                  calculateAge(value , 7) ||
                  "The student must be at least 7 years old!"
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
          <label htmlFor="bloodGroup">Blood group*</label>
          <select
            id="bloodGroup"
            // className="text-base"
            disabled={isDoing}
            {...register("bloodGroup", {
              required: "This box is required!",
              validate: (value) =>
                value !== "selectBloodGroup" || "Please select a Blood group!",
            })}
          >
            <option value="selectBloodGroup" hidden>
              Please select a group
            </option>
            <option value="a+">A+</option>
            <option value="o+">O+</option>
            <option value="b+">B+</option>
            <option value="ab+">AB+</option>
            <option value="a-">A-</option>
            <option value="o-">O-</option>
            <option value="b-">B-</option>
            <option value="ab-">AB-</option>
          </select>
          {/* <input
            type="text"
            id="bloodGroup"
            disabled={isDoing}
            {...register("bloodGroup", {
              required: "This field is required!",
            })}
          /> */}
          <p className={`${!errors?.bloodGroup ? "hidden" : ""} error-message`}>
            {errors?.bloodGroup?.message}
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
          <label htmlFor="admissionDate">Admission date*</label>
          <input
            type="date"
            id="admissionDate"
            disabled={isDoing}
            {...register("admissionDate", {
              required: "This field is required!",
            })}
          />
          <p
            className={`${!errors?.admissionDate ? "hidden" : ""} error-message`}
          >
            {errors?.admissionDate?.message}
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
            {...register("studentDescription")}
          />
          <p
            className={`${!errors?.studentDescription ? "hidden" : ""} error-message`}
          >
            {errors?.studentDescription?.message}
          </p>
        </div>
      </section>
    </div>
  );
}

export default StudentForm;
