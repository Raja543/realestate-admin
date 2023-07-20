import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ buttonText }) => {
  return ( <button className="bg-orange max-w-fit text-textwhite font-[Albert-sans] py-2 px-6 rounded-md duration-500">
      {buttonText}
    </button>
   
  );
};

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default Button;
