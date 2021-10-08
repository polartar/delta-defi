import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 195 227" {...props}>
      <svg width="195" height="227" viewBox="0 0 195 227" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M102.084 0.00145707C105.584 0.0652365 108.708 2.21526 110.017 5.46235L138.561 76.2521C139.091 77.5665 138.123 79 136.706 79H109.27C108.455 79 107.722 78.5058 107.416 77.7507L96.46 50.6943C95.7982 49.0598 93.4985 49.0196 92.7798 50.63L23.4298 206.041C22.8394 207.364 23.8076 208.856 25.2562 208.856H157.537C158.956 208.856 159.923 207.42 159.391 206.105L147.099 175.751C146.567 174.436 147.535 173 148.953 173H176.222C177.038 173 177.772 173.495 178.077 174.252L194.233 214.318C195.317 217.008 194.995 220.06 193.373 222.463C191.75 224.866 189.04 226.307 186.141 226.307H8.72537C5.76946 226.307 3.01454 224.81 1.40568 222.331C-0.203178 219.851 -0.447189 216.725 0.757357 214.026L93.9566 5.16974C95.3833 1.97249 98.583 -0.0623224 102.084 0.00145707Z" fill="url(#paint0_linear)" />
        <defs>
          <linearGradient id="paint0_linear" x1="97.4331" y1="0" x2="97.4331" y2="226.307" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF5E79" />
            <stop offset="1" stopColor="#DC0640" />
          </linearGradient>
        </defs>
      </svg>
    </Svg>
  );
};

export default Icon;
