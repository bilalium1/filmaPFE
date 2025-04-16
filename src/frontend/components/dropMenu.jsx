
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

function DropMenu({ title, elements = {}, css = "" }) {
    return (
      <Menu as="div" className="relative inline-block text-left mt-1 h-12">
        <MenuButton className={`my-auto m-0 ${css}`}>
          {title} ▼
        </MenuButton>
        <MenuItems className="absolute mt-4 w-56 origin-top-left backdrop-blur-sm border-t-2 rounded-md bg-stone-800/50 shadow-lg z-10">
          <div className="py-1">
            {Object.entries(elements).map(([name, path]) => (
              <MenuItem key={name}>
                {({ active }) => (
                  <a
                    href={path}
                    className={`block px-4 py-2 m-2 rounded-sm text-sm transition-all ${
                      active ? 'bg-stone-200/80 text-stone-800 px-10' : 'text-white'
                    }`}
                  >
                    {name}
                  </a>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    );
  }

export default DropMenu;