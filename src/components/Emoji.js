import React from 'react';

const Emoji = ({ e, n }) => (
  <span role='img' aria-label={n || 'emoji'}>{e}</span>
);

export default Emoji;
