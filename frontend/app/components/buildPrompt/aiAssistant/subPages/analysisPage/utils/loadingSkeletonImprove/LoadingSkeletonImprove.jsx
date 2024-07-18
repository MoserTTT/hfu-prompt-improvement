import React from 'react';
import { Box, Skeleton, Typography, Button } from '@mui/material';
import styles from './loadingSkeletonImprove.style';

const LoadingSkeletonImprove = () => {
  return (
    <Box sx={ styles.skeletonContainer }>
      <Box sx={ styles.skeletonHeader }>
        <Button disabled>
          <Skeleton variant="circular" width={18} height={18} sx={{ mr: 1 }} />
          <Skeleton variant="text" width="110px"/>
        </Button>
      </Box>
      <Box sx={ styles.skeletonContent }>
        <Skeleton sx={ styles.skeletonText } variant="text" width="95%"/>
        <Skeleton sx={ styles.skeletonText } variant="text" width="89%"/>
        <Skeleton sx={ styles.skeletonText } variant="text" width="92%" />
        <Skeleton sx={ styles.skeletonText } variant="text" width="89%"/>
      </Box>
    </Box>
  );
};

export default LoadingSkeletonImprove;