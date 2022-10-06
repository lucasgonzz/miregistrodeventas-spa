<template>
<b-modal 
id="update-iva" 
title="Seleccionar Iva" 
hide-footer>
	<b-form-group
	label="Iva">
		<b-form-select
		v-model="iva_id"
		:options="getOptions('iva_id', 'Iva', 'percentage')"></b-form-select>
	</b-form-group>
	<b-form-group>
		<b-button
		block
		@click="update"
		variant="primary">
			<btn-loader
			:loader="loading"
			text="Actualizar"></btn-loader>
		</b-button>
	</b-form-group>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import selected_articles from '@/mixins/selected_articles'
import ivas from '@/mixins/ivas'
export default {
	name: 'UpdateIva',
	mixins: [selected_articles, ivas],
	components: {
		BtnLoader,
	},
	data() {
		return {
			iva_id: 0,
			loading: false,
		}
	},
	methods: {
		update() {
			this.loading = true
			this.$api.put('/article/update-prop/iva_id', {
				iva_id: this.iva_id,
				articles_ids: this.selected_articles_id
			})
			.then(res => {
				this.loading = false
				let articles = res.data.models
				articles.forEach(article => {
					this.$store.commit('article/add', article)
				})
				this.$bvModal.hide('update-iva')
				this.clear()
				this.$toast.success('Artículos actualizados')
			})
			.catch(err => {
				this.$toast.error('Error al actualizar')
				this.loading = false
				console.log(err)
			})
		},
		clear() {
			this.iva_id = 0
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