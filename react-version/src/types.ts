export interface MoneyItem {
    value: number;
    name: string;
    image: string;
    ratio: number;
}

export interface GameState {
    targetAmount: number;
    currentAmount: number;
    selectedBanknotes: { [key: number]: MoneyItem[] };
    selectedCoins: { [key: number]: MoneyItem[] };
}

export interface RootState {
    game: GameState;
} 