// server/config.js
module.exports = {
  AUTH0_DOMAIN: 'inspx2.auth0.com', // e.g., kmaida.auth0.com
  AUTH0_API_AUDIENCE: 'http://localhost:8083/api/', // e.g., 'http://localhost:8083/api/'
  MONGO_URI: process.env.MONGO_URI || 'mongodb://inspx2:159358@ds257808.mlab.com:57808/db_inspx',
  NAMESPACE: 'http://myapp.com/roles'
};