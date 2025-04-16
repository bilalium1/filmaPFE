
import filmalogo from '../assets/filma.png'
import { useNavigate } from 'react-router-dom'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useState } from 'react'

function NavBar({medias}){

    const navigate = useNavigate()

    const buttoncss="px-4 mx-1 my-auto h-4/5 rounded-md text-stone-100 font-light tracking-wider hover:text-stone-950 transition-all b ease-out hover:px-6 hover:text-lg hover:backdrop-brightness-400 hover:font-black cursor-pointer"
    return (
        <div className="fixed top-5 my-auto z-2 flex w-19/20 h-12 left-1/2 transform -translate-x-1/2 rounded-xl bg-stone-950/50 backdrop-blur-sm border-[2px] border-stone-100/0 hover:border-stone-100/100 transition-all">
            <p onClick={() => navigate('/')} className="px-5 mx-1 my-auto h-4/5 rounded-md text-stone-100 font-extrabold tracking-wider text-3xl hover:rotate-x-10 transition-all cursor-pointer hover:font-extralight"> FIL.MA </p>
            <button onClick={() => navigate('/about')} className={`${buttoncss}`}>✦︎ About</button>
            <button className={`${buttoncss}`}>➥ Films</button>
            <button className={`${buttoncss}`}>➥ Dicouvrir</button>
            <button className={`${buttoncss}`}>➥ Genres</button>

            <Menu as="div" className="relative inline-block text-left mt-1 h-12">
                      <MenuButton className={`my-auto m-0 ${buttoncss}`}>
                        Medias ▼
                      </MenuButton>
            
                      <MenuItems className="absolute mt-4 w-56 origin-top-left backdrop-blur-sm border-t-2 rounded-md bg-stone-800/50 shadow-lg z-10">
                        <div className="py-1">
                          {['About ➥', 'Series ➥', 'Films ➥', 'Hello'].map((label, idx) => (
                            <MenuItem key={idx}>
                              {({ active }) => (
                                <a
                                  href={`/about`}
                                  className={`block px-4 py-2 m-2 rounded-sm text-sm transition-all ${
                                    active ? 'bg-stone-200/80 text-stone-800 px-10' : 'text-white'
                                  }`}
                                >
                                  {label}
                                </a>
                              )}
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
              </Menu>

            <button className={`absolute right-1 top-1 ${buttoncss}`}>❯❯ Se Connecter</button>
        </div>
    )
}

export default NavBar