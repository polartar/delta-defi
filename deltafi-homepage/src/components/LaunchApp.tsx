import React from "react";
import { Button } from "components";
import { APP_LINK } from "config/constants/constant";
import { Variant } from 'components/Button/types'

interface Props {
  primary?: Variant;
}
const LaunchApp: React.FC<Props> = ({primary}) => {

  return (
    <Button variant={primary} as="a" href={APP_LINK} external width="158px">
      LAUNCH APP
    </Button>
  );
};

export default React.memo(LaunchApp);
