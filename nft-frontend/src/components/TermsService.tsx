import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import { Text } from 'components';
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, FormControlLabel, Button } from '@material-ui/core'

interface TermsServiceProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const Container = styled.div`
  position: relative;
`;

const P = styled.p`
  color: grey;
  font-size: 16px;
  text-align: left
`;

const DialogContainer = styled.div`
  outline: none;
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 8%) 0px 20px 100px;
  border-radius: 16px;
  width: 100%;
  overflow-y: auto;
  position: relative;
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 400px;
    max-height: inherit;
  }
`

const DialogContent = styled.div`
  padding: 38px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  text-align: center;
  .title {
    font-size: 25px;
    text-align: left;
  }
  .description {
    font-size: 20px;
    line-height: 26px;
    word-break: break-word;
    margin-bottom: 12px;
    margin-top: 32px;
  }
  .private {
    word-break: break-word;
    margin: 60px auto 0px;
    max-width: 238px;
    font-size: 16px !important;
    line-height: 19px !important;
    text-align: center !important;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    .title {
      font-size: 32px;
    }
  }
`

const useStyles = makeStyles(theme => ({
  paper: {
    margin: 16,
    borderRadius: '30px'
  },
  btnAccept: {
    backgroundColor: "#256de7",
    color: "white",
    padding: "20px",
    borderRadius: "20px",
    marginTop: "10px",
    [`&:hover`]: {
      backgroundColor: "#155df7"
    },
  }
}));

const TermsService: React.FC<TermsServiceProps> = ({ open, setOpen }) => {
  const classes = useStyles()
  const [isAccept, setIsAccept] = useState(false);
  
  const onClose = () => {
    setOpen(false)
  }

  return (
    <Container>
      <Dialog
        onClose={() => {}}
        open={open}
        classes={{
          paper: classes.paper
        }}
      >
        <DialogContainer>
          <DialogContent>
            <Text color={"#000000"} className="title">Terms of Service</Text>

            <P>
              Please take a few minutes to read and understand AirNFTs Terms of Service.
              <br/>
              To continue, you will need to accept the Terms of Service by checking the box.
            </P>
            <FormControlLabel control={<Checkbox checked={isAccept} onChange={event => setIsAccept(event.target.checked)} />} label="I accept the AirNFTs Terms of Service" />

            <Button disabled={!isAccept} variant="contained" className={classes.btnAccept} onClick={() => onClose()}>
              Accept
            </Button>
          </DialogContent>
        </DialogContainer>
      </Dialog>
    </Container>
  );
};

export default TermsService;
