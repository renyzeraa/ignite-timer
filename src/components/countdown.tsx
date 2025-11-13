import { differenceInSeconds } from "date-fns"
import { useEffect } from "react"
import { CountdownUseState } from "../state/countdown"
import { CycleUseState } from "../state/cycle"
import { useShallow } from "zustand/shallow"

export function Countdown() {
    const { amountSecondsPassed, setAmountSecondsPassed } = CountdownUseState(useShallow(state => ({
        setAmountSecondsPassed: state.setAmountSecondsPassed,
        amountSecondsPassed: state.amountSecondsPassed
    })))

    const { getActiveCycle, markCurrentCycleAsFinished, cycles, activeCycleId } = CycleUseState(useShallow(state => ({
        getActiveCycle: state.getActiveCycle,
        markCurrentCycleAsFinished: state.markCurrentCycleAsFinished,
        cycles: state.cycles,
        activeCycleId: state.activeCycleId,
    })))
    const activeCycle = getActiveCycle()
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    useEffect(() => {
        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    activeCycle.startDate,
                )

                if (secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFinished()
                    setAmountSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setAmountSecondsPassed(secondsDifference)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycleId, cycles, setAmountSecondsPassed, markCurrentCycleAsFinished])

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
        else {
            document.title = 'Ignite Timer'
        }
    }, [minutes, seconds, activeCycle])

    return (
        <div className="text-[10rem] leading-[8rem] text-gray-100 flex gap-4 font-roboto-mono font-bold">
            <span className="bg-gray-700 rounded-lg py-8 px-4">{minutes[0]}</span>
            <span className="bg-gray-700 rounded-lg py-8 px-4">{minutes[1]}</span>
            <span className="py-8 text-green-500 w-16 overflow-hidden flex justify-center">:</span>
            <span className="bg-gray-700 rounded-lg py-8 px-4">{seconds[0]}</span>
            <span className="bg-gray-700 rounded-lg py-8 px-4">{seconds[1]}</span>
        </div>
    )
}