export type Breakpoints = string[];

export type MediaQueries = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  nav: string;
};

export type Spacing = number[];

export type Radii = {
  small: string;
  default: string;
  card: string;
  circle: string;
};

export type Shadows = {
  level1: string;
  active: string;
  success: string;
  warning: string;
  focus: string;
  inset: string;
};

export type Gradients = {
  bubblegum: string;
  inverseBubblegum: string;
  cardHeader: string;
  blue: string;
  violet: string;
  violetAlt: string;
  farmNoticeBackground: string;
  priceImpact: string;
  gold: string;
  asset: string;
  deltafi: string;
  card: string;
  slider: string;
};

export type Colors = {
  primary: string;
  primaryBright: string;
  primaryDark: string;
  secondary: string;
  tertiary: string;
  success: string;
  failure: string;
  warning: string;
  cardBorder: string;
  contrast: string;
  dropdown: string;
  dropdownDeep: string;
  invertedContrast: string;
  input: string;
  inputSecondary: string;
  background: string;
  backgroundDisabled: string;
  backgroundAlt: string;
  text: string;
  textDisabled: string;
  textSubtle: string;
  disabled: string;
  footer: string;
  footerMain: string;
  footerText: string;
  btnColor: string;
  investBackground: string;
  cardBackground: string;
  cardBoxShadow: string;
  cardOpacity: string;
  borderColor: string;
  swapCardShadow: string;
  boxShadow: string;
  mainBackground: string;
  menuBackground: string;
  swapIconBackground: string;
  tabBackground: string;
  tabColor: string;
  activeTab: string;
  activeTabText: string;
  cardShadow: string;
  connectItem: string;
  panelBackground: string;
  connectedButton: string;
  transactionBackground: string;
  blurBackground: string;

  // Gradients
  gradients: Gradients;

  // Additional colors
  binance: string;
  overlay: string;
};

export type ZIndices = {
  dropdown: number;
  modal: number;
};
