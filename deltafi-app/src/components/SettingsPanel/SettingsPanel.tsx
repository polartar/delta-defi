import styled, { useTheme } from "styled-components";

import { Button, IconButton } from "components/Button";
import { SwitchButton } from "components/SwitchButton";
import { Text } from "components/Text";
import { SettingsProps } from "./types";

const PRICE_LIST = ["0.5", "1.0", "2.0", "0.0"]

const Wrapper = styled.div`
  margin-top: 16px;
  padding: 21px 24px;
  background: ${({ theme }) => theme.colors.tabBackground};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  border-radius: 6px;
`
const Title = styled.div`
  position: relative;
  padding-bottom: 20px;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.borderColor};

  .close-button {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 14px;
  }
  .close-button:before, .close-button:after {
    position: absolute;
    content: ' ';
    height: 15px;
    width: 2px;
    background-color: ${({ theme }) => theme.colors.text};
  }
  .close-button:before {
    transform: rotate(45deg);
  }
  .close-button:after {
    transform: rotate(-45deg);
  }
`
const PriceImpactWrapper = styled.div`
  padding: 21px 0;

`
const PriceList = styled.ul`
  padding: 0px;
  margin: 0px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr 1fr 1fr 2fr;

    &.small {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`
const PriceItem = styled.li`
  list-style: none;
  background: ${({ theme }) => theme.colors.activeTab};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 2px;
  box-shadow: rgb(0 0 0 / 8%) 0px 20px 100px;
  box-sizing: border-box;
  
  &:last-child {
    grid-column: 1 / 4;

    ${({ theme }) => theme.mediaQueries.md} {
      grid-column: auto;

      &.small {
        grid-column: 1 / 4;
      }
    }
  }

  &.active {
    background: ${({ theme }) => theme.colors.gradients.priceImpact};
    border: none;
  }

  button {
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    padding: 0 20px;
    color: ${({ theme }) => theme.colors.text}
  }
`

const SettingsPanel = (props: SettingsProps): JSX.Element => {
  const { isDark } = useTheme()
  const { priceImpact, isIncludeDecimal, isSmall, handleChangeImpact, handleChangeInclude, handleClose } = props;

  return (
    <Wrapper>
      <Title>
        <Text fontSize="16px" fontWeight="500" fontFamily="Inter" lineHeight="19px" color={isDark ? "#FFFFFFB2" : "#000000B2"}>Settings</Text>
        <IconButton className="close-button" variant="text" width="14px" height="14px" borderRadius="0" onClick={handleClose} />
      </Title>
      <PriceImpactWrapper>
        <Text fontSize="14px" fontWeight="500" fontFamily="Inter" lineHeight="17px" pb="12px" color={isDark ? "#FFFFFFB2" : "#000000B2"}>Max Price Impact</Text>
        <PriceList className={isSmall ? "small" : ""}>
          {PRICE_LIST.map(price => (
            <PriceItem key={`item-${price}`} className={`${priceImpact === price ? "active" : ""} ${isSmall ? "small" : ""}`} onClick={() => handleChangeImpact(price)} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs={`page: Settings, target: MaxPriceImpact(${price})}`}>
              <Button variant="text" width="100%" height="39px">{`${price}%`}</Button>
            </PriceItem>
          ))}
        </PriceList>
      </PriceImpactWrapper>
      <div>
        <Text fontSize="14px" fontWeight="500" fontFamily="Inter" lineHeight="17px" pb="12px" color={isDark ? "#FFFFFFB2" : "#000000B2"}>Always include decimal wrapped tokens in list?</Text>
        <SwitchButton isOn={isIncludeDecimal} handleChange={handleChangeInclude} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs={`page: Settings, target: IncludeDecimal(${!isIncludeDecimal})}`} />
      </div>
    </Wrapper>
  );
};

SettingsPanel.defaultProps = {
  priceImpact: '2.0%',
  isIncludeDecimal: true,
  isSmall: false,
  handleChangeImpact: () => {},
  handleChangeInclude: () => {},
  handleClose: () => {},
};

export default SettingsPanel;
