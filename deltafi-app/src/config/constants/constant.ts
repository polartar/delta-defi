export const HOMEPAGE_LINK = process.env.REACT_HOMPAGE_URL || 'https://deltafi.ai'
export const APP_LINK = process.env.REACT_APP_URL || 'http://localhost:3001'
export const BLOG_LINK = 'https://medium.com/@deltafi_ai'
export const TWITTER_LINK = 'https://twitter.com/deltafi_ai'
export const DISCORD_LINK = 'https://discord.com/invite/6maaM2cYqr'
export const GITHUB_LINK = 'https://github.com/delta-fi'
export const TELEGRAM_LINK = "https://t.me/deltafi_ai"
export const YOUTUBE_LINK = "https://youtube.com"

export const MAINNET_CHAIN_ID = 1;
export const connectorLocalStorageKey = "connectorId"

export const WALLETS = {
    LEDGER: 'Ledger',
    SOLFLARE: 'Solflare',
    SOLFLARE_EXTENSION: 'Solflare Extension',
    SOLLET: 'Sollet',
    SOLLET_EXTENSION: 'Sollet Extension',
    PHANTOM: 'Phantom',
    MATHWALLLET: 'MathWallet',
}

export { default as poolsConfig } from './pools'