

<template>
	<div
	v-if="view == 'ordenes-de-produccion'">
	   
	    <!-- <update-status></update-status> 
	    <product-delivery></product-delivery>
	    <product-article-stock></product-article-stock> -->

	    <order-production-status></order-production-status>
    	
    	<model
    	size="xl"
    	:modal_title="create_model_name_spanish"
    	:model="model"
    	:model_name="model_name"
    	:text_delete="text_delete"
    	:properties="properties">
    		<template v-slot:default>
    			<b-button
    			block
    			@click="print"
    			variant="outline-danger">
    				<i class="icon-print"></i>
    				Imprimir
    			</b-button>
    			<b-button
    			block
    			@click="printTickets"
    			variant="outline-primary">
    				<i class="icon-print"></i>
    				Imprimir etiquetas
    			</b-button>
    		</template>
    	</model>

		<print></print>
		<b-row>
			<b-col
			cols="12"
			xl="10">
				<horizontal-nav
				:show_btn_create="can('order_production.store')"
				:create_model_name_spanish="create_model_name_spanish"
				:model_name="model_name"
				:display="display">
					<template v-slot:buttons>
						<b-button
						class="m-l-15"
						variant="primary"
						v-b-modal="'order_production_statuses'">
							Estados
						</b-button>
					</template>
				</horizontal-nav>

				<list></list>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import Model from '@/components/common/model/Index'
import Print from '@/components/produccion/modals/budgets/Print'

import OrderProductionStatus from '@/components/produccion/components/order-productions/OrderProductionStatus'
import List from '@/components/produccion/components/order-productions/List'
import HorizontalNav from '@/components/common/horizontal-nav/Index'

import display from '@/mixins/display'
export default {
	mixins: [display],
	components: {
		Model,
		Print,

		OrderProductionStatus,
		HorizontalNav,
		List,
	},
	computed: {
		model_name() {
			return 'order_production'
		},
		model_name_spanish() {
			return 'ordenes de produccion'
		},
		create_model_name_spanish() {
			return 'Nueva Orden de Produccion'
		},
		model() {
			return this.$store.state[this.model_name].model
		},
		delete() {
			return this.$store.state[this.model_name].delete
		},
		text_delete() {
			return 'la orden de produccion'
		},
		display() {
			return this.$store.state[this.model_name].display
		},
		properties() {
			return require(`@/models/${this.model_name}`).default.properties 
		},
	},
	methods: {
		print() {
            var link = process.env.VUE_APP_API_URL+'/order-productions/print-pdf/'+this.model.id
            window.open(link)
		},
		printTickets() {
			let link = process.env.VUE_APP_API_URL+'/order-productions/articles-pdf/'+this.model.id
			window.open(link)
		}
		// create() {
			// this.setModel(null, 'budget')
			// this.$store.commit('produccion/budgets/create/setBudget', null)
			// this.$store.commit('produccion/budgets/create/setClient', null)
			// this.$store.commit('produccion/budgets/create/setProducts', [])
			// this.$store.commit('produccion/budgets/create/setStartAt', '')
			// this.$store.commit('produccion/budgets/create/setFinishAt', '')
			// this.$store.commit('produccion/budgets/create/setOptionalStatuses', [])
			// this.$store.commit('produccion/budgets/create/setObservations', [{
			// 	text: ''
			// }])
			// this.$store.commit('produccion/budgets/create/setCanEdit', true)
			// this.$store.commit('produccion/budgets/create/setShowBtnProduction', false)
			// this.$router.push({name: this.route_name, params: {sub_view: 'productos'}})
			// setTimeout(() => {
			// 	this.$bvModal.show('create-budget')
			// }, 100)
		// }
	}
}
</script>