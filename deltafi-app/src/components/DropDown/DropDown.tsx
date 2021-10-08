import { useState } from "react";
import styled, { DefaultTheme, useTheme } from "styled-components";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu
} from "styled-dropdown-component";
import getThemeValue from "util/getThemeValue";
import { DropDownProps } from "./types";

interface ThemedProps {
  color?: string,
  theme: DefaultTheme;
}

const getColor = ({ color, theme }: ThemedProps) => {
  return getThemeValue(`colors.${color}`, color)(theme);
};

const DropDownButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  color: ${getColor};
  cursor: pointer;
  padding-bottom: 3px;

  &:after {
    content: "";
    margin-left: 10px;
    margin-bottom: 2px;
    display: inline-block;
    border: 4px solid transparent;
    border-top: 5px solid ${getColor};
    border-bottom:0 none;
  }
`

const DropDown = (props: DropDownProps): JSX.Element => {
  const { selectedItem, itemList, handleClick } = props;
  const { isDark } = useTheme()

  const [hidden, setHidden] = useState(true)

  const handleChangeItem = (id) => {
    setHidden(!hidden);
    handleClick(id)
  }

  return (
    <Dropdown>
      <DropDownButton
        color={isDark ? "#FFFFFF" : "#000000"}
        onClick={() => setHidden(!hidden)}
      >
        {selectedItem.title}
      </DropDownButton>
      <DropdownMenu hidden={hidden} toggle={() => setHidden(!hidden)}>
        {itemList.map((item => <DropdownItem key={`item-${item.id}`} onClick={() => handleChangeItem(item.id)}>{item.title}</DropdownItem>))}
      </DropdownMenu>
    </Dropdown>
  );
};

DropDown.defaultProps = {
  selectedItem: null,
  itemList: [],
  handleClick: () => {},
};

export default DropDown;
