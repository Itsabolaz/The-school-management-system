function Button({ children, style, disabled, type = "submit" , onClick }) {
  return (
    <button type={type} className={style} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
