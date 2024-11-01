function UploadImageForm({ isDoing, register, errors, isRequired , handleChangeSrc }) {
  return (
    <div className="space-y-2">
      <p>Upload student photo (Size: Max 1 MB)</p>
      <input
        type="file"
        accept="image/*"
        disabled={isDoing}
        // onChange={handleChangeSrc}
        {...register("image", {
          required: isRequired && "Upload image is required",
          // check image that must be less than 1 MB,
          validate: (value) =>
            !value[0]?.size ||
            value[0]?.size < 1000000 ||
            "The size of the image must be less than 1 MB!",
            onChange: (e) => handleChangeSrc(e),
        })}
      />
      <p className={`${!errors?.image ? "hidden" : ""} error-message`}>
        {errors?.image?.message}
      </p>
    </div>
  );
}

export default UploadImageForm;