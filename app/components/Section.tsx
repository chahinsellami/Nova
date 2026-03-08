"use client";

import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dark" | "light";
  padding?: "sm" | "md" | "lg";
}

const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  variant = "default",
  padding = "lg",
}) => {
  const baseStyles = "";

  const variants = {
    default: "bg-black",
    dark: "bg-black/50",
    light: "bg-gray-900",
  };

  const paddings = {
    sm: "py-8 px-4",
    md: "py-12 px-4",
    lg: "py-20 px-4",
  };

  return (
    <section
      className={`${variants[variant]} ${paddings[padding]} ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
