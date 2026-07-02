import { create } from 'zustand'

interface DataSaverState {
  enabled: boolean
  toggle: () => void
}

export const useDataSaver = create<DataSaverState>((set) => ({
  enabled: localStorage.getItem('dataSaver') === 'true',
  toggle: () => set((state) => {
    const next = !state.enabled
    localStorage.setItem('dataSaver', String(next))
    document.body.setAttribute('data-saver', String(next))
    return { enabled: next }
  })
}))