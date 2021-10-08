import { Link, Typography } from "@material-ui/core";
import styled from "styled-components";

import { ProfileItemProps } from "./types";

const TPItem = styled(Link)`
  text-decoration: none;
  display: inline-block;
  color: #000;

  &:active, &:hover {
    text-decoration: none;
    color: inherit;

    h6 {
      text-decoration: underline;
    }
  }

  .profile-block {
    display: flex;
    align-items: center;

    .profile-photo {
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
        max-height: 100%;
        object-fit: cover;
      }
    }
    
    .profile-info {
      position: relative;

      span {
        font-weight: 500;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.48);
        text-transform: capitalize;
      }
    }
  }
`

const ProfileItem = (props: ProfileItemProps): JSX.Element => {
  const { href, name, type, icon } = props;

  return (
    <TPItem href={href}>
      <div className="profile-block">
        <div className="profile-photo">
          <img src={icon} alt={name} />
        </div>
        <div className="profile-info">
          <Typography variant="h6">{name}</Typography>
          <span>{type}</span>
        </div>
      </div>
    </TPItem>
  );
};

ProfileItem.defaultProps = {
  name: "",
  type: "",
  icon: null
};

export default ProfileItem;
