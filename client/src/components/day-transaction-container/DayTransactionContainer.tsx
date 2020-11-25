import React from 'react';
import Styled from 'styled-components';
import Income from '../../types/income';
import Expenditure from '../../types/expenditure';
import { numberWithCommas } from '../../utils/number';
import { RED, BLUE, GREY } from '../../constants/color';

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  widhth: 100%;
`;

const DayTransactionHeader = Styled.div<{ totalAmount: number }>`
  display: flex;
  width: 100%;
  border-bottom: 2px solid ${GREY};
  margin-bottom: 20px;
  padding-bottom: 10px;
  .header-item {
    &:nth-child(1) {
      width: 12%;
    }
    &:nth-child(2) {
      width: 72%;
    }
    &:nth-child(3) {
      width: 16%;
      text-align: right;
      padding-right: 10px;
    }
  }
  .total-amount {
    color: ${({ totalAmount }) => (totalAmount >= 0 ? BLUE : RED)};
  }
`;

interface Props {
  transactions: Array<Income | Expenditure>;
}

const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

const DayTransactionContainer = ({ transactions }: Props): JSX.Element => {
  const date = new Date(transactions[0].date).getDate();
  const day = days[new Date(transactions[0].date).getDay()];
  const totalAmount = transactions.reduce((sum, transaction) => {
    return sum + transaction.amount;
  }, 0);

  return (
    <Container>
      <DayTransactionHeader totalAmount={totalAmount}>
        <div className="header-item">
          {date}일 {day}
        </div>
        <div className="header-item"></div>
        <div className="header-item total-amount">
          {totalAmount >= 0 ? '+' + numberWithCommas(totalAmount) : '-' + numberWithCommas(totalAmount)}원
        </div>
      </DayTransactionHeader>
    </Container>
  );
};

export default DayTransactionContainer;
