import React from 'react';

export default function Spacer({height="1px", width="1px"}) {
  return <div style={{display: 'flex', height: height, width: width, backgroundColor: 'transparent'}}></div>
}
