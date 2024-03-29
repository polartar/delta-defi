import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="32" height="32" viewBox="0 0 40 40" color="#f0b90b" font-size="24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#F0B90B" d="M20.245 0 9.634 6.125l3.901 2.262 6.71-3.862 6.71 3.862 3.902-2.262L20.245 0zm6.711 11.586 3.9 2.263v4.526l-6.71 3.862v7.724l-3.9 2.263-3.902-2.263v-7.724l-6.71-3.862v-4.526l3.901-2.263 6.71 3.863 6.71-3.863z"></path>
      <path fill="#F0B90B" d="M30.857 21.573V26.1l-3.901 2.262v-4.525l3.9-2.263z"></path>
      <path fill="#F0B90B" d="m26.916 31.56 6.71-3.862v-7.724l3.902-2.263v12.25l-10.611 6.125V31.56zm6.711-19.31-3.902-2.263 3.902-2.263 3.9 2.263v4.525l-3.9 2.263V12.25zM16.344 37.724V33.2l3.901 2.263 3.902-2.263v4.525l-3.902 2.263-3.9-2.263zm-2.809-9.363L9.634 26.1v-4.526l3.901 2.263v4.525zm6.71-16.111-3.9-2.263 3.9-2.263 3.902 2.263-3.902 2.263zm-9.48-2.263-3.9 2.263v4.525l-3.902-2.263V9.987l3.901-2.263 3.901 2.263z"></path>
      <path fill="#F0B90B" d="m2.963 17.711 3.901 2.263v7.724l6.71 3.862v4.526L2.963 29.96V17.71z"></path>
    </Svg>
  );
};

export default Icon;
