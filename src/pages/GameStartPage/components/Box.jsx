import React from 'react';
import '../GameStartPage.css';

const Box = (props) => (
  <div className="example">
    {props.title} {props.postfix}
  </div>
);

export default Box;