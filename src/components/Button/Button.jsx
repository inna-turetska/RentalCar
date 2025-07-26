import css from "./Button.module.css";

export default function Button({
  children,
  onClick,
  disabled,
  type = "button",
  className = "",
}) {
  return (
    <button
      className={`${css.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
