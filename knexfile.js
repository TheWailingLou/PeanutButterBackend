module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql://localhost/peanutbutter_db'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
