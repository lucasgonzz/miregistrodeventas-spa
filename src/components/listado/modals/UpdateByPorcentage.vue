<template>
<b-modal id="update-by-porcentage" :title="`Aumentar los ${this.selected_articles.selected_articles.length} artículos seleccionados`">
	<b-container>
		<b-form-row>
			<b-col>
				<b-form-group
				label="Costo"
				label-for="percentage-cost">
					<b-form-input
					type="number"
					v-model="porcentage_cost"
					placeholder="Porcentaje para aumentar el costo"></b-form-input>
				</b-form-group>
			</b-col>
		</b-form-row>
		<b-form-row>
			<b-col>
				<b-form-group
				label="Precio"
				label-for="percentage-price">
					<b-form-input
					type="number"
					v-model="porcentage_price"
					@keyup.enter="update"
					placeholder="Porcentaje para aumentar el precio"></b-form-input>
				</b-form-group>
			</b-col>
		</b-form-row>
		<b-form-row>
			<b-col>
				<b-form-checkbox
				v-model="decimals"
				:value="1"
				:unchecked-value="0">
					Dejar decimales
				</b-form-checkbox>
			</b-col>
		</b-form-row>
	</b-container>
	<template v-slot:modal-footer>
		<b-button
		@click="update"
		variant="primary">
			<i class="icon-check" v-show="!updating_by_porcentage"></i>
			<span class="spinner-border spinner-border-sm" v-show="updating_by_porcentage"></span>
			Actualizar
		</b-button>
	</template>
</b-modal>
</template>
<script>
export default {
	props: ['selected_articles'],
	data() {
		return {
			porcentage_cost: '',
			porcentage_price: '',
			// round: 'up',
			decimals: 0,
			updating_by_porcentage: false,
		}
	},
	methods: {
		update() {
			this.updating_by_porcentage = true
			this.$api.post('articles/update-by-porcentage', {
				cost: Number(this.porcentage_cost),
				price: Number(this.porcentage_price),
				decimals: this.decimals,
				articles_ids: this.selected_articles.selected_articles
			})
			.then(() => {
				this.updating_by_porcentage = false
				this.porcentage_cost = ''
				this.porcentage_price = ''
				this.$emit('updateArticlesList')
				this.$bvModal.hide('update-by-porcentage')
			})
			.catch(err => {
				this.$toast.error('Error al actualizar')
				this.updating_by_porcentage = false
				console.log(err)
			})
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