<template>
<b-modal id="select-variant" title="Seleccionar modelo" size="lg" hide-footer>
	<div class="cont-cards">
		<b-card
		@click="selectVariant(variant)"
		class="card-article-variant c-p border-radius shadow-2"
		no-body
		v-for="variant in article.variants"
		:key="variant.id">
			<img :src="imageCropedUrlfromImage(variant)">
			<p class="name">
				{{ article.name }} {{ variant.description }}
 			</p>
		</b-card>
	</div>
</b-modal>
</template>
<script>
export default {
	computed: {
		article() {
			return this.$store.state.vender.article_variant
		}, 
	},
	methods: {
		selectVariant(variant) {
			this.article.selected_variant_id = variant.id
			this.$bvModal.hide('select-variant')
			this.$store.commit('vender/addArticle')
			this.$store.commit('vender/setTotal')
		}
	}
}
</script>
<style scoped lang="sass">
.name 
	padding: 1em
</style>