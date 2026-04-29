import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

const variantStyle: Record<string, React.CSSProperties> = {
  primary: { background: "#4f46e5", color: "#fff", border: "none" },
  secondary: { background: "#f1f5f9", color: "#334155", border: "1px solid #e2e8f0" },
  danger: { background: "#ef4444", color: "#fff", border: "none" },
};

const sizeStyle: Record<string, React.CSSProperties> = {
  sm: { padding: "4px 12px", fontSize: "12px" },
  md: { padding: "8px 16px", fontSize: "14px" },
  lg: { padding: "12px 24px", fontSize: "16px" },
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  style,
  ...props
}) => {
  return (
    <button
      style={{
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: 500,
        transition: "opacity 0.2s",
        ...variantStyle[variant],
        ...sizeStyle[size],
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
