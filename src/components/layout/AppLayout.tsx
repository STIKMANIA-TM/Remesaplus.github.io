import { ReactNode } from 'react'
import { useDataSaver } from '../../context/DataSaverContext'

export function AppLayout({ children }: { children: ReactNode }) {
  const { enabled, toggle } = useDataSaver()

  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-md mx-auto">
      <header className="flex justify-between items-center mb-6 border-b border-[#006600] pb-2">
        <h1 className="text-xl font-bold text-[#00FF00]">Remesa+</h1>
        <button 
          onClick={toggle}
          className="text-xs px-3 py-1 border border-[#006600] rounded hover:bg-[#003300]"
          aria-label={enabled ? "Modo normal" : "Ahorro de datos"}
        >
          {enabled ? '📶 Datos: ON' : '📡 Ahorro'}
        </button>
      </header>
      <main>{children}</main>
      <footer className="mt-8 text-center text-gray-500 text-xs">
        © 2024 STIKMANIA • Offline-Ready
      </footer>
    </div>
  )
}