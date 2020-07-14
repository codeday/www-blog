import React from 'react';
import Box from '@codeday/topo/Atom/Box';
import Skelly from '@codeday/topo/Atom/Skelly';

export default function SkellyPara() {
  const paraCount = Math.floor(Math.random() * 4) + 3;
  return (
    <Box mb={4}>
      {[...Array(paraCount)].map(() => <Skelly width={`${(Math.random() * 20) + 80}%`} />)}
    </Box>
  );
}
