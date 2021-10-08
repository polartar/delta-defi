import { scales, variants } from "./types";

export const scaleVariants = {
  [scales.MD]: {
    height: "50px",
    padding: "0 24px",
  },
  [scales.SM]: {
    height: "32px",
    padding: "0 16px",
  },
  [scales.XS]: {
    height: "20px",
    fontSize: "12px",
    padding: "0 8px",
  },
};

export const styleVariants = {
  [variants.PRIMARY]: {
    background: "linear-gradient(171.96deg, #FE5B78 -30.48%, #E11348 93.81%)",
    color: "white",
  },
  [variants.SECONDARY]: {
    background: "linear-gradient(168.15deg, #FFFFFF -145.84%, #E0DBEF 148.53%)",
    color: "primary",
  },
  [variants.DARK]: {
    background: "linear-gradient(180deg, #23242F 0%, #0C0C13 100%)",
    color: "white",
  },
  [variants.TEXT]: {
    background: "transparent",
    boxShadow: "none",
  }
};
