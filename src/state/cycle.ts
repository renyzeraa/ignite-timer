import { create } from 'zustand'
import type { Cycle } from '../@types/global'

interface CycleState {
    cycles: Cycle[]
    setCycles: (cycles: Cycle[]) => void
    activeCycleId: string | null
    setActiveCycleId: (activeCycleId: string | null) => void
    getActiveCycle: () => Cycle | undefined
    markCurrentCycleAsFinished: VoidFunction
}

export const CycleUseState = create<CycleState>((set, get) => ({
    cycles: [],
    activeCycleId: null,
    setCycles: (cycles) => {
        set({ cycles })
    },
    setActiveCycleId: (activeCycleId) => {
        set({ activeCycleId })
    },
    getActiveCycle: () => get()?.cycles.find(cycle => cycle.id === get().activeCycleId),
    markCurrentCycleAsFinished: () => {
        const { cycles, activeCycleId, setActiveCycleId } = get()
        set({
            cycles: cycles.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, finishedDate: new Date() }
                } else {
                    return cycle
                }
            })
        })
        setActiveCycleId(null)
    }
}))