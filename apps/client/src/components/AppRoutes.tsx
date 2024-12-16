import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/constants/routes.ts'
import Create from '@/pages/Create.tsx'
import List from '@/pages/List.tsx'

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={ROUTES.LIST.path}
            replace
          />
        }
      />
      <Route
        path={ROUTES.LIST.path}
        element={<List />}
      />
      <Route
        path={ROUTES.CREATE.path}
        element={<Create />}
      />
    </Routes>
  )
}
