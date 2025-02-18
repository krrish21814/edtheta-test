/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement } from "react";
import * as LucideIcons from "lucide-react";

interface DynamicIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  className,
}) => {
  const LucideIcon = (LucideIcons as any)[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null; // Return null or a fallback icon
  }

  return createElement(LucideIcon, { size, color, className });
};

export default DynamicIcon;
