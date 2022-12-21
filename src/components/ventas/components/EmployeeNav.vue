<template>
	<b-row
	v-if="show">
		<b-col
		cols="12">
			<horizontal-nav
			:items="items"
			set_sub_view
			:show_display="false"
			@setSelected="setSelected"></horizontal-nav>
		</b-col>
	</b-row>
</template>
<script>
import moment from 'moment'

import HorizontalNav from '@/components/common/horizontal-nav/Index'
export default {
	name: 'EmployeeNav',
	components: {
		HorizontalNav,
	},
	computed: {
		sales() {
			return this.$store.state.sale.models
		},
		employees() {
			return this.$store.state.employee.models
		},
		selected_employee() {
			return this.$store.state.sale.selected_employee
		},
		show() {
			return !this.user.owner_id && this.employees.length
		},
		items() {
			let items = []
			let text 
			items.push({name: 'todos'})
			items.push(this.countSales(this.user, false))
			this.employees.forEach(employee => {
				items.push(this.countSales(employee))
			})
			return items
		},
		selected_address() {
			return this.$store.state.sale.selected_address
		},
		current_sales() {
			return this.$store.state.sale.models
		},
		from_date() {
			return this.$store.state.sale.from_date
		},
	},
	watch: {
		from_date() {
			this.$store.commit('sale/setSelectedEmployee', {name: 'todos'})
			this.$router.push({name: this.route_name, params: {sub_view: 'todos'}})
		},
	},
	methods: {
		setSelected(employee) {
			console.log(employee)
			this.$store.commit('sale/setSelectedEmployee', employee)
			this.setSales()
		},
		countSales(user, is_employee = true) {
			let user_result = {...user}
			let sales
			if (is_employee) {
				sales = this.sales.filter(sale => {
					return sale.employee_id && sale.employee_id == user.id 
				})
			} else {
				sales = this.sales.filter(sale => {
					return !sale.employee_id
				})
			}
			if (sales.length) {
				user_result.name += ' ('+ sales.length + ')'
			}
			return user_result
		},
		setSales() {
			let sales 
			if (this.selected_employee.name == 'todos') {
				this.$store.commit('sale/setToShow')
			} else if (!this.selected_employee.owner_id) {
				sales = this.sales.filter(sale => {
					return !sale.employee_id 
				})
				this.$store.commit('sale/setToShow', sales)
			} else if (this.selected_employee.owner_id) {
				sales = this.sales.filter(sale => {
					return sale.employee_id == this.selected_employee.id 
				})
				this.$store.commit('sale/setToShow', sales)
			}
			this.$store.commit('sale/setTotal')
		},
	}
}
</script>