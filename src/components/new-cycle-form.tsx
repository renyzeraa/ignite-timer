import { useFormContext } from "react-hook-form"
import { CycleUseState } from "../state/cycle"
import { useShallow } from "zustand/shallow"

export function NewCycleForm() {
    const { getActiveCycle } = CycleUseState(useShallow(state => ({
        getActiveCycle: state.getActiveCycle,
    })))
    const activeCycle = getActiveCycle()

    const { register } = useFormContext()

    return (
        <div className="w-full flex items-center justify-center gap-2 text-gray-100 text-lg font-bold flex-wrap">
            <label htmlFor="task">Vou trabalhar em</label>
            <input
                type="text"
                list="task-suggestions"
                id="task"
                placeholder="Dê um nome ao seu projeto"
                className="bg-transparent h-10 border-b-2 border-solid border-b-gray-500 font-bold text-lg text-gray-100 px-2 flex-1 placeholder:text-gray-500 focus:shadow-none focus:border-b-green-500 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={!!activeCycle}
                {...register('task')}
            />

            <datalist id="task-suggestions">
                <option value="Projeto 1"></option>
                <option value="Projeto 2"></option>
                <option value="Projeto 3"></option>
                <option value="Batata"></option>
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <input
                type="number"
                min={1}
                max={60}
                step={5}
                id="minutesAmount"
                placeholder="00"
                className="bg-transparent h-10 border-b-2 border-solid border-b-gray-500 font-bold text-lg text-gray-100 px-2 w-16 placeholder:text-gray-500 focus:shadow-none focus:border-b-green-500 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true, max: 60, min: 1 })}
            />

            <span>minutos.</span>
        </div>
    )
}