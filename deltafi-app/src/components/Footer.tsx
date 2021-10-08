import React from 'react'
import styled from 'styled-components'

import { StyledLink } from './LinkList'
import DarkMode from './DarkMode'

import useTheme from 'hooks/useTheme'
import { BLOG_LINK, TWITTER_LINK, YOUTUBE_LINK, GITHUB_LINK, TELEGRAM_LINK } from 'config/constants/constant'

import { BlogIcon, TwitterIcon, YoutubeIcon, GithubIcon, TelegramIcon } from 'components'

const FlexWrapper = styled.div`
	flex: 1;
  display: flex;
  align-items: center;
	justify-content: space-between;
  flex-direction: column;
	margin: 5px 0;
	padding-left: 24px;
  padding-right: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
  ${({ theme }) => theme.mediaQueries.md} {
		margin: 16px 0;
    padding-left: 76px;
    padding-right: 76px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
		margin: 24px 0;
    padding-left: 200px;
    padding-right: 200px;
  }
`
const StyledDiv = styled.div`
	display: flex;
	align-items: center;
  order: 1;
  margin-bottom: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    order: 2;
    margin-bottom: 0;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    order: 1;
    margin-bottom: 0;
  }
`
const Wrapper = styled.div`
  font-family: 'Inter', sans-serif;
  order: 2;
  ${({ theme }) => theme.mediaQueries.sm} {
    order: 1;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    order: 2;
  }
`
const FooterContaier = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.footerMain};
  color: ${({ theme }) => theme.colors.footerText};
  padding: 24px;
  ${({ theme }) => theme.mediaQueries.xs} {
    background-color: ${({ theme }) => theme.colors.footerMain};
    flex-direction: row;
    padding: 0;
  }
`
const IconWrapper = styled.div`
  margin: 0 6px;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0 16px;
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  a {
    padding: 0;
  }
`
const Footer: React.FC = () => {
	const { isDark, toggleTheme } = useTheme()
  return (
    <Wrapper>
      <FooterContaier>
        <FlexWrapper>
          <Wrapper>© 2021 DeltaFi. All rights reserved</Wrapper>
          <StyledDiv>
            <IconWrapper>
              <DarkMode toggleTheme={toggleTheme} isDark={isDark}/>
            </IconWrapper>
            <IconWrapper>
              <StyledLink href={GITHUB_LINK} target="_blank" rel="noreferrer noopener" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Footer, target: Github"><GithubIcon isDark={isDark} width="34px"/></StyledLink>
            </IconWrapper>
            <IconWrapper>
              <StyledLink href={TELEGRAM_LINK} target="_blank" rel="noreferrer noopener" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Footer, target: Telegram"><TelegramIcon isDark={isDark} width="34px"/></StyledLink>
            </IconWrapper>
            <IconWrapper>
              <StyledLink href={BLOG_LINK} target="_blank" rel="noreferrer noopener" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Footer, target: Blog"><BlogIcon isDark={isDark} width="34px"/></StyledLink>
            </IconWrapper>
            <IconWrapper>
              <StyledLink href={TWITTER_LINK} target="_blank" rel="noreferrer noopener" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Footer, target: Twitter"><TwitterIcon isDark={isDark} width="34px"/></StyledLink>
            </IconWrapper>
            <IconWrapper>
              <StyledLink href={YOUTUBE_LINK} target="_blank" rel="noreferrer noopener" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Footer, target: Youtube"><YoutubeIcon isDark={isDark} width="34px"/></StyledLink>
            </IconWrapper>
          </StyledDiv>
        </FlexWrapper>
      </FooterContaier>
    </Wrapper>
  )
}

export default Footer
