import styled from 'styled-components';
import pools from 'config/constants/pools';

import { Text } from 'components/Text';
import { CopyIcon } from 'components/Svg';

import { useModal } from 'store/hooks';
import useTheme from 'hooks/useTheme'

const AccountDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 16px 20px 16px;
  border-radius: 10px;
  padding: 37px 19px 14px 28px;
  background: ${({ theme }) => theme.colors.footerMain};
  .text {
    font-size: 14px;
  }
  .flex {
    justify-content: space-between;
    margin-bottom: 23px;
  }
  .right {
    align-items: left;
    justify-content: flex-end;
  }
  .icon {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin: 17px 32px 0px 37px;
  }
`
const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
  }

`
const RowWrapper = styled.div`
display: flex;
`

const AccountInfoBlock = ({ ...props }) => {

  const { isDark } = useTheme()
  const { depositPid } = useModal()

  const pool = pools.find(item => item.sousId === depositPid)

  return (
    <>
      <AccountDiv>
        <FlexWrapper className="flex">
          <Text color={isDark ? "#FFFFFF" : "#88809C"} fontFamily="'DM Sans', sans-serif" >Pool Token Address</Text>
          <RowWrapper>
            <Text color={isDark ? "#2B8CFF" : "#2B8CFF"} fontFamily="'Inter', sans-serif" >{"address"?.substring(0, 5)}...{"address"?.substring("address"?.length - 4)}</Text>
            <CopyIcon isDark={isDark} className="icon" />
          </RowWrapper>
        </FlexWrapper>
        <FlexWrapper className="flex">
          <Text color={isDark ? "#FFFFFF" : "#88809C"} fontFamily="'DM Sans', sans-serif" >{pool?.stakingToken?.symbol} Address</Text>
          <RowWrapper>
            <Text color={isDark ? "#2B8CFF" : "#2B8CFF"} fontFamily="'Inter', sans-serif" >{"address"?.substring(0, 5)}...{"address"?.substring("address"?.length - 4)}</Text>
            <CopyIcon isDark={isDark} className="icon" />
          </RowWrapper>
        </FlexWrapper>
        <FlexWrapper className="flex">
          <Text color={isDark ? "#FFFFFF" : "#88809C"} fontFamily="'DM Sans', sans-serif" >{pool?.earningToken?.symbol} Address</Text>
          <RowWrapper>
            <Text color={isDark ? "#2B8CFF" : "#2B8CFF"} fontFamily="'Inter', sans-serif" >{"address"?.substring(0, 5)}...{"address"?.substring("address"?.length - 4)}</Text>
            <CopyIcon isDark={isDark} className="icon" />
          </RowWrapper>
        </FlexWrapper>
        <FlexWrapper className="flex">
          <Text color={isDark ? "#FFFFFF" : "#88809C"} fontFamily="'DM Sans', sans-serif" >{pool?.stakingToken?.symbol} Reserves</Text>
          <RowWrapper>
            <Text color={isDark ? "#2B8CFF" : "#2B8CFF"} fontFamily="'Inter', sans-serif" >{"address"?.substring(0, 5)}...{"address"?.substring("address"?.length - 4)}</Text>
            <CopyIcon isDark={isDark} className="icon" />
          </RowWrapper>
        </FlexWrapper>
        <FlexWrapper className="flex">
          <Text color={isDark ? "#FFFFFF" : "#88809C"} fontFamily="'DM Sans', sans-serif" >{pool?.earningToken?.symbol} Reserves</Text>
          <RowWrapper>
            <Text color={isDark ? "#2B8CFF" : "#2B8CFF"} fontFamily="'Inter', sans-serif" >{"address"?.substring(0, 5)}...{"address"?.substring("address"?.length - 4)}</Text>
            <CopyIcon isDark={isDark} className="icon" />
          </RowWrapper>
        </FlexWrapper>
      </AccountDiv>
    </>
  )
}

export default AccountInfoBlock;