import { SwapCard } from "config/constants/types";

export interface CardProps {
  card: SwapCard
  isLast?: boolean
  handleChangeCard: any
}