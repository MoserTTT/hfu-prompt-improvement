import React from 'react';
import { Box, Skeleton } from '@mui/material';
import styles from './loadingSkeletonEval.style';

const LoadingSkeletonEval = () => {
  return (
    <Box sx={ styles.skeletonContainer }>
      <Skeleton variant="text" sx={ styles.skeletonHeading } />
      <Skeleton variant="text" sx={ styles.skeletonText } />
      <Skeleton variant="text" sx={ styles.skeletonText } />
    </Box>
  );
};

export default LoadingSkeletonEval;