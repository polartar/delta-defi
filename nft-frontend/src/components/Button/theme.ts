import { scales, variants } from "./types";

export const scaleVariants = {
  [scales.MD]: {
    height: "60px",
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
    backgroundImage: "linear-gradient(180deg, #88809C 0%, #595368 100%)",
    color: "white",
  },
  [variants.SECONDARY]: {
    backgroundImage: "linear-gradient(171.96deg, #FE5B78 -30.48%, #E11348 93.81%)",
    color: "white",
  },
  [variants.DARK]: {
    backgroundColor: "black",
    color: "white", 
  },
  [variants.TEXT]: {
    backgroundColor: "transparent",
    boxShadow: "none",
  }
};
