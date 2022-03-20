// import localM from '../common/local'
const isDev = process.env.NODE_ENV === 'development' // 判断环境 true 测试环境  false 正式环境
const DEV_BASE_URL = 'http://120.79.216.249:8081'
const PRD_BASE_URL = 'https://video-api.fxpjiakao.com'
const DEV_ROOT_URL = 'https://photo.h5.fxpjiakao.com'
const PRD_ROOT_URL = 'https://photo.h5.fxpjiakao.com'

export default {
  BASE_URL: isDev ? DEV_BASE_URL : PRD_BASE_URL,
  ROOT_URL: isDev ? DEV_ROOT_URL : PRD_ROOT_URL,
}