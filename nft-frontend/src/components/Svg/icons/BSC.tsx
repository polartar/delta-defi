import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 14 14" {...props}>
      <path d="m4.281 5.883 2.72-2.719 2.72 2.72 1.582-1.581L7 0 2.7 4.3 4.28 5.884zM0 7l1.582-1.583L3.164 7 1.582 8.582 0 7zm4.281 1.117 2.72 2.718 2.72-2.72 1.582 1.581L7 14 2.7 9.7l-.003-.003L4.28 8.117zm6.555-1.116 1.582-1.582L14.001 7l-1.583 1.582-1.582-1.582z"></path><path d="M8.605 7 7 5.393 5.813 6.58l-.136.137-.281.28L5.394 7l.002.003L7 8.606l1.605-1.605v-.002z"></path>
    </Svg>
  );
};

export default Icon;
