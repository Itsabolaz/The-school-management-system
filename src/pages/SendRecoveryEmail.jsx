import SendRecoveryEmailForm from "../features/authentication/SendRecoveryEmailForm";
import AuthPageHeader from "../ui/AuthPageHeader";

function SendRecoveryEmail() {
    return (
        <div className="flex h-screen overflow-hidden">
          <AuthPageHeader title='Send Recovery Email' titleStyle='text-4xl font-bold uppercase text-white' />
          <section className="h-full w-1/2 bg-primary-blue flex justify-center items-center">
            <SendRecoveryEmailForm />
          </section>
        </div>
      );
}

export default SendRecoveryEmail