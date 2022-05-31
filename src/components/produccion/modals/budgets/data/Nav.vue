<template>
<div
class="j-between align-center">
	<horizontal-nav
	:items="items"
	prop_name="name"
	:set_sub_view="true"></horizontal-nav>
	<div
	class="j-start"
	v-if="show_btn"> 
		<b-button
		variant="primary"
		@click="print()">
			<i class="icon-print"></i>
		</b-button>
		<b-button
		class="m-l-10"
		variant="danger"
		@click="setDelete()">
			<i class="icon-trash"></i>
		</b-button>
	</div>
</div>
</template>
<script>
import budgets from '@/mixins/budgets'

import HorizontalNav from '@/components/common/HorizontalNav'
export default {
	mixins: [budgets],
	props: ['show_btn', 'show_planos'],
	components: {
		HorizontalNav,
	},
	computed: {
		items() {
			let items = []
			items.push({name: 'productos'})
			items.push({name: 'fechas'})
			items.push({name: 'observaciones'})
			if (this.show_planos) {
				items.push({name: 'planos'})
			}
			return items
		}
	},
	methods: {
		print() {
            var link = process.env.VUE_APP_API_URL+'/budgets/pdf/'+this.budget_model.id
            window.open(link)
		},
		setDelete() {
			this.$store.commit('produccion/budgets/setDelete', this.budget_model)
			this.$bvModal.show('delete-budget')
			this.$bvModal.hide('budget-details')
		}
	}
}
</script>