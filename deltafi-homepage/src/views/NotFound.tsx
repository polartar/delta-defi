import React from 'react'
import styled from 'styled-components'
import { Button, Text, Heading } from 'components'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`

const NotFound = () => {

  return (
    <StyledNotFound>
      <Heading scale="xxl">404</Heading>
      <Text mb="16px">Oops, page not found.</Text>
      <Button as="a" href="/" scale="sm">
        Back Home
      </Button>
    </StyledNotFound>
  )
}

export default NotFound
