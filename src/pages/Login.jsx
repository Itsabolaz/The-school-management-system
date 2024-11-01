import LoginForm from "../features/authentication/LoginForm";
import AuthPageHeader from "../ui/AuthPageHeader";

function Login() {
  return (
    <div className="flex h-screen overflow-hidden">
      <AuthPageHeader title='welcome' titleStyle='text-7xl font-bold uppercase text-white' />
      <section className="h-full w-1/2 bg-primary-blue flex justify-center items-center">
        <LoginForm />
      </section>
    </div>
  );
}

export default Login;
