import React from 'react';
import css from './styles.module.css';

export default function ResetButton(props) {
  const { onClick, className } = props;
 
  return (
    <button
      onClick={onClick}
      className={className || css.default }
    >
      Reset
    </button>
  )
}