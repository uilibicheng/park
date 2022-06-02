<script>
import common from '@/utils/common'
import localM from "@/utils/common/local";

export default {
	onLaunch: function(options) {
	},
	onLoad: function(options) {
		console.log('App onLoad', options)
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style>
	/*每个页面公共css */
	body {
		width: 100%;
	}
	body uni-page-body {
		height: 100%;
		background: #fff;
	}
	.page {
		background: #dbe2ef;
		width: 100%;
		min-height: 100%;
	}
	.filter {
		filter: blur(5px)
	}
	.content {
    padding-bottom: 100rpx;
  }
</style>
