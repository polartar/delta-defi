import { Typography } from "@material-ui/core";
import styled from "styled-components";

import { ChainItemProps } from "./types";

const TPItem = styled.div`
  display: flex;
  align-items: center;

  .chain-info {
    position: relative;
    margin-left: 12px;

    span {
      font-weight: 500;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.48);
      text-transform: capitalize;
    }
  }
`

const ChainItem = (props: ChainItemProps): JSX.Element => {
  const { name, type, icon } = props;

  return (
    <TPItem>
      {icon}
      <div className="chain-info">
        <Typography variant="h6">{name}</Typography>
        <span>{type}</span>
      </div>
    </TPItem>
  );
};

ChainItem.defaultProps = {
  name: "",
  type: "",
  icon: null
};

export default ChainItem;
