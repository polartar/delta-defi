import React from "react";
import styled from "styled-components";

interface Props {
  isDark: boolean;
  href: string;
}

const StyledLink = styled.a`
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

const Img = styled.img`
  width: 108px;
  height: 26px;
  padding-right: 12px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 153px;
    height: 37px; 
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 153px;
    height: 37px; 
  }
`

const StyledDiv = styled.div``

const Logo: React.FC<Props> = ({ isDark, href }) => {

  return (
    <StyledDiv>
      <StyledLink href={href} aria-label="DeltaFi home page">
        <Img src={isDark ? '/images/logo-dark.png' : '/images/logo-light.png'} alt="Logo" />
      </StyledLink>
    </StyledDiv>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
