import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet-async'
import { DEFAULT_META } from 'config/constants/meta'
import Container from './Container'

const StyledPage = styled(Container)`
  min-height: calc(100vh - 167px);
  padding-top: 67px;
  background: ${({ theme }) => theme.colors.mainBackground};
  background-size: 100% 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-height: calc(100vh - 137px);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    min-height: calc(100vh - 192px);
    padding-top: 100px;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    min-height: calc(100vh - 208px);
    padding-top: 100px;
  }
`

const PageMeta = () => {
  const { title, description } = { ...DEFAULT_META }

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  )
}

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <>
      <PageMeta />
      <StyledPage {...props}>{children}</StyledPage>
    </>
  )
}

export default Page
