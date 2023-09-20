let BASE_URL = ''

if (import.meta.env.PROD) {
  BASE_URL = 'http://47.97.159.103:6666'
} else {
  BASE_URL = 'http://codercba.com:5000'
}

export {
  BASE_URL
}
