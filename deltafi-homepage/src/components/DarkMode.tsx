import React from "react";
import { Button, SunIcon, MoonIcon } from "components";

interface Props {
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
}
  
const DarkMode: React.FC<Props> = ({ isDark, toggleTheme }) => {

  return (
    <Button variant="text" onClick={() => toggleTheme(!isDark)}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};

export default React.memo(DarkMode, (prev, next) => prev.isDark === next.isDark);
