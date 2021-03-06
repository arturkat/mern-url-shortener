import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {useMessage} from '../hooks/message.hook'

export const CreatePage = () => {
  const message = useMessage()
  const history = useHistory()
  const authContext = useContext(AuthContext)
  const {request} = useHttp()
  const [link, setLink] = useState('')

  useEffect(() => {
    if (window.M) {
      window.M.updateTextFields()
    }
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${authContext.token}`
        })
        message('Ссылка успешно создана')
        history.push(`/detail/${data.link._id}`)
      } catch (e) {
        message(e)
      }
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  )
}