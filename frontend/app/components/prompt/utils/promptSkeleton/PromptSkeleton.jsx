import React from 'react';
import { Box, Chip, Divider, Skeleton } from '@mui/material';
import styles from "./promptSkeleton.style";

const PromptSkeleton = () => {
    return (
        <Box sx={ styles.skeletonBody }>
            {/* Skeleton for the heading and status */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton variant="text" sx={ styles.skeletonText } width={150} />
                <Skeleton variant="rectangular" sx={ styles.skeletonChip } />
            </Box>

            {/* Skeleton for the date created */}
            <Box sx={ styles.skeletonDateCreated }>
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton variant="text" sx={ styles.skeletonText } width={100} />
            </Box>

            {/* Skeleton for the view more button */}
            <Box sx={ styles.skeletonViewMore }>
                <Skeleton variant="text" sx={ styles.skeletonText } width={80} />
                <Skeleton variant="circular" width={20} height={20} />
            </Box>
        </Box>
    );
};

export default PromptSkeleton;
