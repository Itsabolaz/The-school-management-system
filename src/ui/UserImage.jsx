import { useEffect, useState } from "react";
import SpinnerImage from "./SpinnerImage";

export default function UserImage({ image }) {
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = image || "/default-user.jpg";
    img.onload = () => setImageLoading(false);
    img.onerror = () => setImageLoading(false);

    // Cleanup function
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [image]);

  return (
    <div className="h-72 w-72 overflow-hidden rounded-full border border-secendary-gray">
      <img
        src={image || "/default-user.jpg"}
        alt="student"
        loading="lazy"
        className={`${imageLoading ? "hidden" : "block"} h-full w-full object-cover`}
      />
      {imageLoading && <SpinnerImage />}
    </div>
  );
}
