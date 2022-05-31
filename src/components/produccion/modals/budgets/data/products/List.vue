<template>
	<div
	class="m-t-15"
	v-if="sub_view == 'productos'">
		<div
		v-if="budget_prop.products.length">
			<b-table
			responsive
			class="shadow-1 b-r-1"
			head-variant="dark"
			striped 
			:fields="fields"
			:items="items">
				<template 
				v-if="show_btn_delete"
				#cell(delete)="data">
					<b-button
					size="sm"
					@click="deleteProduct(budget_prop.products[data.index])"
					variant="danger">
						<i class="icon-trash"></i>
					</b-button>
				</template>
			</b-table> 
			<p class="title">
				Total: {{ getTotal(budget_prop) }}
			</p>
		</div>
		<p 
		v-else
		class="text-with-icon">
			<i class="icon-cancel"></i>
			No hay productos ingresados			
		</p>
	</div>
</template>
<script>
import budgets from '@/mixins/budgets'
export default {
	props: {
		budget_prop: {
			type: Object,
		},
		show_btn_delete: {
			type: Boolean,
			default: true
		}
	},
	mixins: [budgets],
	computed: {
		fields() {
			return [
				{key: 'code', label: 'Codigo'},
				{key: 'amount', label: 'Cantidad'},
				{key: 'name', label: 'Nombre'},
				{key: 'price', label: 'Precio'},
				{key: 'bonus', label: 'Bonificacion'},
				{key: 'total', label: 'Total'},
				{key: 'delete', label: ''},
			]
		},
		items() {
			let items = []
			this.budget_prop.products.forEach(item => {
				items.push({
					code: item.code,
					amount: item.amount,
					name: item.name,
					price: this.price(item.price),
					bonus: item.bonus,
					total: this.getProductTotal(item),
				})
			})
			return items
		},
	},
	methods: {
		deleteProduct(product) {
			let index = this.budget_prop.products.findIndex(item => {
				return item.id == product.id
			})
			console.log(index)
			if (index != -1) {
				this.budget_prop.products.splice(index, 1)
			}
		}
	}
}
</script>