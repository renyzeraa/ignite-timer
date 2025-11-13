import { useShallow } from "zustand/shallow"
import { CycleUseState } from "../state/cycle"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useEffect } from "react"

export function History() {
    const { cycles } = CycleUseState(useShallow(state => ({
        cycles: state.cycles,
    })))

    const statusColors = {
        finished: 'green',
        interrupted: 'red',
        inProgress: 'yellow',
    }

    const statusTexts = {
        finished: 'Concluído',
        interrupted: 'Interrompido',
        inProgress: 'Em andamento',
    }

    useEffect(() => {
        const cyclesJson = localStorage.getItem('@ignite-timer:cycles-state') || '[]'
        CycleUseState.setState({ cycles: JSON.parse(cyclesJson) })
    }, [])

    return (
        <main className="flex-1 p-14 flex flex-col">
            <h1 className="text-2xl text-gray-100 font-bold">Meu histórico</h1>

            <div className="flex-1 overflow-auto mt-8">
                <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                        <tr className="text-sm leading-relaxed text-left text-gray-100">
                            <th className="bg-gray-600 p-4 rounded-tl-lg pl-6">Tarefa</th>
                            <th className="bg-gray-600 p-4">Duração</th>
                            <th className="bg-gray-600 p-4">Início</th>
                            <th className="bg-gray-600 p-4 rounded-tr-lg pr-6">Status</th>
                        </tr>
                    </thead>
                    <tbody className="[&>tr>td]:bg-gray-700 [&>tr>td]:border-t-4 [&>tr>td]:border-solid [&>tr>td]:border-gray-800 [&>tr>td]:p-4 [&>tr>td]:text-sm [&>tr>td]:leading-relaxed">
                        {cycles.map(({ id, minutesAmount, startDate, task, finishedDate, interruptedDate }) => {
                            const status = interruptedDate ? 'interrupted' : finishedDate ? 'finished' : 'inProgress'
                            const startRelative = formatDistanceToNow(new Date(startDate), { addSuffix: true, locale: ptBR })

                            return (
                                <tr key={id}>
                                    <td className="!pl-6 w-1/2">{task}</td>
                                    <td>{minutesAmount} minutos</td>
                                    <td>{startRelative}</td>
                                    <td className="!pr-6">
                                        <span className={`flex items-center gap-2 before:content-[''] before:size-2 before:rounded-full before:bg-${statusColors[status]}-500`}>{statusTexts[status]}</span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </main>
    )
}