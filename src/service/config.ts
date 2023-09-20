let BASE_URL = ''

if (import.meta.env.PROD) {
  BASE_URL = 'http://47.97.159.103:3334/api'
} else {
  BASE_URL = 'http://codercba.com:5000'
}

export {
  BASE_URL
}
