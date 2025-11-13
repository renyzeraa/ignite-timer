import { create } from 'zustand'

interface CountdownState {
    amountSecondsPassed: number
    setAmountSecondsPassed: (seconds: number) => void
}

export const CountdownUseState = create<CountdownState>((set) => ({
    amountSecondsPassed: 0,
    setAmountSecondsPassed: (amountSecondsPassed) => {
        set({ amountSecondsPassed })
    }
}))