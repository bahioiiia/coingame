import React from 'react';
import { Box, Typography } from '@mui/material';
import { MoneyItem as MoneyItemType } from '../types';

interface Props {
    item: MoneyItemType;
    onClick: (item: MoneyItemType) => void;
}

const MoneyItem: React.FC<Props> = ({ item, onClick }) => {
    const isBanknote = item.value >= 500;
    const baseSize = isBanknote ? 200 : 100; // Base size in pixels
    const scaledSize = baseSize * item.ratio;

    return (
        <Box
            onClick={() => onClick(item)}
            sx={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.05)'
                }
            }}
        >
            <img
                src={item.image}
                alt={item.name}
                style={{
                    width: scaledSize,
                    // height: isBanknote ? scaledSize * 0.5125 : scaledSize, // Banknote aspect ratio is 160:82 ≈ 0.5125
                    objectFit: 'contain'
                }}
            />
            {/* <Typography variant="body2" color="text.secondary">
                {item.name}
            </Typography> */}
        </Box>
    );
};

export default MoneyItem; 