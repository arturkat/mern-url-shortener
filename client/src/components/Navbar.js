import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
  const history = useHistory()
  const authContext = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    authContext.logout()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper teal lighten-1">
        <span style={{padding: '0 1rem'}}>Сократи Ссылку</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Создать</NavLink></li>
          <li><NavLink to="/links">Ссылки</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}
