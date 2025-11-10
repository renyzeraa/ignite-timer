import { Play } from "phosphor-react";

export function Home() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <form action="" className="flex flex-col items-center gap-14">
                <div className="w-full flex items-center justify-center gap-2 text-gray-100 text-lg font-bold flex-wrap">
                    <label htmlFor="task">Vou trabalhar em</label>
                    <input type="text" list="task-suggestions" id="task" placeholder="Dê um nome ao seu projeto" className="bg-transparent h-10 border-b-2 border-solid border-b-gray-500 font-bold text-lg text-gray-100 px-2 flex-1 placeholder:text-gray-500 focus:shadow-none focus:border-b-green-500" />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1"></option>
                        <option value="Projeto 2"></option>
                        <option value="Projeto 3"></option>
                        <option value="Batata"></option>
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <input type="number" min={5} max={60} step={5} id="minutesAmount" placeholder="00" className="bg-transparent h-10 border-b-2 border-solid border-b-gray-500 font-bold text-lg text-gray-100 px-2 w-16 placeholder:text-gray-500 focus:shadow-none focus:border-b-green-500" />

                    <span>minutos.</span>
                </div>
                <div className="text-[10rem] leading-[8rem] text-gray-100 flex gap-4 font-roboto-mono font-bold">
                    <span className="bg-gray-700 rounded-lg py-8 px-4">0</span>
                    <span className="bg-gray-700 rounded-lg py-8 px-4">0</span>
                    <span className="py-8 text-green-500 w-16 overflow-hidden flex justify-center">:</span>
                    <span className="bg-gray-700 rounded-lg py-8 px-4">0</span>
                    <span className="bg-gray-700 rounded-lg py-8 px-4">0</span>
                </div>

                <button type="submit" className="w-full border-none rounded-lg p-4 flex justify-center items-center font-bold gap-2 cursor-pointer bg-green-500 disabled:hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-70 text-gray-100 hover:bg-green-700 transition-colors"><Play size={24} /> Começar</button>
            </form>
        </div>
    )
}