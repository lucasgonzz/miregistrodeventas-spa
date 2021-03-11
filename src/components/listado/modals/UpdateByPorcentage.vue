<template>
<b-modal id="update-by-porcentage" :title="`Aumentar los artículos seleccionados`" hide-footer>
	<div>
		<b-form-group
		label="Costo"
		label-for="percentage-cost">
			<b-form-input
			type="number"
			v-model="porcentage_cost"
			placeholder="Porcentaje para aumentar el costo"></b-form-input>
		</b-form-group>
		<b-form-group
		label="Precio"
		label-for="percentage-price">
			<b-form-input
			type="number"
			v-model="porcentage_price"
			@keyup.enter="update"
			placeholder="Porcentaje para aumentar el precio"></b-form-input>
		</b-form-group>
		<b-form-group>
			<b-form-checkbox
			v-model="decimals"
			:value="1"
			:unchecked-value="0">
				Dejar decimales
			</b-form-checkbox>
		</b-form-group>
		<b-form-group>
			<b-button
			block
			@click="update"
			variant="primary">
				<btn-loader
				:loader="updating_by_porcentage"
				text="Actualizar"></btn-loader>
			</b-button>
		</b-form-group>
	</div>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'UpdateByPorcentage',
	components: {
		BtnLoader
	},
	data() {
		return {
			porcentage_cost: '',
			porcentage_price: '',
			// round: 'up',
			decimals: 0,
			updating_by_porcentage: false,
		}
	},
	computed: {
		selected_articles() {
			return this.$store.state.articles.selected_articles
		},
		selected_articles_id() {
			let ids = []
			this.selected_articles.forEach(art => {
				ids.push(art.id)
			})
			return ids
		}
	},
	methods: {
		update() {
			this.updating_by_porcentage = true
			this.$api.post('/articles/update-by-porcentage', {
				cost: Number(this.porcentage_cost),
				price: Number(this.porcentage_price),
				decimals: this.decimals,
				articles_ids: this.selected_articles_id
			})
			.then(res => {
				console.log(res)
				this.updating_by_porcentage = false
				this.clear()
				let articles = res.data.articles
				articles.forEach(article => {
					this.$store.commit('articles/update', article)
				})
				// this.$emit('updateArticlesList')
				this.$bvModal.hide('update-by-porcentage')
			})
			.catch(err => {
				this.$toast.error('Error al actualizar')
				this.updating_by_porcentage = false
				console.log(err)
			})
		},
		clear() {
			this.porcentage_cost = ''
			this.porcentage_price = ''
		},
	}
}
</script>
<style scoped>
.inline {
	display: inline-block;
	width: 30%;
}
</style>