<template>
<b-modal
hide-footer
title="Nueva lista de precios"
id="create-prices-list">
	<b-form-input
	@keyup.enter="save"
	v-model="name"
	placeholder="Nombre de la lista de precios"></b-form-input>
	<b-button
	variant="primary"
	block
	@click="save"
	class="m-t-15">
		<btn-loader
		:loader="loading"
		text="Crear lista de precios"></btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import prices_lists from '@/mixins/prices_lists'
export default {
	mixins: [prices_lists],
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading: false,
			name: '',
		}
	},
	computed: {
		selected_articles() {
			return this.$store.state.articles.selected_articles
		},
	},
	methods: {
		save() {
			this.loading = true 
			this.$api.post('prices-lists', {
				name: this.name,
				articles: this.selected_articles
			})
			.then(res => {
				this.loading = false
				this.$store.commit('prices_lists/add', res.data.prices_list)
				this.$bvModal.hide('create-prices-list')
				this.print(res.data.prices_list)
				this.clear()
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		},
		clear() {
			this.name = ''
		},
	}
}
</script>