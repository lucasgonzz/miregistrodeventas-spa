<template>
	<div>
	    
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
	</div>
</template>
<script>
export default {
	computed: {
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
		edit(item) {
			console.log(item)
			this.$store.commit('payment_methods/setModel', item)
			this.$bvModal.show('payment_method')
		},
		deletePM(item) {
			this.$store.commit('payment_methods/setDelete', item)
			this.$bvModal.show('delete-payment_method')
		}
	}
}
</script>