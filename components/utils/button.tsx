import React from "react";

type ButtonProps = {
  text: string;
  icon?: React.ReactNode;
  styles?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function FoodButton({
  text,
  icon,
  styles,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex  items-center gap-2 rounded-full bg-foodPrimary px-5 py-3 text-white font-semibold shadow-[0_8px_20px_rgba(241,114,40,0.35)] hover:bg-foodSecondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles ?? ""}`}
    >
      {icon ? <span className="flex items-center">{icon}</span> : null}
      <span>{text}</span>
    </button>
  );
}