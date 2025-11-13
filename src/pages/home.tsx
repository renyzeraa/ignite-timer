import { HandPalm, Play } from "phosphor-react"
import { NewCycleForm } from "../components/new-cycle-form"
import { CountdownUseState } from "../state/countdown"
import type { Cycle } from "../@types/global"
import { CycleUseState } from "../state/cycle"
import { newCycleFormValidatorSchema, type NewCycleFormData } from "../schemas/new-cycle-form-validator"
import { Countdown } from "../components/countdown"
import { useShallow } from "zustand/shallow"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export function Home() {
    const { setAmountSecondsPassed } = CountdownUseState(useShallow(state => ({
        setAmountSecondsPassed: state.setAmountSecondsPassed
    })))

    const { getActiveCycle, setCycles, cycles, activeCycleId, setActiveCycleId } = CycleUseState(useShallow(state => ({
        getActiveCycle: state.getActiveCycle,
        setCycles: state.setCycles,
        cycles: state.cycles,
        activeCycleId: state.activeCycleId,
        setActiveCycleId: state.setActiveCycleId
    })))
    const activeCycle = getActiveCycle()

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidatorSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })
    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle({ minutesAmount, task }: NewCycleFormData) {
        setAmountSecondsPassed(0)
        const id = String(new Date().getTime())
        const newCycle: Cycle = {
            id,
            task,
            minutesAmount,
            startDate: new Date()
        }
        setCycles([
            ...cycles,
            newCycle
        ])
        setActiveCycleId(id)
        reset()
    }

    function markCurrentCycleAsFinished() {
        setCycles(
            cycles.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, interruptedDate: new Date() }
                } else {
                    return cycle
                }
            }),
        )
        setActiveCycleId(null)
    }

    const isSubmitDisabled = !watch('task')

    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit(handleCreateNewCycle)} className="flex flex-col items-center gap-14">
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />
                {activeCycle ?
                    <button
                        type="button"
                        className="w-full border-none rounded-lg p-4 flex justify-center items-center font-bold gap-2 cursor-pointer bg-red-500 disabled:hover:bg-red-500 text-gray-100 hover:bg-red-700 transition-colors focus:border-none focus:shadow-none"
                        onClick={markCurrentCycleAsFinished}
                    >
                        <HandPalm size={24} /> Interromper
                    </button>
                    :
                    <button
                        type="submit"
                        className="w-full border-none rounded-lg p-4 flex justify-center items-center font-bold gap-2 cursor-pointer bg-green-500 disabled:hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-70 text-gray-100 hover:bg-green-700 transition-colors"
                        disabled={isSubmitDisabled}
                    >
                        <Play size={24} /> Começar
                    </button>
                }
            </form>
        </div>
    )
}