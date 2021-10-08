import { createGlobalStyle } from 'styled-components'
import { AppTheme } from 'theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends AppTheme {}
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
