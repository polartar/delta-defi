import React from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import LaunchApp from './LaunchApp'
import DarkMode from './DarkMode'
import Container from './layout/Container'
import { StyledLink } from './LinkList'

import useTheme from 'hooks/useTheme'
import { HOMEPAGE_LINK, BLOG_LINK, TWITTER_LINK, GITHUB_LINK, DISCORD_LINK, YOUTUBE_LINK, CAREERS_LINK, PRIVACY_LINK, TELEGRAM_LINK, DOC_LINK } from 'config/constants/constant'
import { BlogIcon, GithubIcon, TelegramIcon, TwitterIcon, YoutubeIcon } from 'components'

const Wrapper = styled.div`
  font-family: 'Inter', sans-serif;
  order: 2;
  ${({ theme }) => theme.mediaQueries.sm} {
    order: 1;
  }
`
const FlexWrapper = styled(Container)`
	flex: 1;
  display: flex;
  align-items: center;
	justify-content: space-between;
  flex-direction: column;
	padding: 5px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
  ${({ theme }) => theme.mediaQueries.md} {
		padding: 16px 0;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
		padding: 24px 0;
  }
`
const SiteMapWrapper = styled.div`
	display: none;
	align-items: flex-end;
	justify-content: center;
  background-color: ${({ theme }) => theme.colors.footerMain};
  color: ${({ theme }) => theme.colors.footerText};

  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    padding: 12px 14px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    padding: 0;
  }
`

const StyledDiv = styled.div`
	display: flex;
	align-items: flex-end;
  order: 1;
  margin-bottom: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    order: 2;
    margin-bottom: 0;
  }
`

const StyledDivMt = styled(StyledDiv)`
  padding-top: 32px;
  .social-icon {
    width: 40px;
  }
  .font-size-14 {
    font-size: 14px;
    ${({ theme }) => theme.mediaQueries.xl} {
      font-size: 18px;
    }
  }
`
const CopyrightWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.footerMain};
  color: ${({ theme }) => theme.colors.footerText};
  padding: 24px;
  ${({ theme }) => theme.mediaQueries.sm} {
    background-color: ${({ theme }) => theme.colors.footer};
    padding: 12px 24px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    padding: 0;
  }
`
const IconWrapper = styled.div`
  margin: 0 6px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0 16px;
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
    a {
      padding-right: 0;
    }
  }
`
const Footer: React.FC = () => {
	const { isDark, toggleTheme } = useTheme()
  const textColor = isDark ? '#FFF' : '#000' 
  return (
    <Wrapper>
      <SiteMapWrapper>
        <FlexWrapper>
          <Wrapper>
            <Logo href={HOMEPAGE_LINK} isDark={isDark}/>
            <StyledDivMt>
              <StyledLink color={textColor} href={TWITTER_LINK} target="_blank" rel="noreferrer noopener" className="font-size-14">Twitter</StyledLink>
              <StyledLink color={textColor} href={DISCORD_LINK} target="_blank" rel="noreferrer noopener" className="font-size-14">Discord</StyledLink>
              <StyledLink color={textColor} href={GITHUB_LINK} target="_blank" rel="noreferrer noopener" className="font-size-14">Github</StyledLink>
              <StyledLink color={textColor} href={BLOG_LINK} target="_blank" rel="noreferrer noopener" className="font-size-14">Blog</StyledLink>
              <StyledLink color={textColor} href={DOC_LINK} target="_blank" rel="noreferrer noopener" className="font-size-14">Docs</StyledLink>
              <StyledLink color={textColor} href={CAREERS_LINK} className="font-size-14">Careers</StyledLink>
              <StyledLink color={textColor} href={PRIVACY_LINK} className="font-size-14">Privacy Policy</StyledLink>
            </StyledDivMt>
          </Wrapper>
          <StyledDiv>
            <DarkMode toggleTheme={toggleTheme} isDark={isDark}/>
            <LaunchApp primary="primary"/>
          </StyledDiv>
        </FlexWrapper>
      </SiteMapWrapper>
      <CopyrightWrapper>
        <FlexWrapper>
          <Wrapper>© 2021 DeltaFi. All rights reserved</Wrapper>
          <StyledDiv>
            <IconWrapper>
              <StyledLink href={GITHUB_LINK} target="_blank" rel="noreferrer noopener"><GithubIcon isDark={isDark} width="40px"/></StyledLink>
            </IconWrapper>
            <IconWrapper>
              <StyledLink href={TELEGRAM_LINK} target="_blank" rel="noreferrer noopener"><TelegramIcon isDark={isDark} width="40px"/></StyledLink>
            </IconWrapper>
            <IconWrapper>
              <StyledLink href={BLOG_LINK} target="_blank" rel="noreferrer noopener"><BlogIcon isDark={isDark} width="40px"/></StyledLink>
            </IconWrapper>
            <IconWrapper>
              <StyledLink href={TWITTER_LINK} target="_blank" rel="noreferrer noopener"><TwitterIcon isDark={isDark} width="40px"/></StyledLink>
            </IconWrapper>
            <IconWrapper>
              <StyledLink href={YOUTUBE_LINK} target="_blank" rel="noreferrer noopener"><YoutubeIcon isDark={isDark} width="40px"/></StyledLink>
            </IconWrapper>
          </StyledDiv>
        </FlexWrapper>
      </CopyrightWrapper>
    </Wrapper>
  )
}

export default Footer
