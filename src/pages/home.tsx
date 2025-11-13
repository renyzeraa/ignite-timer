import { Play } from "phosphor-react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from "zod"
import { useEffect, useState } from "react"
import { differenceInSeconds } from "date-fns"

const newCycleFormValidatorSchema = z.object({
    task: z.string().min(1, 'Informe a tarefa'),
    minutesAmount: z.number().min(5, 'O ciclo precisa ser no mínimo 5 minutos.').max(60, 'O ciclo precisa ser no máximo 60 minutos.')
})

type NewCycleFormData = z.infer<typeof newCycleFormValidatorSchema>

interface Cycle extends NewCycleFormData {
    id: string
    startDate: Date
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { register, handleSubmit, watch, reset } = useForm({
        resolver: zodResolver(newCycleFormValidatorSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    useEffect(() => {
        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {
                setAmountSecondsPassed(
                    differenceInSeconds(new Date(), activeCycle.startDate),
                )
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle])

    function handleCreateNewCycle({ minutesAmount, task }: NewCycleFormData) {
        setAmountSecondsPassed(0)
        const id = String(new Date().getTime())
        const newCycle = {
            id,
            task,
            minutesAmount,
            startDate: new Date()
        }
        setCycles((state) => [
            ...state,
            newCycle
        ])
        setActiveCycleId(id)
        reset()
    }


    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

    const isSubmitDisabled = !watch('task')

    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit(handleCreateNewCycle)} className="flex flex-col items-center gap-14">
                <div className="w-full flex items-center justify-center gap-2 text-gray-100 text-lg font-bold flex-wrap">
                    <label htmlFor="task">Vou trabalhar em</label>
                    <input
                        type="text"
                        list="task-suggestions"
                        id="task"
                        placeholder="Dê um nome ao seu projeto"
                        className="bg-transparent h-10 border-b-2 border-solid border-b-gray-500 font-bold text-lg text-gray-100 px-2 flex-1 placeholder:text-gray-500 focus:shadow-none focus:border-b-green-500"
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
                        min={5}
                        max={60}
                        step={5}
                        id="minutesAmount"
                        placeholder="00"
                        className="bg-transparent h-10 border-b-2 border-solid border-b-gray-500 font-bold text-lg text-gray-100 px-2 w-16 placeholder:text-gray-500 focus:shadow-none focus:border-b-green-500"
                        {...register('minutesAmount', { valueAsNumber: true, max: 60, min: 5 })}
                    />

                    <span>minutos.</span>
                </div>
                <div className="text-[10rem] leading-[8rem] text-gray-100 flex gap-4 font-roboto-mono font-bold">
                    <span className="bg-gray-700 rounded-lg py-8 px-4">{minutes[0]}</span>
                    <span className="bg-gray-700 rounded-lg py-8 px-4">{minutes[1]}</span>
                    <span className="py-8 text-green-500 w-16 overflow-hidden flex justify-center">:</span>
                    <span className="bg-gray-700 rounded-lg py-8 px-4">{seconds[0]}</span>
                    <span className="bg-gray-700 rounded-lg py-8 px-4">{seconds[1]}</span>
                </div>

                <button
                    type="submit"
                    className="w-full border-none rounded-lg p-4 flex justify-center items-center font-bold gap-2 cursor-pointer bg-green-500 disabled:hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-70 text-gray-100 hover:bg-green-700 transition-colors"
                    disabled={isSubmitDisabled}
                >
                    <Play size={24} /> Começar
                </button>
            </form>
        </div>
    )
}