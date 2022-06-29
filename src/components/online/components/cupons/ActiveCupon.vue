<template>
	<b-card
	class="card-moderna shadow-2 b-r-1">
		<div class="title">
			<p>
				{{ cupon.code }}
			</p>
		</div>
		<p
		v-if="cupon.amount">
			Descuento de {{ price(cupon.amount) }}
		</p>
		<p
		v-else>
			{{ cupon.percentage }}% de descuento
		</p>
		<p
		v-if="cupon.min_amount">
			Compra minima de {{ price(cupon.min_amount) }}
		</p>
		<b-button
		@click="deleteCupon"
		variant="danger"
		block>
			Eliminar
		</b-button>
	</b-card>
</template>
<script>
export default {
	props: ['cupon'],
	computed: {
		cupon_title() {
			if (this.cupon.buyer) {
				return this.cupon.buyer.name+' '+this.cupon.buyer.surname
			}
			if (this.cupon.type == 'for_new_buyers') {
				return 'Para los nuevos usuarios'
			}
		},
		has_expiration() {
			return this.cupon.expiration_date || this.cupon.expiration_days
		},
		expiration() {
			if (this.cupon.type == 'normal') {
				return 'Valido hasta '+this.date(this.cupon.expiration_date)
			} else if (this.cupon.type == 'for_new_buyers' && this.cupon.expiration_days) {
				return 'Valido por '+this.cupon.expiration_days+' días'
			}
		}
	},
	methods: {
		deleteCupon() {
			this.$store.commit('online/cupons/setDelete', this.cupon)
			this.$bvModal.show('delete-cupon')
		}
	}
}
</script>
<style lang="sass">
.cupon-card
	width: 200px 
</style>