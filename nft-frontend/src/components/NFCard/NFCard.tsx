import { Card, CardActions, CardContent, CardMedia, Divider, IconButton, Typography } from "@material-ui/core";
import styled, { DefaultTheme } from "styled-components";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import getThemeValue from "util/getThemeValue";
import { NFCardProps } from "./types";

interface ThemedProps {
  color?: string,
  theme: DefaultTheme;
}

const getColor = ({ color, theme }: ThemedProps) => {
  return getThemeValue(`colors.${color}`, color)(theme);
};

const SCHotCard = styled(Card)`
  position: relative;
  cursor: pointer;

  .media {
    border-radius: 4px;
    padding-top: 100%;
  }
  .content {
    height: 94px;

    .title {
      margin-bottom: 0;
      line-height: 1.2;
    }
  }
  .actions-bar {
    button {
      padding: 4px;
      color: ${getColor};
    }
    .MuiIconButton-label {
      font-size: 12px;
    }
    .MuiSvgIcon-root {
      font-size: 16px;
    }
    .price {
      flex: 1;
      justify-content: start;
    }
  }
`

const DropDown = (props: NFCardProps): JSX.Element => {
  const { image, title, content, price, handleClick } = props;

  return (
    <SCHotCard onClick={handleClick}>
      <CardMedia
        className="media"
        image={image}
        title={title}
      />
      <CardContent className="content">
        <Typography className="title" gutterBottom variant="h6" component="h4">
          {title}
        </Typography>
        <Typography className="body" variant="body2" color="textSecondary" component="p">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="actions-bar">
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Divider orientation="vertical" flexItem />
        <IconButton aria-label="share" className="price">
          {price} <ShareIcon />
        </IconButton>
        <IconButton
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </SCHotCard>
  );
};

DropDown.defaultProps = {
  image: "",
  title: "",
  content: "",
  price: "",
  handleClick: () => {},
};

export default DropDown;
