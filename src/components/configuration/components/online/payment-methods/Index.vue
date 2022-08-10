<template>
	<div>

    	<model
    	size="lg"
    	modal_title="Nuevo Metodo de Pago"
    	:model="payment_method"
    	model_name="payment_method"
    	:text_delete="text_delete"
    	:props="props">
    		<div
	    	v-if="payment_method.payment_method_type_id != 0">
	    		<keys
	    		:payment_method="payment_method"></keys>
    		</div>
    	</model>

		<b-card
		class="shadow-2 b-r-1 m-b-25"
		header="Metodos de Pago">

			<payment-methods-table></payment-methods-table>
			
			<btn-create></btn-create>
		</b-card>
	</div>
</template>
<script>
import Model from '@/components/common/model/Index'
import PaymentMethodsTable from '@/components/configuration/components/online/payment-methods/Table'
import BtnCreate from '@/components/configuration/components/online/payment-methods/BtnCreate'
import Keys from '@/components/configuration/components/online/payment-methods/Keys'

import model from '@/models/payment_method'
export default {
	components: {
		Model,
		PaymentMethodsTable,
		BtnCreate,
		Keys,
	},
	computed: {
		props() {
			return model.props
		},
		delete() {
			return this.$store.state.payment_methods.delete
		},
		text_delete() {
			if (this.delete) {
				return 'el metodo de pago '+this.delete.name
			}
		},
		payment_method() {
			return this.$store.state.payment_methods.model
		},
	},
	methods: {
		addModel() {
			this.$store.commit('payment_methods/setModel', null)
			this.$bvModal.show('payment-method')
		},
	}
}
</script>