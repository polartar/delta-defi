import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container } from '@material-ui/core'
import styled from 'styled-components'

import { DEFAULT_META } from 'config/constants/meta'

const StyledPage = styled(Container)`
  padding: 0 30px;

  ${({ theme }) => theme.mediaQueries.sm} {
  }

  ${({ theme }) => theme.mediaQueries.md} {
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 1240px;
    margin: 0 auto;
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
