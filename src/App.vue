<script>

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
	.filter {
		filter: blur(5px)
	}
	.content {
    padding-bottom: 100rpx;
  }
</style>
