import React from "react";

interface IconProps {
  size?: number;
  color?: string;
}

const IconChevronDown: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default IconChevronDown;
