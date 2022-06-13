<template>
	<b-col 
	v-if="can('articles.stock')"
	md="6">
		<b-form-group
		label="Cantidad">
			<b-form-input
			type="number"
			min="0"
			@keydown.enter="changeToCategory"
			placeholder="Ingresa la cantidad del producto"
			v-model="article.stock"
			autocomplete="off"></b-form-input>
		</b-form-group>
		<div
		v-if="show_checkboxs && article.stock">
			<b-form-group
			label="Cantidad para agregar">
				<b-form-input
				placeholder="Cantidad para sumar al stock"
				min="0"
				type="number"
				v-model="article.new_stock"></b-form-input>
			</b-form-group>
			<b-form-group>
				<b-form-checkbox
				v-model="article.stock_null"
				id="article-stock-null">
					Dejar de controlar stock
				</b-form-checkbox>
			</b-form-group>
		</div>
	</b-col>
</template>
<script>
export default {
	name: 'Stock',
	props: ['article', 'show_checkboxs'],
	methods: {
		changeToCategory() {
			document.getElementById('article-category').focus()
		},
	},
}
</script>
