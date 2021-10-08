import styled from "styled-components";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";
import { BrandCardProps } from "./types";

const SCCard = styled(Card)`
  border-radius: 8px;

  .media {
    height: 300px;
  }
  .content {
    background: #000;
    height: 150px;
  }
  .title {
    color: #fff;
  }
  .body {
    color: #aaa;
  }
`

const BrandCard = (props: BrandCardProps): JSX.Element => {
  const { image, title, content, handleClick } = props;

  return (
    <SCCard onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          className="media"
          image={image}
          title={title}
        />
        <CardContent className="content">
          <Typography className="title" gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography className="body" variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </SCCard>
  );
};

BrandCard.defaultProps = {
  image: "",
  title: "",
  content: "",
  handleClick: () => {},
};

export default BrandCard;
