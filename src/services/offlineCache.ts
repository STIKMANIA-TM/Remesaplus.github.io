import { openDB, IDBPDatabase } from 'idb'

let db: IDBPDatabase | null = null

export async function initDB() {
  if (db) return db
  db = await openDB('remesa-db', 1, {
    upgrade(db) {
      db.createObjectStore('tasas', { keyPath: 'id' })
      db.createObjectStore('historial', { keyPath: 'id' })
    }
  })
  return db
}

export async function cacheTasas(tasas: any[]) {
  const database = await initDB()
  const tx = database.transaction('tasas', 'readwrite')
  await Promise.all(tasas.map(t => tx.store.put(t)))
  await tx.done
}

export async function getCachedTasas() {
  const database = await initDB()
  return database.getAll('tasas')
}