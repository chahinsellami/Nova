"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "hover";
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  onClick,
}) => {
  const baseStyles = "border border-white/10 transition duration-300";

  const variants = {
    default: "bg-black/50 hover:border-white/20",
    hover: "bg-black/50 hover:bg-black/70 hover:border-white/30 cursor-pointer",
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
