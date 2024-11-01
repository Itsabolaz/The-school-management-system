import LazyLoad from "react-lazyload";
import UserAvatarUploadeder from "../authentication/userAvatarUploader";
import SettingsForm from "./SettingsForm";

function SettingsContainer() {
  return (
    <div className="overflow-hidden rounded bg-white shadow-md">
      <LazyLoad height={350} once>
        <section
          className="relative h-[350px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/nature.jpg)" }}
        >
          <UserAvatarUploadeder />
        </section>
      </LazyLoad>
      <SettingsForm />
    </div>
  );
}

export default SettingsContainer;
