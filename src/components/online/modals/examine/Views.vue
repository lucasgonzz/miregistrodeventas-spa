<template>
	<b-modal
	hide-footer
	:title="`Vistas de ${this.viewable.name}`"
	id="views">
		<b-table
		:items="items"
		:fields="fields">
			<template #cell(buyer)="data">
				<b-button
				variant="primary"
				@click="showBuyer(viewable.views[data.index].buyer)"
				v-if="viewable.views[data.index].buyer">
					{{ viewable.views[data.index].buyer.name }}
				</b-button>
			</template>
		</b-table>
	</b-modal>
</template>
<script>
import mixin from '@/mixins/online'
export default {
	mixins: [mixin],
	computed: {
		viewable() {
			return this.$store.state.online.examine.viewable_to_show_views
		},
		fields() {
			return [
				{ key: 'date', label: 'Fecha' },
				{ key: 'hour', label: 'Hora' },
				{ key: 'buyer', label: 'Usuario' },
			]
		},
		items() {
			let items = []
			if (this.viewable.views) {
				this.viewable.views.forEach(view => {
					items.push({
						'date': this.date(view.created_at),
						'hour': this.hour(view.created_at),
					})
				})
			}
			return items
		},
	},
	methods: {
		showBuyer(buyer) {
			this.$store.commit('online/examine/setBuyerViews', buyer)
			this.$bvModal.show('buyer-views')
		}
	}
}
</script>