<template>
<b-modal
id="print-budget"
title="Imprimir presupuesto"
hide-footer>
	<b-form-radio
	v-model="only_deliveries"
	:value="0">
		Todos los productos
	</b-form-radio>
	<b-form-radio
	v-model="only_deliveries"
	:value="1">
		Solo los entregados
	</b-form-radio>
	<b-button
	class="m-t-15"
	@click="print"
	variant="primary"
	block>
		Generar PDF
	</b-button>
</b-modal>
</template>
<script>
export default {
	data() {
		return {
			only_deliveries: 0,
		}
	},
	computed: {
		model() {
			return this.$store.state.budget.model 
		},
	},
	methods: {
		print() {
            var link = process.env.VUE_APP_API_URL+'/budgets/pdf/'+this.only_deliveries+'/'+this.model.id
            window.open(link)
		},
	}
}
</script>