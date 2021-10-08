import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  margin: 0 auto;

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 738px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    max-width: 1085px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    max-width: 1240px
  }
`

export default Container
