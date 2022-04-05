// import localM from '../common/local'
const isDev = process.env.NODE_ENV === 'development' // 判断环境 true 测试环境  false 正式环境
const DEV_BASE_URL = 'http://47.108.236.5:7003'
const PRD_BASE_URL = 'http://47.108.236.5:7003'

export default {
  BASE_URL: isDev ? DEV_BASE_URL : PRD_BASE_URL,
}