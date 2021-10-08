import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LogoIcon } from "components";

interface Props {
  isDark: boolean;
  href: string;
}

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  .desktop-icon {
    width: 100px;
    ${({ theme }) => theme.mediaQueries.sm} {
      width: 120px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      width: 137px; 
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      width: 178px;
    }
  }
`;

const StyledDiv = styled.div``

const Logo: React.FC<Props> = ({ isDark, href }) => {

  return (
    <StyledDiv>
      <StyledLink to={href} aria-label="DeltaFi home page">
        <LogoIcon className="desktop-icon" isDark={isDark}/>
      </StyledLink>
    </StyledDiv>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
