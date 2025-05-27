import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, MoneyItem } from '../types';

const initialState: GameState = {
    targetAmount: Math.floor(Math.random() * 500) + 1,
    currentAmount: 0,
    selectedBanknotes: {},
    selectedCoins: {}
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        addMoney: (state, action: PayloadAction<MoneyItem>) => {
            const { value } = action.payload;
            state.currentAmount += value;
            
            if (value >= 500) {
                if (!state.selectedBanknotes[value]) {
                    state.selectedBanknotes[value] = [];
                }
                state.selectedBanknotes[value].push(action.payload);
            } else {
                if (!state.selectedCoins[value]) {
                    state.selectedCoins[value] = [];
                }
                state.selectedCoins[value].push(action.payload);
            }
        },
        resetGame: (state) => {
            state.currentAmount = 0;
            state.targetAmount = Math.floor(Math.random() * 500) + 1;
            state.selectedBanknotes = {};
            state.selectedCoins = {};
        }
    }
});

export const { addMoney, resetGame } = gameSlice.actions;
export default gameSlice.reducer; 