import React from 'react'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

import { DEFAULT_META } from 'config/constants/meta'

const StyledPage = styled.div`
  ${({ theme }) => theme.mediaQueries.sm} {
  }

  ${({ theme }) => theme.mediaQueries.md} {
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 100%;
    padding: 0;
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
