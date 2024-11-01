import { useRef } from "react";
import { useUploadAvatar } from "./useUploadAvatar";
import { useUser } from "./useUser";

function UserAvatarUploadeder() {
  const fileInputRef = useRef(null);
  const { uploadUserImage, isUploading } = useUploadAvatar();
  const { user } = useUser();
  const { avatar } = user.user_metadata;

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const avatar = event.target.files[0];
    uploadUserImage(avatar);
    console.log(user);
  };

  return (
    <div className="absolute top-52 mx-8 h-72 w-72 overflow-hidden">
      <img
        src={isUploading ? "/loader.gif" : avatar || "/default-user.jpg"}
        alt="avatar"
        className={`${isUploading ? "cursor-not-allowed" : "cursor-pointer"} h-full w-full rounded-full border-4 border-solid border-white object-cover transition-all hover:brightness-75`}
        onClick={handleImageClick}
        role="button"
      />
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default UserAvatarUploadeder;
