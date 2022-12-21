<template>
<b-modal 
id="update-article-props" 
title="Actual izar" 
hide-footer>
	<p>
		<strong>
			Costos y precios
		</strong>
	</p>
	<b-form-group
	label="Costo"
	label-for="percentage-cost">
		<b-form-input
		type="number"
		v-model="form.percentage_cost"
		placeholder="Porcentaje para aumentar el costo"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Precio"
	label-for="percentage-price">
		<b-form-input
		type="number"
		v-model="form.percentage_price"
		@keyup.enter="update"
		placeholder="Porcentaje para aumentar el precio"></b-form-input>
	</b-form-group>
	<hr>
	<b-form-group
	label="Iva">
		<b-form-select
		v-model="form.iva_id"
		:options="getOptions({key: 'iva_id', text: 'Iva', select_prop_name: 'percentage'})"></b-form-select>
	</b-form-group>
	<hr>
	<p>
		<strong>
			Categoria y SubCategoria
		</strong>
	</p>
	<b-form-group
	label="Categoria">
		<b-form-select
		v-model="form.category_id"
		:options="getOptions({key: 'category_id', text: 'Categoria', select_prop_name: 'name'})"></b-form-select>
	</b-form-group>
	<b-form-group
	label="Sub categoria">
		<b-form-select
		v-model="form.sub_category_id"
		:options="sub_categories_options(form)"></b-form-select>
	</b-form-group>
 
	<b-button
	block
	@click="update"
	variant="primary">
		<btn-loader
		:loader="loading"
		text="Actualizar"></btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import selected_articles from '@/mixins/selected_articles'
import categories from '@/mixins/categories'
export default {
	name: 'UpdateCategories',
	mixins: [selected_articles, categories],
	components: {
		BtnLoader,
	},
	data() {
		return {
			form: {
				percentage_cost: '',
				percentage_price: '',
				iva_id: 0,
				category_id: 0,
				sub_category_id: 0,
			},
			loading: false,
		}
	},
	computed: {
		from_filter() {
			return this.$store.state.article.from_filter
		},
		filter() {
			return this.$store.state.article.filter 
		},
	},
	methods: {
		update() {
			this.loading = true
			this.$api.put('/article/update-props/', {
				from_filter: this.from_filter,
				filter: this.filter,
				articles_ids: this.selected_articles_id,
				form: this.form,
			})
			.then(res => {
				this.loading = false
				let models = res.data.models
				models.forEach(model => {
					this.$store.commit('article/add', model)
				})
				this.$bvModal.hide('update-article-props')
				this.$toast.success('Artículos actualizados')
				// this.$store.commit('article/setFilter')
				this.clear()
			})
			.catch(err => {
				this.$toast.error('Error al actualizar')
				this.loading = false
				console.log(err)
			})
		},
		clear() {
			this.form = {
				percentage_cost: '',
				percentage_price: '',
				iva_id: 0,
				category_id: 0,
				sub_category_id: 0,
			}
		}
	}
}
</script>
<style scoped>
.inline {
	display: inline-block;
	width: 30%;
}
</style>