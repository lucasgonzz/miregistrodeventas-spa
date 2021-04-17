<template>
	<div>
		<div
		v-if="!loading">
			<b-table
			v-show="commissions_to_show.length"
			:fileds="fields"
			:items="items">
				<template #cell(monto)="data">
					<b-button
					variant="info"
					@click="updateMonto(commissions_to_show[data.index])">
						{{ price(commissions_to_show[data.index].monto) }}
					</b-button>
				</template>
			</b-table>
			<p
			class="text-center"
			v-show="commissions_to_show.length == 0">
				Sin datos
			</p>
		</div>
		<b-skeleton-table
		v-else
		:rows="5"
		:columns="4"
		:table-props="{ bordered: true, striped: true }"
		></b-skeleton-table>
	</div>
</template>
<script>
export default {
	name: 'CommissionsList',
	computed: {
		selected_commissioner() {
			return this.$store.state.commissioners.selected_commissioner
		},
		commissions_to_show() {
			return this.$store.state.commissioners.commissions_to_show
		},
		loading() {
			return this.$store.state.commissioners.loading_commissions_to_show
		},
		fields() {
			return [
				{ key: 'fecha', label: 'Fecha', class: 'text-center'},
				{ key: 'pagado', label: 'Fecha', class: 'text-center'},
				{ key: 'detalle', class: 'text-center'},
				{ key: 'porcentaje', class: 'text-center'},
				{ key: 'monto', label: 'Monto', class: 'text-center'},
				{ key: 'saldo', class: 'text-center'},
			]
		},
		items() {
			let items = []
			this.commissions_to_show.forEach(commission => {
				items.push({
					fecha: this.date(commission.created_at),
					pagado: commission.updated_at ? this.date(commission.updated_at) : '',
					detalle: commission.detalle,
					porcentaje: commission.percentage+'%',
					monto: this.price(commission.monto),
					saldo: this.price(commission.saldo),
				})
			})
			return items
		}
	},
	methods: {
		updateMonto(commission) {
			this.$store.commit('commissioners/setCommissionToUpdateMonto', commission)
			this.$bvModal.show('update-monto')
			
		}
	}
}
</script>
<style scoped lang="sass">
.percentage-input
	width: 70px
</style>