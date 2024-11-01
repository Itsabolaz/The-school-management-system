import ResetPasswordForm from "../features/authentication/ResetPasswordForm";
import AuthPageHeader from "../ui/AuthPageHeader";

function ResetPassword() {
    return (
        <div className="flex h-screen overflow-hidden">
          <AuthPageHeader title='Reset Password' titleStyle='text-5xl font-bold uppercase text-white' />
          <section className="h-full w-1/2 bg-primary-blue flex justify-center items-center">
            <ResetPasswordForm />
          </section>
        </div>
      );
}

export default ResetPassword
