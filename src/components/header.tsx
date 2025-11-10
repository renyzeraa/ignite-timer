import { Scroll, Timer } from 'phosphor-react'
import logo from '../assets/logo.svg'
import { NavLink } from 'react-router-dom'

export function Header() {
    return (
        <header className="flex items-center justify-between ">
            <img src={logo} alt="Logo do site" />
            <nav className='flex items-center gap-2'>
                <NavLink title='Timer' to="/" className={({ isActive }) => `size-12 flex justify-center items-center text-gray-100 border-y-[3px] border-solid border-transparent hover:border-b-green-500 ${isActive ? 'text-green-500' : ''}`}>
                    <Timer size={28} />
                </NavLink>
                <NavLink title='History' to="/history" className={({ isActive }) => `size-12 flex justify-center items-center text-gray-100 border-y-[3px] border-solid border-transparent hover:border-b-green-500 ${isActive ? 'text-green-500' : ''}`}>
                    <Scroll size={28} />
                </NavLink>
            </nav>
        </header>
    )
}