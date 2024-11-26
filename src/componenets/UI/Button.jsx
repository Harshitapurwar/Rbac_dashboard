import React from 'react';

const Button = ({ onClick, className, children }) => (
  <button onClick={onClick} className={`py-2 px-4 rounded-md ${className}`}>
    {children}
  </button>
);

export default Button;
