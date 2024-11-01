import { useState } from "react";

export function useUserImage(imageSrc = "/default-user.jpg") {
  const [userImage, setUserImage] = useState(imageSrc);

  const handleFileChange = (event) => {
    console.log("change");
    const avatar = event.target.files[0];
    setUserImage(URL.createObjectURL(avatar));
  };

  return { userImage, handleFileChange };
}
