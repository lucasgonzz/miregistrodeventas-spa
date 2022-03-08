<template>
	<b-col
	class="col-bar-code margin-bottom-since-lg d-none d-lg-flex"
	cols="12"
	lg="5">
		<b-form-input
		id="article-bar-code"
		v-model="article.bar_code"
		autocomplete="off" 
		ref="articleBarCode"
		@keydown.shift="callVender"
		@keydown.enter="setArticleForSale"
		placeholder="Ingrese el codigo de barras"></b-form-input>
	</b-col>
</template>
<script>
import vender from '@/mixins/vender'
export default {
	mixins: [vender],
	computed: {
		article() {
			return this.$store.state.vender.article
		},
	},
}
</script>
<style scoped lang="sass">
.col-bar-code 
	display: flex
	align-items: center
</style>