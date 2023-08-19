import buttonStyle from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <>
      <button className={buttonStyle.Button} type="button" onClick={onClick}>
        Load more
      </button>
    </>
  );
};

Button.propTypes = {
    onClick: PropTypes.func,
  };