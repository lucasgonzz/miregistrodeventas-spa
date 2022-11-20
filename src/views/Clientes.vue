<template>
	<view-component
	model_name="client"
	model_name_spanish="clientes"
	create_model_name_spanish="cliente"
	:show_previus_days="false"
	show_filter_modal
	show_search_nav>
		<template #modals>
	    	<current-acounts></current-acounts>

	    	<update-prices></update-prices>

	    	<sale-details></sale-details>

	    	<import></import>
		</template>

		<template #horizontal_nav_btn_create>
			<create-dropdown></create-dropdown>
		</template>

		<template
		v-slot:modal_buttons="slotProps">
    		<comercio-city-user  
    		:model="slotProps.model"
    		model_name="client"></comercio-city-user>

    		<create-buyer  
    		:model="slotProps.model"></create-buyer>
		</template>

		<template v-slot:default="slotProps">
			<b-button
			class="m-l-15"
			@click="showCurrentAcounts(slotProps.model)"
			variant="success">
				C/C
			</b-button>
		</template>

	</view-component>
</template>
<script>
import CurrentAcounts from '@/components/common/current-acounts/Index'
import UpdatePrices from '@/components/ventas/modals/update-prices/Index'
import SaleDetails from '@/components/ventas/modals/details/Index'
import Import from '@/components/clientes/modals/Import'

import CreateDropdown from '@/components/clientes/components/CreateDropdown'
import ViewComponent from '@/components/common/view/Index'


import HorizontalNav from '@/components/common/horizontal-nav/Index'
import SearchNav from '@/components/common/search-nav/Index'
import TableComponent from '@/components/common/display/TableComponent'
import Model from '@/components/common/model/Index'
import ComercioCityUser from '@/components/common/ComercioCityUser'
import CreateBuyer from '@/components/clientes/components/CreateBuyer'

import display from '@/mixins/display'
export default {
	mixins: [display],
	computed: {
		model_name() {
			return 'client'
		},
		model_name_spanish() {
			return 'cliente'
		},
		create_model_name_spanish() {
			return 'Nuevo cliente'
		},
		display() {
			return this.$store.state[this.model_name].display
		},
		loading() {
			return this.$store.state[this.model_name].loading
		},
		to_show() {
			return this.$store.state[this.model_name].to_show
		},
		models() {
			return this.$store.state[this.model_name].models
		},
		model() {
			return this.$store.state[this.model_name].model
		},
		delete() {
			return this.$store.state[this.model_name].delete
		},
		text_delete() {
			if (this.delete) {
				return 'el cliente '+this.delete.name
			}
			return ''
		},
		properties() {
			return require(`@/models/${this.model_name}`).default.properties 
		}
	},
	methods: {
		setDisplay(display) {
			this.$store.commit(this.model_name+'/setDisplay', display)
		},
		showCurrentAcounts(model) {
			console.log(model)
			this.$store.commit('current_acount/setFromModelName', 'client')
			this.$store.commit('current_acount/setFromModel', model)
			this.$store.dispatch('current_acount/getModels')
			this.$bvModal.show('current-acounts')
		},
	},
	components: {
		CurrentAcounts,
		UpdatePrices,
		SaleDetails,
		Import,

		CreateDropdown,
		ViewComponent,
		
		HorizontalNav,
		SearchNav,
		TableComponent,
		Model,
		ComercioCityUser,
		CreateBuyer,
	}
}
</script>