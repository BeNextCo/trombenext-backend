const axios = require('axios')

const authenticate = async (req, res, next)=> {
  try {
    await checkAuth(req)
    next()
  } catch (error) {
    console.log(error);
    res.status(403).send('Unauthorized')
  }
}
const checkAuth = async (req)=> {
  if (req.headers['authorization'] === undefined) throw 'authorization header is missing'
  
  const [,requestToken] = req.headers['authorization'].split(' ')

  if (requestToken === undefined) throw 'token not found'

  const tokenInfo = await retrieveTokenInfo(requestToken)

  if (tokenInfo === null) throw 'google token has expired'
  
  if (!isEmailValid(tokenInfo.email)) throw "user email doesn't belong to benext"
}

const retrieveTokenInfo = async token => {
  const googleAuthUrl = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
  let tokenInfo = null;
  try {
    const response = await axios.get(googleAuthUrl)
    const {name, email} = response.data
    tokenInfo = {
      name,
      email,
    }
      
    } catch (error) {
      tokenInfo = null  
    }

    return tokenInfo
}

const isEmailValid = email => /@benextcompany\.com$/.test(email)

module.exports = {
  authenticate,
  retrieveTokenInfo
}