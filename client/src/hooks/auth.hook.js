import {useState, useCallback, useEffect} from 'react'

const STORAGE_AUTH_NAME = 'userAuthData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [ready, setReady] = useState(false)

  const login = useCallback((currToken, currUserId) => {
    setToken(currToken)
    setUserId(currUserId)
    localStorage.setItem(STORAGE_AUTH_NAME, JSON.stringify({
      token: currToken,
      userId: currUserId
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(STORAGE_AUTH_NAME)
  }, [])

  // useEffect асинхронный и не сразу отрабатывает
  // [Поэтому неккоректно перезагружается страница Details]
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem(STORAGE_AUTH_NAME))
    if (authData && authData.token && authData.userId) {
      login(authData.token, authData.userId)
    }
    setReady(true) // Окей, теперь модуль авторизации отработал
  }, [login])

  return { login, logout, token, userId, ready }
}
