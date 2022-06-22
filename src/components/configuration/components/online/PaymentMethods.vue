<template>
	<div>
	    <confirm
	    :text="text_delete"
	    :actions="['payment_methods/delete']"
	    id="delete-payment-method"
	    toast="Metodo de pago eliminado"></confirm>
	    <payment-method></payment-method>
		<b-card
		class="shadow-2 b-r-1 m-b-25"
		title="Metodos de Pago">
			<b-table
			class="shadow-2 b-r-1 m-b-15"
			responsive
			head-variant="dark" 
			v-if="payment_methods.length"
			striped
			:fields="fields"
			:items="items">
				<template #cell(options)="data">
					<b-button
					class="m-r-10"
					@click="edit(payment_methods[data.index])"
					size="sm"
					variant="primary">
						<i class="icon-edit"></i>
					</b-button>
					<b-button
					@click="deletePM(payment_methods[data.index])"
					size="sm"
					variant="danger">
						<i class="icon-trash"></i>
					</b-button>
				</template>
			</b-table>
			<p
			class="text-with-icon"
			v-else>
				<i class="icon-eye-slash"></i>
				No hay metodos de pago
			</p>
			<div 
			class="j-start m-t-20">
				<b-button
				variant="primary"
				block
				@click="addModel">
					<i class="icon-plus"></i>
					Nuevo Metodo de Pago
				</b-button>
			</div>
		</b-card>
	</div>
</template>
<script>
import Confirm from '@/components/common/Confirm'
import PaymentMethod from '@/components/configuration/modals/online/payment-methods/Model'
export default {
	components: {
		Confirm,
		PaymentMethod,
	},
	computed: {
		delete() {
			return this.$store.state.payment_methods.delete
		},
		text_delete() {
			if (this.delete) {
				return '¿Seguro que quiere eliminiar el metodo de pago '+this.delete.name+'?'
			}
		},
		payment_methods() {
			return this.$store.state.payment_methods.models
		},
		fields() {
			return [
				{ key: 'name', label: 'Nombre', class: 'text-center' },
				{ key: 'description', label: 'Descripcion', class: 'text-center' },
				{ key: 'options', label: '' },
			]
		},
		items() {
			let items = []
			this.payment_methods.forEach(item => {
				items.push({
					name: item.name,
					description: item.description,
				})
			})
			return items
		}
	},
	methods: {
		addModel() {
			this.$store.commit('payment_methods/setModel', null)
			this.$bvModal.show('payment-method')
		},
		edit(item) {
			console.log(item)
			this.$store.commit('payment_methods/setModel', item)
			this.$bvModal.show('payment-method')
		},
		deletePM(item) {
			this.$store.commit('payment_methods/setDelete', item)
			this.$bvModal.show('delete-payment-method')
		}
	}
}
</script>