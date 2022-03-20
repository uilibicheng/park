import $http from './request'

export default {
  login(opts) {
    opts.url = `/login`
    $http.post(opts)
  },

  getCoachInfo(opts) {
    opts.url = `/video/resumeinfo/info`
    $http.post(opts)
  },

  getCoursePay(opts) {
    opts.url = `/video/pay/coursePay`
    $http.post(opts)
  },

  getUserReport(opts) {
    opts.url = `/video/userInfo/report`
    $http.post(opts)
  },

  getMiniPhotoPath(opts) {
    opts.url = `/video/appSkip/toPhotoApp`
    $http.post(opts)
  },
}