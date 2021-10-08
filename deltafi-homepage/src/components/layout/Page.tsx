import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet-async'
import { DEFAULT_META } from 'config/constants/meta'

const StyledPage = styled.div`
  background: ${({ theme }) => theme.colors.mainBackground};
  font-family: 'Inter', sans-serif;
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
