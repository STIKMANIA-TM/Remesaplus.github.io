import { Refine, Authenticated } from '@refinedev/core'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import { routerBindings, NavigateToResource } from '@refinedev/react-router-v6'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import { dataProvider, liveProvider, authProvider } from './providers'
import { supabase } from './config/supabase'
import { AppLayout } from './components/layout/AppLayout'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <Refine
          routerProvider={routerBindings}
          dataProvider={dataProvider(supabase)}
          liveProvider={liveProvider(supabase)}
          authProvider={authProvider}
          resources={[{ name: 'remesas', list: '/dashboard', meta: { label: 'Inicio' } }]}
          options={{ syncWithLocation: true, disableTelemetry: true }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={
              <Authenticated fallback={<Outlet />}>
                <AppLayout>
                  <Outlet />
                </AppLayout>
              </Authenticated>
            }>
              <Route index element={<NavigateToResource />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
          <RefineKbar />
        </Refine>
      </RefineKbarProvider>
    </BrowserRouter>
  )
}

export default App