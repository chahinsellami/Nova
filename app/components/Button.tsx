"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  const baseStyles =
    "font-light tracking-widest transition duration-300 inline-flex items-center justify-center";

  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 disabled:opacity-50",
    secondary:
      "border border-white text-white hover:bg-white hover:text-black disabled:opacity-50",
    ghost:
      "text-white border-b border-white hover:border-gray-400 disabled:opacity-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={buttonClass}
    >
      {children}
    </button>
  );
};

export default Button;
