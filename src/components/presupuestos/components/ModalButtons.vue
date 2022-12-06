<template>
	<div>
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
		<hr>
	</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader2'
export default {
	components: {
		BtnLoader,
	},
	computed: {
		model_name() {
			return 'budget'
		},
		model() {
			return this.$store.state[this.model_name].model
		},
	},
	data() {
		return {
			loading: false,
		}
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
				this.$bvModal.hide('budget')
				this.$store.commit('order_production/add', res.data.model)
				this.$router.push({name: 'Produccion', params: {view: 'ordenes-de-produccion'}})
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
	}
}
</script>