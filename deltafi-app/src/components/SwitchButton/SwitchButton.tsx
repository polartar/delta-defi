import styled from "styled-components";
import { SwitchButtonProps } from "./types";

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 4px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 60px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #76EE59;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 38px;
      transition: 0.2s;
    }
  }
`;
const SwitchButton = (props: SwitchButtonProps): JSX.Element => {
  const { isOn, handleChange } = props;

  const handleChangeSwitch = (event) => {
    console.log('isOn', isOn, event)
    handleChange()
  }

  return (
    <div>
      <CheckBoxWrapper>
        <CheckBox id="checkbox" type="checkbox" checked={isOn} onChange={handleChangeSwitch} />
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
    </div>
  );
};

SwitchButton.defaultProps = {
  isOn: true,
  handleChange: () => {},
};

export default SwitchButton;
