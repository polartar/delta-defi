import { Link, Typography } from "@material-ui/core";
import styled, { DefaultTheme } from "styled-components";
import FavoriteIcon from '@material-ui/icons/Favorite';

import getThemeValue from "util/getThemeValue";
import { TraderItemProps } from "./types";

interface ThemedProps {
  color?: string,
  theme: DefaultTheme;
}

const getColor = ({ color, theme }: ThemedProps) => {
  return getThemeValue(`colors.${color}`, color)(theme);
};

const TPItem = styled(Link)`
  width: 100%;
  padding: 10px 28px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 50%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 33.333%;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 25%;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    width: 20%;
  }

  &:hover {
    text-decoration: none;
  }
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }

  .trader-item {
    display: flex;
    align-items: center;
  }
  .image {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    background: black;
    border-radius: 30px;
    margin-right: 12px;
    overflow: hidden;

    img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
  }
  .content {
    color: ${getColor};
    h6 {
      margin: 0px;
      font-weight: 500;
      font-size: 20px;
      color: black;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-break: break-all;
    }
    svg {
      width: 14px;
      height: 14px;
      fill: black;
      position: relative;
      top: 2px;
      margin-right: 4px;
    }
  }
`

const TraderItem = (props: TraderItemProps): JSX.Element => {
  const { title, point, icon, href, handleClick } = props;

  return (
    <TPItem href={href} onClick={handleClick}>
      <div className="trader-item">
        <div className="image">
          <img src={icon} alt={title} />
        </div>
        <div className="content">
          <Typography variant="h6">{title}</Typography>
          <FavoriteIcon />
          {point}
        </div>
      </div>
    </TPItem>
  );
};

TraderItem.defaultProps = {
  title: "",
  point: 0.0,
  icon: "",
  href: "#",
  handleClick: () => {},
};

export default TraderItem;
