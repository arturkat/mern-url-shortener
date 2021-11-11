import React, {useEffect, useState, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
  const authContext = useContext(AuthContext)
  const message = useMessage()
  const {request, loading, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    console.log('useEffect []')
    window.M.updateTextFields();
  }, [])

  const changeHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      if (data && data.token && data.userId) {
        authContext.login(data.token, data.userId)
      }
      message(data.message)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s12">
        <h1 className="center-align">Сократи Ссылку</h1>
      </div>
      <div className="col s6 offset-s3">
        <div className="card">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>

              <div className="input-field">
                <input 
                  name="email"
                  placeholder="Введите email" 
                  id="email" 
                  type="text" 
                  className="yellow-input" 
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input 
                  name="password"
                  placeholder="Введите пароль" 
                  id="password" 
                  type="password" 
                  className="yellow-input" 
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Пароль</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className="btn teal lighten-1"
              onClick={loginHandler}
              disabled={loading}
            >
              Войти
            </button>
            &nbsp;
            <button
              className="btn blue lighten-1"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
