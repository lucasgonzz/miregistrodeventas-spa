<template>
	<div>
		
    	<model
    	:modal_title="'Nuevo Cliente'"
    	:model="{}"
    	model_name="client"
    	:properties="modelPropertiesFromName('client')"></model>

		<div
		class="cont-client">
			<search-component
			class="m-b-15"
			@setSelected="setSelected"
			:model="vender"
			:prop="{text: 'Cliente', key: 'client_id', store: 'client'}"></search-component>
			<b-button
			@click="setModel(null, 'client')"
			variant="primary">
				<i class="icon-plus"></i>
				Cliente
			</b-button>
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
			this.setItemsPrices()
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