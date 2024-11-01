import { useState } from "react";

export function usePasswordInputType() {
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setconfirmPasswordType] = useState("password");

  function handleChangePasswordType() {
    setPasswordType((type) => (type === "password" ? "text" : "password"));
  }
  function handleChangeConfirmPasswordType() {
    setconfirmPasswordType((type) =>
      type === "password" ? "text" : "password",
    );
  }

  return [
    passwordType,
    handleChangePasswordType,
    confirmPasswordType,
    handleChangeConfirmPasswordType,
  ];
}
