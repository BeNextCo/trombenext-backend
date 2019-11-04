const axios = require('axios')

const checkAuth = async (req, res)=> {
  const requestToken = req.headers['authorization'].split(' ')[1]
  const token = requestToken ? requestToken.split(' ')[1] : res.status(403).send('No token provided')
  const googleAuthUrl = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
  const googleResponse = await axios.get(googleAuthUrl)
  const isDomainAuthorized = googleResponse.data.hd === 'benextcompany.com'
  console.log(googleResponse.data.hd, isDomainAuthorized)
  isDomainAuthorized 
    ? res.status(200).send('Authorized')
    : res.status(403).send('Unauthorized')
}

module.exports = checkAuth