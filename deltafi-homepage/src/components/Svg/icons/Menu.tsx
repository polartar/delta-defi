import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface MenuProps extends SvgProps {
  isDark: boolean;
}

const Icon: React.FC<MenuProps> = ({isDark, ...props}) => {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <Svg viewBox="0 0 28 17" {...props}>
      <svg width="28" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="28" height="3" rx="1.5" fill={textColor} />
        <rect y="7" width="28" height="3" rx="1.5" fill={textColor} />
        <rect y="14" width="28" height="3" rx="1.5" fill={textColor} />
      </svg>
    </Svg>
  );
};

export default Icon;
