import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Box, 
    Typography, 
    Button, 
    Grid, 
    Paper,
    Stack,
    LinearProgress
} from '@mui/material';
import { RootState } from '../types';
import { addMoney, resetGame } from '../store/gameSlice';
import MoneyItem from './MoneyItem';

// Mock data - replace with your actual images
const banknotes = [
    { value: 50000, name: '500€', image: '../img/500e.png', ratio: 1.0 },      // 160mm
    { value: 20000, name: '200€', image: '../img/200e.png', ratio: 0.956 },    // 153mm
    { value: 10000, name: '100€', image: '../img/100e.png', ratio: 0.919 },    // 147mm
    { value: 5000, name: '50€', image: '../img/50e.png', ratio: 0.875 },       // 140mm
    { value: 2000, name: '20€', image: '../img/20e.png', ratio: 0.831 },       // 133mm
    { value: 1000, name: '10€', image: '../img/10e.png', ratio: 0.794 },       // 127mm
    { value: 500, name: '5€', image: '../img/5e.png', ratio: 0.75 }            // 120mm
].sort((a, b) => b.value - a.value);

const coins = [
    { value: 200, name: '2€', image: '../img/2e.png', ratio: 1.0 },        // 25.75mm
    { value: 100, name: '1€', image: '../img/1e.png', ratio: 0.903 },      // 23.25mm
    { value: 50, name: '50¢', image: '../img/50.png', ratio: 0.942 },      // 24.25mm
    { value: 20, name: '20¢', image: '../img/20.png', ratio: 0.864 },      // 22.25mm
    { value: 10, name: '10¢', image: '../img/10.png', ratio: 0.767 },      // 19.75mm
    { value: 5, name: '5¢', image: '../img/5.png', ratio: 0.825 },         // 21.25mm
    { value: 2, name: '2¢', image: '../img/2.png', ratio: 0.728 },         // 18.75mm
    { value: 1, name: '1¢', image: '../img/1.png', ratio: 0.631 }          // 16.25mm
].sort((a, b) => b.value - a.value);

const Game: React.FC = () => {
    const dispatch = useDispatch();
    const { targetAmount, currentAmount, selectedBanknotes, selectedCoins } = 
        useSelector((state: RootState) => state.game);

    // Mock progress data (1-5)
    const progressValue = 3;

    const handleMoneyClick = (item: typeof banknotes[0] | typeof coins[0]) => {
        dispatch(addMoney(item));
    };

    const handleReset = () => {
        dispatch(resetGame());
    };

    const getAmountColor = () => {
        if (currentAmount === targetAmount) return 'success.main';
        if (currentAmount > targetAmount) return 'error.main';
        return 'text.primary';
    };

    const getProgressColor = (value: number) => {
        if (value <= 2) return 'error';
        if (value <= 4) return 'warning';
        return 'success';
    };

    const renderSelectedMoney = (items: { [key: number]: typeof banknotes[0][] }, isBanknote: boolean) => {
        return Object.entries(items)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([value, items]) => (
                <Box key={value} sx={{ gridColumn: 'span 1' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {items.map((item, index) => (
                            <MoneyItem 
                                key={index} 
                                item={item} 
                                onClick={() => {}}
                            />
                        ))}
                    </Box>
                </Box>
            ));
    };

    return (
        <Box sx={{ 
            display: 'flex',
            minHeight: '100vh',
            '@media (max-width: 1439px)': {
                flexDirection: 'column'
            }
        }}>
            {/* Left Sidebar / Top Panel */}
            <Paper sx={{ 
                p: 2,
                width: '300px',
                '@media (min-width: 1440px)': {
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0
                },
                '@media (max-width: 1439px)': {
                    width: '100%',
                    position: 'static'
                },
                display: 'flex',
                flexDirection: { xs: 'row', xl: 'column' },
                alignItems: { xs: 'center', xl: 'flex-start' },
                gap: 2
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    gap: 1
                }}>
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            Target:
                        </Typography>
                        <Typography variant="h4">
                            Current:
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h4" gutterBottom>
                            {(targetAmount / 100).toFixed(2)}€
                        </Typography>
                        <Typography 
                            variant="h4" 
                            color={getAmountColor()}
                        >
                            {(currentAmount / 100).toFixed(2)}€
                        </Typography>
                    </Box>
                </Box>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleReset}
                    sx={{ 
                        width: { xs: 'auto', xl: '100%' },
                        minWidth: { xs: '120px', xl: 'auto' },
                        height: { xs: '120px', xl: '60px' }
                    }}
                >
                    Reset<br/>Game
                </Button>
                <Box sx={{ 
                    flexGrow: 1,
                    width: { xs: '100%', xl: 'auto' }
                }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Progress
                    </Typography>
                    <LinearProgress 
                        variant="determinate" 
                        value={(progressValue / 5) * 100}
                        color={getProgressColor(progressValue)}
                        sx={{ height: 50, borderRadius: 5 }}
                    />
                </Box>
            </Paper>

            {/* Main Content */}
            <Box sx={{ 
                flexGrow: 1,
                '@media (min-width: 1440px)': {
                    ml: '300px'
                },
                p: 2
            }}>
                <Stack spacing={2}>
                    <Paper sx={{ p: 2 }}>
                        {/* <Typography variant="h5" gutterBottom>Banknotes</Typography> */}
                        <Grid container spacing={2}>
                            {banknotes.map((banknote) => (
                                <Box key={banknote.value} sx={{ gridColumn: 'span 1' }}>
                                    <MoneyItem 
                                        item={banknote} 
                                        onClick={handleMoneyClick}
                                    />
                                </Box>
                            ))}
                        </Grid>
                    {/* </Paper> */}

                    {/* <Paper sx={{ p: 2 }}> */}
                        {/* <Typography variant="h5" gutterBottom>Coins</Typography> */}
                        <Grid container spacing={2}>
                            {coins.map((coin) => (
                                <Box key={coin.value} sx={{ gridColumn: 'span 1' }}>
                                    <MoneyItem 
                                        item={coin} 
                                        onClick={handleMoneyClick}
                                    />
                                </Box>
                            ))}
                        </Grid>
                    </Paper>

                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h5" gutterBottom>Selected Money</Typography>
                        <Grid container spacing={3}>
                            <Box sx={{ 
                                width: '100%', 
                                '@media (min-width: 900px)': { 
                                    width: '100%',
                                    pr: 1.5
                                }
                            }}>
                                {/* <Paper sx={{ 
                                    p: 2, 
                                    bgcolor: 'background.default',
                                    height: '100%',
                                    minHeight: '200px'
                                }}> */}
                                    {/* <Typography variant="h6" gutterBottom>Banknotes</Typography> */}
                                    <Grid container spacing={2}>
                                        {renderSelectedMoney(selectedBanknotes, true)}
                                    </Grid>
                                {/* </Paper> */}
                            </Box>
                            <Box sx={{ 
                                width: '100%', 
                                '@media (min-width: 900px)': { 
                                    width: '100%'
                                }
                            }}>
                                {/* <Paper sx={{ 
                                    p: 2, 
                                    bgcolor: 'background.default',
                                    height: '100%',
                                    minHeight: '200px'
                                }}> */}
                                    {/* <Typography variant="h6" gutterBottom>Coins</Typography> */}
                                    <Grid container spacing={2}>
                                        {renderSelectedMoney(selectedCoins, false)}
                                    </Grid>
                                {/* </Paper> */}
                            </Box>
                        </Grid>
                    </Paper>
                </Stack>
            </Box>
        </Box>
    );
};

export default Game; 