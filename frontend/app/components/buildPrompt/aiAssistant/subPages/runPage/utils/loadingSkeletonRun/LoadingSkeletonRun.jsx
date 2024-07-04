import React from "react";
import { Skeleton, Box } from "@mui/material";
import  styles from "./loadingSkeletonRun.style";

const LoadingSkeletonRun = () => {
  return (
    <Box sx={  styles.skeletonContainer }>
      <Skeleton variant="text" sx={ styles.skeletonText } width="100px" />
      <Skeleton variant="text" sx={ styles.skeletonText } width="690px" />
      <Skeleton variant="text" sx={ styles.skeletonText } width="640px" />
      <Skeleton variant="text" sx={ styles.skeletonText } width="670px" />
      <Skeleton variant="text" sx={ styles.skeletonText } width="680px" />
      <Skeleton variant="text" sx={ styles.skeletonText } width="640px" />
    </Box>
  );
};

export default LoadingSkeletonRun;
