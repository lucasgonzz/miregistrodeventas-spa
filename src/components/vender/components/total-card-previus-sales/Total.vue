<template>
	<b-col
	cols="12"
	lg="3"
	class="col-total">
		<p class="m-0">
			<strong class="total">
				Total: {{ price(total) }}
			</strong>
		</p>
		<p class="m-0">
			{{ articles.length }} artículos, {{ cantidad_unidades }} unidades
		</p>
	</b-col>
</template>
<script>
export default {
	computed: {
		total() {
			return this.$store.state.vender.total
		},
		articles() {
			return this.$store.state.vender.articles
		},
		cantidad_unidades() {
			let cant = 0
			this.articles.forEach(article => {
				cant += Number(article.amount)
			})
			return cant
		},
	}
}
</script>
<style lang="sass">
.col-total
	display: flex
	flex-direction: column
	align-items: flex-start
	justify-content: flex-start
	.total 
		font-size: 1.5rem
	@media screen and (min-width: 768px)
		p 
			text-align: left
</style>