let BASE_URL = ''

if (import.meta.env.PROD) {
  BASE_URL = 'http://localhost:3001'
} else {
  BASE_URL = 'http://123.207.32.32:8000'
}

export {
  BASE_URL
}
