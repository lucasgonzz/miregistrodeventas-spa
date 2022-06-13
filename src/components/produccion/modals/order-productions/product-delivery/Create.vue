<template>
<b-modal
id="create-product-delivery"
title="Nueva entrega"
hide-footer>
	<b-form-group
	label="Cantidad">
		<b-form-input
        type="number"
        min="1"
        :max="max"
		placeholder="Ingrese cuantas unidades se van a entregar"
		v-model="form.amount"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Nota">
		<b-form-textarea
		placeholder="Ingrese una nota sobre las unidades que se van a entregar"
		v-model="form.note"></b-form-textarea>
	</b-form-group>
	<b-form-group
    label="Fecha">
        <b-form-checkbox
        :value="true"
        :unchecked-value="false"
        v-model="form.current_date">
            Dia de hoy
        </b-form-checkbox>
        <b-form-datepicker
        class="m-t-10"
        placeholder="Ingrese la fecha en la que se hizo la entrega"
        v-if="!form.current_date"
        v-model="form.created_at">
        </b-form-datepicker>
    </b-form-group>
    <b-button
    @click="save"
    block
    variant="primary">
    	<btn-loader
    	text="Guardar"
    	:loader="loading"></btn-loader>
    </b-button>
</b-modal>
</template>
<script>
import product_deliveries from '@/mixins/product_deliveries'

import BtnLoader from '@/components/common/BtnLoader'
import BtnCreate from '@/components/produccion/modals/order-productions/product-delivery/BtnCreate'
import List from '@/components/produccion/modals/order-productions/product-delivery/List'
export default {
	mixins: [product_deliveries],
	components: {
		BtnLoader,
		BtnCreate,
		List,
	},
    computed: {
        max() {
            return this.product.amount - this.getTotalDeliveries()
        },
    },
	 data() {
        return {
        	form: {
                amount: '',
                note: '',
                current_date: true,
                created_at: '',
            },
        	loading: false,
        }
    },
    methods: {
    	save() {
    		if (this.check()) {
    			this.loading = true 
    			this.$api.post('budget-product-deliveries', {
    				...this.form,
    				product_id: this.product.id,
    			})
    			.then(res => {
    				this.loading = false 
    				this.$toast.success('Entrega guardada')
                    this.product.deliveries.unshift(res.data.budget_product_delivery)
    				this.$bvModal.hide('create-product-delivery')
    				this.clear()
    			})
    			.catch(err => {
    				this.loading = false
    				console.log(err)
    			})
    		}
    	},
    	check() {
            if (this.form.amount == '') {
                this.$toast.error('Ingrese la cantidad')
                return false
            }
            console.log(this.form.amount)
            console.log(this.max)
            if (Number(this.form.amount) > this.max) {
                this.$toast.error('Se estan entregando mas unidades de las solicitadas')
                return false
            }
    		return true
    	},
    	clear() {
    		this.form = {
                amount: '',
                note: '',
                current_date: true,
                created_at: '',
            }
    	}
    }
}
</script>