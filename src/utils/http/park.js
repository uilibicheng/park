import $http from './request'

export default {
  getParkInfo(opts) {
    opts.url = `/app/order/write`
    $http.post(opts)
  },
  getOrderInfo(opts) {
    opts.url = `/app/order/notify`
    $http.post(opts)
  }
}