"use client";

import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "full";
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  size = "lg",
}) => {
  const sizes = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div className={`${sizes[size]} mx-auto px-4 ${className}`}>{children}</div>
  );
};

export default Container;
