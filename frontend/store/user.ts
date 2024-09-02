import { defineStore } from 'pinia'
import type { User } from '~/types/User'



export const useUserStore = defineStore('userStore', () => {
  // State
  const { login, logout } = useStrapiAuth()

  const router = useRouter()
  const user = useStrapiUser()
  const errorMessage = ref<string | null>(null) // State for storing error message


  // Actions & getters
  async function connect(id: string, pass: string) {
    await login({
      identifier: id,
      password: pass
    }).catch(e => { 
      errorMessage.value = e.error.message
      console.log(errorMessage.value)
    })
    router.push('/')
  }

  function disconnect() {
    console.log("disconnet")
    logout()
    router.push('/login')
  }

  return { 
    connect, user, errorMessage,
    disconnect,
  }
})