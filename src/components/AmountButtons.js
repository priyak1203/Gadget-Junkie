import { FaMinus, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

const AmountButtons = ({ amount, increase, decrease }) => {
  return (
    <Wrapper className="amount-btns">
      <button type="button" onClick={decrease}>
        <FaMinus />
      </button>
      <h2>{amount}</h2>
      <button type="button" onClick={increase}>
        <FaPlus />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 140px;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default AmountButtons;
