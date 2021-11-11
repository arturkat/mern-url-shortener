const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  // Это специальный метод в REST API проверяющий доступность сервера
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {

    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    
    console.log('token: ', token)

    if (!token) {
      console.log('!token: ', !token)
      return res.status(401).json({ message: 'Нет авторизации' }) 
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded
    next()

  } catch (e) {
    // console.log('-->> Error catched : ', e)
    // console.log('-->> Error catched : ', e.message)
    console.log('-->> Error catch : ', e.toString())
    res.status(401).json({ message: `Нет авторизации ${e.message}` }) 
  }
}
