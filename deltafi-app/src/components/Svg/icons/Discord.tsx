import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface BlogProps extends SvgProps {
    isDark: boolean;
}

const Icon: React.FC<BlogProps> = ({ isDark, ...props }) => {
    const textColor = isDark ? "#FFFFFF" : "#23242F";
    const opacity = isDark ? 1.0 : 0.8
    return (
        <Svg viewBox="0 0 36 36" {...props}>
            <path d="M7.93652 28.236L1.69297e-05 30L1.76402 22.0635C0.602315 19.8906 -0.00369277 17.464 1.69297e-05 15C1.69297e-05 6.7155 6.71552 0 15 0C23.2845 0 30 6.7155 30 15C30 23.2845 23.2845 30 15 30C12.536 30.0037 10.1094 29.3977 7.93652 28.236V28.236ZM8.37152 25.0665L9.35102 25.5915C11.0888 26.5202 13.0296 27.0041 15 27C17.3734 27 19.6935 26.2962 21.6669 24.9776C23.6403 23.6591 25.1783 21.7849 26.0866 19.5922C26.9948 17.3995 27.2325 14.9867 26.7694 12.6589C26.3064 10.3311 25.1635 8.19295 23.4853 6.51472C21.8071 4.83649 19.6689 3.6936 17.3411 3.23058C15.0133 2.76755 12.6005 3.00519 10.4078 3.91345C8.2151 4.8217 6.34096 6.35977 5.02238 8.33316C3.70381 10.3065 3.00002 12.6266 3.00002 15C3.00002 17.001 3.48752 18.927 4.41002 20.649L4.93352 21.6285L3.95102 26.049L8.37152 25.0665V25.0665Z" fill={textColor} opacity={opacity}/>
        </Svg>
    );
};

export default Icon;