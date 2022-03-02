import VueScreenSize from 'vue-screen-size'
export default {
	mixins: [VueScreenSize.VueScreenSizeMixin],
	computed: {
		width() {
			if (this.$vssWidth < '576') {
				return '300'
			}
			if (this.$vssWidth > '576' && this.$vssWidth < '768') {
				return '576'
			}
			if (this.$vssWidth > '768' && this.$vssWidth < '992') {
				return '768'
			}
			if (this.$vssWidth > '992') {
				return '992'
			}
		},
		height() {
			if (this.$vssWidth < '576') {
				return '181'
			}
			if (this.$vssWidth > '576' && this.$vssWidth < '768') {
				return '315'
			}
			if (this.$vssWidth > '768' && this.$vssWidth < '992') {
				return '420'
			}
			if (this.$vssWidth > '992') {
				return '542'
			}
		},
	}
}