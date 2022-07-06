<template>
<div
class="j-between align-center">
	<horizontal-nav
	:items="items"
	prop_name="name"
	:set_sub_view="true"></horizontal-nav>
	<div
	class="j-start"> 
		<b-button
		v-if="show_btn_print"
		variant="primary"
		v-b-modal="'print-budget'">
			<i class="icon-print"></i>
		</b-button>
		<b-button
		v-if="show_btn_delete"
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
	props: ['show_planos'],
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
		},
		show_btn_delete() {
			return this.edit
		},
		show_btn_print() {
			return this.edit
		},
	},
	methods: {
		setDelete() {
			this.$store.commit('produccion/budgets/setDelete', this.edit)
			this.$bvModal.show('delete-budget')
			this.$bvModal.hide('create-budget')
		}
	}
}
</script>