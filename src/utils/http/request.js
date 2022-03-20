import toast from '../common/toast'
import localM from '../common/local' // 存取缓存
import common from '../common'
import constants, {LOCAL_KEY} from '@/config/constants' //常量
const errorMessage = '服务繁忙，稍后再试'
const baseUrl = constants.BASE_URL

class SuperClass {
  constructor() {
    Object.assign(this, {})
  }

  _rq(opts = paramNoNull(), token) {
    uni.showLoading({
      title: '加载中...',
      mask: true
    })
    const data = Object.assign(opts.data || {}),
    _token = localM.get(LOCAL_KEY.TOKEN) || '',
    userInfo = localM.get(LOCAL_KEY.USER)

    if (!opts.hideLoading) {
      uni.showNavigationBarLoading()
    }

    return new Promise(function(resolve, reject) {
      opts.header = {
        // "Content-Type": "application/json;charset=utf-8",
        "token": _token,
      }

      if (userInfo && userInfo.id) {
        data.userId = userInfo.id
      }
      const url = String(opts.url).includes('http') ? opts.url : baseUrl + opts.url
      uni.request({
        url,
        data: data,
        header: opts.header,
        method: opts.method || 'GET',
        dataType: 'json',
        responseType: 'text',
        success: res => {
          const {data} = res
          if (data.code == 200) { // 成功
            resolve(data)
          } else if (data.status === 501) { // token 失效或未登录
            // localM.remove(LOCAL_KEY.TOKEN)
            // localM.remove(LOCAL_KEY.USER)
            // 获取当前页面栈，登录后进行跳转
            // let pages = getCurrentPages()
            // let currentPage = pages[pages.length - 1]
            // if (currentPage) {
            //   let navigateUrl = '/' + currentPage.route
            //   let params = Object.keys(currentPage.options) || []
            //   if (params.length) {
            //     params.forEach((key, index) => {
            //       navigateUrl = `${navigateUrl}${index === 0 ? '?' : '&'}${key}=${currentPage.options[key]}`
            //     })
            //   }
            //   let url = '/pages/login/login'
            //   if (navigateUrl) {
            //     url = `${url}?url=${encodeURIComponent(JSON.stringify(navigateUrl))}`
            //   }
            //   setTimeout(() => {
            //     uni.redirectTo({
            //       url,
            //     })
            //   }, 1000);
            // }
            common.toManage("/pages/login/login")
          } else { //其他不可预测为失败
            reject(data)
          }
        },
        fail: res => {
          reject(res.data)
          toast(res.data && res.data.message || errorMessage)
        },
        complete: res => {
          uni.hideLoading()
          uni.stopPullDownRefresh()
          !opts.hideLoading && uni.hideNavigationBarLoading() //完成停止加载 
          opts.complete && opts.complete(res.data)
        }
      });
    })
  }

  paramNoNull() { //为空参数抛异常
    throw new Error('Missing parameter')
  }
}

const decorator = Sup => class extends Sup { // 超类，实现多继承
  constructor(...args) {
    super(...args)
  }

  async _h(opts, token) {
    const sendFun = opts => {
      return super._rq(opts, token).catch(res => { //转化http请求 catch捕获promise的reject
        toast((res && res.message) || errorMessage) //统一提示，若有其他提示，会执行覆盖
        opts.fail && opts.fail(res)
      })
    }

    const cb = await sendFun(opts)
    if (!!cb) {
      (cb.code === 200) && opts.success && opts.success(cb.data || cb.result)
    }
  }

  post(opts, token = true) {
    this._h(opts, token)
  }
}

class Http extends decorator(SuperClass) {
  constructor() {
    super()
  }
}

export default new Http