<template>
	<b-table
	v-if="view == 'usuarios'"
	responsive
	head-variant="dark" 
	striped
	:fields="fields"
	:items="items">
		<template #cell(options)="data">
			<b-button
			@click="edit(commerces[data.index])"
			size="sm"
			variant="primary">
				<i class="icon-edit"></i>
			</b-button>
		</template>
	</b-table>
</template>
<script>
import mixin from '@/mixins/super'
export default {
	mixins: [mixin],
	data() {
		return {
			provider: {
				name: ''
			},
			saving_provider: false,
			deleting_provider: 0,
		}
	},
	computed: {
		commerces() {
			return this.$store.state.super.commerces
		},
		fields() {
			return [
				{ key: 'company_name', label: 'Comercio' },
				{ key: 'name', label: 'Nombre' },
				{ key: 'plan', label: 'Plan' },
				{ key: 'options', label: 'Opciones' },
			]
		},
		items() {
			let items = []
			this.commerces.forEach(item => {
				items.push({
					company_name: item.company_name,
					name: item.name,
					plan: item.plan.name,
				})
			})
			return items
		}
	},
	methods: {
		edit(commerce) {
			this.$store.commit('super/setCommerceEdit', commerce)
			this.$bvModal.show('edit-commerce')
		}
	}
}
</script>