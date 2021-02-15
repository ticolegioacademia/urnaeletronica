import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.contrastText};
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
  outline: 0;
  padding: 10px 16px;
  transition: .3s;
  text-transform: uppercase;
  width: 100%;
  cursor: pointer;

  &:hover,
  &:focus {
    opacity: .5;
  }

  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`;

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;