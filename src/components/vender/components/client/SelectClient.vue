<template>
	<div>
		
		<div>
			<search-component
			class="m-b-15"
			@setSelected="setSelected"
			:model="vender"
			model_name="client"
			show_btn_create
			:prop="{text: 'Cliente', key: 'client_id'}"></search-component>
		</div>
		<!-- <b-button
		v-if="client"
		class="m-b-15"
		variant="outline-primary"
		@click="removeClient">
			Quitar cliente seleccionado
		</b-button> -->
	</div>
</template>
<script>
import Model from '@/components/common/model/Index'
import SearchComponent from '@/components/common/search/Index'

import display from '@/mixins/display'
import vender from '@/mixins/vender'
export default {
	mixins: [display, vender],
	components: {
		Model,
		SearchComponent,
	},
	computed: {
		price_types() {
			return this.$store.state.price_type.models 
		},
		vender: {
			get() {
				return this.$store.state.vender
			},
			set(value) {
				
			}
		},
	},
	watch: {
		client() {
			if (this.index_previus_sales > 0) {
				this.setItemsPrices(false, true)
			} else {
				this.setItemsPrices(false, false)
			}
			this.$store.commit('vender/setTotal') 
		},
	},
	methods: {
		setSelected(result) {
			let client = result.model 
			this.$store.commit('vender/setClient', client)
			if (client.price_type) {
				let price_type = this.price_types.find(model => {
					return model.id == client.price_type_id 
				})
				this.$store.commit('vender/setPriceType', price_type)
			}
		},
		removeClient() {
			this.$store.commit('vender/setClient', null)
			this.$store.commit('vender/setPriceType', null)
		},
	}
}
</script>
<style lang="sass">
.cont-client
	display: flex
	flex-direction: row
	justify-content: space-between
	align-items: flex-start
	margin-bottom: 15px
	& > div 
		margin-bottom: 0 !important 
		width: 80%
</style>