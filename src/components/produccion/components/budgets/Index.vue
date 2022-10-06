<template>
	<div
	v-if="view == 'presupuestos'">
	   
    	<model
    	size="xl"
    	:modal_title="create_model_name_spanish"
    	:model="model"
    	:model_name="model_name"
    	:text_delete="text_delete"
    	:properties="properties">
    		<template v-slot:default>
    			<btn-loader
    			v-if="model.budget_status && model.budget_status.name == 'Confirmado' && !model.order_production"
    			variant="outline-primary"
    			:loader="loading"
    			text="Crear orden de produccion"
    			@clicked="createOrderProduction" />
    			<b-button
    			block
    			@click="print"
    			variant="outline-danger">
    				<i class="icon-edit"></i>
    				Imprimir
    			</b-button>
    		</template>
    	</model>

		<print></print>
		<b-row>
			<b-col
			cols="12"
			xl="10">
				<horizontal-nav
				:show_btn_create="can('budget.store')"
				:create_model_name_spanish="create_model_name_spanish"
				:model_name="model_name"
				:display="display"></horizontal-nav>
				
				<list></list>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import Model from '@/components/common/model/Index'
import Print from '@/components/produccion/modals/budgets/Print'
import List from '@/components/produccion/components/budgets/List'
import BtnLoader from '@/components/common/BtnLoader2'
import HorizontalNav from '@/components/common/horizontal-nav/Index'

import display from '@/mixins/display'
export default {
	mixins: [display],
	components: {
		Model,
		Print,
		BtnLoader,
		HorizontalNav,
		
		List,
	},
	data() {
		return {
			loading: false,
		}
	},
	computed: {
		model_name() {
			return 'budget'
		},
		model_name_spanish() {
			return 'presupuesto'
		},
		create_model_name_spanish() {
			return 'Nuevo presupuesto'
		},
		model() {
			return this.$store.state[this.model_name].model
		},
		delete() {
			return this.$store.state[this.model_name].delete
		},
		text_delete() {
			if (this.delete) {
				return 'el presupuesto'
			}
			return ''
		},
		display() {
			return this.$store.state[this.model_name].display
		},
		properties() {
			return require(`@/models/${this.model_name}`).default.properties 
		},
	},
	methods: {
		createOrderProduction() {
			this.loading = true 
			this.$api.post('order-production', {
				...this.model
			})
			.then(res => {
				this.loading = false 
				this.$toast.success('Orden de Produccion creada')
				this.$bvModel.hide('budget')
				this.$router.push(this.route_name, {view: 'ordenes-de-produccion'})
			})
			.catch(err => {
				this.loading = false 
				console.log(err)
				this.$toast.error('Error al crear Orden de Produccion')
			})
		},
		print() {
            var link = process.env.VUE_APP_API_URL+'/budgets/pdf/'+this.model.id
            window.open(link)
		},
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