import { NavLink } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { cn } from '@/lib/utils'

export function Navigation() {
  const baseStyles = 'px-4 py-2 transition-colors duration-200 hover:text-primary/80'
  const activeStyles = 'font-bold text-primary'

  return (
    <nav className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex h-16 items-center px-4">
        <NavLink
          to={ROUTES.LIST.path}
          className={({ isActive }) => cn(baseStyles, isActive && activeStyles)}
        >
          {ROUTES.LIST.text}
        </NavLink>
        <NavLink
          to={ROUTES.CREATE.path}
          className={({ isActive }) => cn(baseStyles, isActive && activeStyles)}
        >
          {ROUTES.CREATE.text}
        </NavLink>
      </div>
    </nav>
  )
}
