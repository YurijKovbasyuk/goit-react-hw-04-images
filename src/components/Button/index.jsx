import css from './index.module.css';
import PropTypes from 'prop-types';

function Button(props) {
  const { onClick, isLoading } = props;
  return (
    <div>
      <button
        className={css.button}
        type="button"
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? 'Loadaig...' : 'Load more'}
      </button>
    </div>
  );
}

Button.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default Button;
