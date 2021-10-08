import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, FormControlLabel, IconButton, Radio, RadioGroup, TextareaAutosize, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'

import { ReportModalProps } from './types'

const Container = styled.div`
  position: fixed;
  inset: 0px;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  outline: none;
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 8%) 0px 20px 100px;
  border-radius: 16px;
  width: calc(100% - 32px);
  max-height: calc(100% - 32px);
  overflow-y: auto;
  box-sizing: border-box;

  ${({ theme }) => theme.mediaQueries.lg} {
    max-width: 438px;
    max-height: inherit;
  }
`
const CloseView = styled.div`
  position: relative;

  button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`
const BodyWrapper = styled.div`
  padding: 48px 44px;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  color: black;
  text-align: center;

  h4 {
    margin: 0;

    ${({ theme }) => theme.mediaQueries.xxl} {
      font-size: 25px;
    }
  }

  form {
    margin-top: 15px;
  }
`
const ProblemWrapper = styled.div`
  text-align: left;
  margin-bottom: 24px;

  textarea {
    width: 100%;
  }
`

const Report: React.FC<ReportModalProps> = ({handleCloseModal, handleSubmitReport}) => {
  const [problemType, setProblemType] = useState("rsfw")
  const [content, setContent] = useState("")

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProblemType((event.target as HTMLInputElement).value)
  }

  const handleChangeContent = (value) => {
    setContent(value)
  }

  const handleSubmit = () => {
    handleSubmitReport({
      problemType,
      content
    })
  }

  return (
    <Container>
      <Wrapper>
        <CloseView>
          <IconButton aria-label="close" onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </CloseView>
        <BodyWrapper>
          <Typography variant="h4">Report</Typography>
          <form>
            <ProblemWrapper>
              <Typography variant="subtitle1" gutterBottom>Select a problem</Typography>
              <RadioGroup area-label="Problem Type" name="type" defaultValue={problemType} value={problemType} onChange={handleChangeType}>
                <FormControlLabel value="rsfw" control={<Radio />} label="RSFW" />
                <FormControlLabel value="copyright" control={<Radio />} label="Copyright Violation" />
              </RadioGroup>
            </ProblemWrapper>
            <ProblemWrapper>
              <Typography variant="subtitle1" gutterBottom>Additional comments</Typography>
              <div>
                <TextareaAutosize
                  aria-label="Problem content"
                  minRows={3}
                  maxRows={10}
                  placeholder="Provide useful information for the review team or links to violated content"
                  onChange={handleChangeContent}
                />
              </div>
            </ProblemWrapper>
            <Button color="primary" variant="contained" size="large" fullWidth onClick={handleSubmit}>Report</Button>
          </form>
        </BodyWrapper>
      </Wrapper>
    </Container>
  )
}

export default Report