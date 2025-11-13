import { create } from 'zustand'
import type { Cycle } from '../@types/global'

interface CycleState {
    cycles: Cycle[]
    activeCycleId: string | null
    setActiveCycleId: (activeCycleId: string | null) => void
    getActiveCycle: () => Cycle | undefined
    markCurrentCycleAsFinished: VoidFunction
    markCurrentCycleAsInterrupted: VoidFunction
    createNewCycle: (task: string, minutesAmount: number) => void
}

export const CycleUseState = create<CycleState>((set, get) => ({
    cycles: [],
    activeCycleId: null,

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
    },

    markCurrentCycleAsInterrupted: () => {
        const { cycles, activeCycleId, setActiveCycleId } = get()
        set({
            cycles: cycles.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, interruptedDate: new Date() }
                } else {
                    return cycle
                }
            })
        })
        setActiveCycleId(null)
    },

    createNewCycle: (task, minutesAmount) => {
        const id = String(new Date().getTime())
        const newCycle: Cycle = {
            id,
            task,
            minutesAmount,
            startDate: new Date()
        }
        const { cycles, setActiveCycleId } = get()
        set({ cycles: [...cycles, newCycle] })
        setActiveCycleId(id)
    }
}))