export function History() {
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
                        <tr>
                            <td className="!pl-6 w-1/2">Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há 2 meses</td>
                            <td className="!pr-6"><span className="flex items-center gap-2 before:content-[''] before:size-2 before:rounded-full before:bg-green-500">Concluído</span></td>
                        </tr>
                        <tr>
                            <td className="!pl-6 w-1/2">Atividade</td>
                            <td>30 minutos</td>
                            <td>Há 2,5 meses</td>
                            <td className="!pr-6"><span className="flex items-center gap-2 before:content-[''] before:size-2 before:rounded-full before:bg-red-500">Interrompido</span></td>
                        </tr>
                        <tr>
                            <td className="!pl-6 w-1/2">História</td>
                            <td>25 minutos</td>
                            <td>Há 20 minutos</td>
                            <td className="!pr-6"><span className="flex items-center gap-2 before:content-[''] before:size-2 before:rounded-full before:bg-yellow-500">Em andamento</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    )
}