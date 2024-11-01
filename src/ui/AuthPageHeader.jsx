function AuthPageHeader({title , titleStyle}) {
  return (
    <section className="bg-custom-login-page relative flex h-full w-1/2 flex-col items-center justify-center gap-y-8 overflow-hidden cursor-context-menu select-none">
      <div className="absolute right-0 top-0 h-full w-[50px] origin-bottom rotate-3 bg-primary-blue"></div>
      <img src="/logo.png" alt="Logo of school" className="w-32" />
      <h1 className={titleStyle}>
        {title}
      </h1>
    </section>
  );
}

export default AuthPageHeader;
