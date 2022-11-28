<template>
<b-modal
hide-footer
size="lg"
title="Articulos sin stock"
id="articles-stock-0">
	<display
	model_name="article"
	:models="articles_stock_0">
		<template v-slot:buttons="props">
			<buttons :model="props.model"></buttons>
		</template>
	</display>
</b-modal>
</template>
<script>
import Display from '@/components/common/display/Index'
import Buttons from '@/components/listado/components/list/Buttons'
export default {
	components: {
		Display,
		Buttons,
	},
	computed: {
		articles() {
			return this.$store.state.article.models
		},
		articles_stock_0() {
			return this.articles.filter(article => {
				return article.stock <= 0 
			})
		}
	}
}
</script>