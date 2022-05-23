// import localM from '../common/local'
const isDev = process.env.NODE_ENV === 'development' // 判断环境 true 测试环境  false 正式环境
const DEV_BASE_URL = ''
const PRD_BASE_URL = 'https://xjccs.cn'

export default {
  BASE_URL: isDev ? DEV_BASE_URL : PRD_BASE_URL,
}