import SignUpForm from "../features/authentication/SignUpForm";
import AuthPageHeader from "../ui/AuthPageHeader";

function SignUp() {
    return (
        <div className="flex h-screen overflow-hidden">
          <AuthPageHeader title='welcome' titleStyle='text-7xl font-bold uppercase text-white' />
          <section className="h-full w-1/2 bg-primary-blue flex justify-center items-center">
            <SignUpForm />
          </section>
        </div>
      );
}

export default SignUp
