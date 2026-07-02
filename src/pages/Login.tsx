import { useState } from 'react'
import { useLogin } from '@refinedev/core'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mutate } = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10">
      <h2 className="text-2xl text-[#00FF00] font-bold mb-4">Accede a Remesa+</h2>
      <input 
        className="input-field" 
        type="email" 
        placeholder="Correo o Teléfono" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />
      <input 
        className="input-field" 
        type="password" 
        placeholder="Contraseña" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />
      <button type="submit" className="btn-primary mt-2">Entrar</button>
    </form>
  )
}