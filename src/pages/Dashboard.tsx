import { useList } from '@refinedev/core'
import { useDataSaver } from '../context/DataSaverContext'
import { getCachedTasas } from '../services/offlineCache'
import { useEffect, useState } from 'react'

export function Dashboard() {
  const { enabled } = useDataSaver()
  const [tasas, setTasas] = useState<any[]>([])
  const { data, isLoading } = useList({ resource: 'tasas_historico', pagination: { mode: 'off' } })

  useEffect(() => {
    // Fallback offline-first
    if (enabled || !navigator.onLine) {
      getCachedTasas().then(setTasas)
    } else if (data?.data) {
      setTasas(data.data.slice(0, 5)) // Últimas 5 tasas
    }
  }, [data, enabled])

  if (isLoading && !enabled) return <p className="text-center mt-10 text-gray-400">Cargando tasas...</p>

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-[#00FF00]">Tasas Recientes (USD/CUP)</h2>
      <div className="bg-[#003300] rounded-lg p-3 space-y-2">
        {tasas.length === 0 && <p className="text-gray-400">Sin datos. Conéctate o revisa tu caché.</p>}
        {tasas.map((t) => (
          <div key={t.id} className="flex justify-between border-b border-[#006600] pb-2 last:border-0">
            <span>{t.canal_nombre || 'Oficial'}</span>
            <span className="font-mono">{t.tasa_oficial.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <button className="btn-primary w-full mt-4">Rastrear Remesa</button>
    </div>
  )
}