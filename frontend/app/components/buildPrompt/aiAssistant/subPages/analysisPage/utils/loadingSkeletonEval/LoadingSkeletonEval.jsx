import React from 'react';
import { Box, Skeleton } from '@mui/material';
import styles from './loadingSkeletonEval.style';

const LoadingSkeletonEval = () => {
  return (
    <Box sx={ styles.skeletonContainer }>
      <Skeleton variant="text" sx={ styles.skeletonHeading } />
      <Skeleton variant="text" sx={ styles.skeletonText } width="92%"/>
      <Skeleton variant="text" sx={ styles.skeletonText } width="93%"/>
    </Box>
  );
};

export default LoadingSkeletonEval;