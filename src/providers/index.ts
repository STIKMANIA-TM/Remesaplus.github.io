import { AuthBindings } from '@refinedev/core'
import dataProvider from '@refinedev/supabase'
import liveProvider from '@refinedev/supabase'
import { supabase } from '../config/supabase'

export { dataProvider, liveProvider }

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: password || '' })
    return error ? { success: false, error } : { success: true, redirectTo: '/' }
  },
  logout: async () => {
    await supabase.auth.signOut()
    return { success: true, redirectTo: '/login' }
  },
  check: async () => {
    const { data } = await supabase.auth.getUser()
    return data?.user ? { authenticated: true } : { authenticated: false, redirectTo: '/login' }
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const { data } = await supabase.auth.getUser()
    return data?.user ? { name: data.user.email || 'Usuario', ...data.user } : null
  }
}