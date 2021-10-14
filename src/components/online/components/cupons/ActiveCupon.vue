<template>
	<b-card
	class="cupon-card shadow-2 b-r-1">
		<p>
			<strong>
				{{ cupon.buyer.name }}
			</strong>
		</p>
		<hr>
		<p
		v-if="cupon.expiration_date">
			Valido hasta {{ date(cupon.expiration_date) }}
		</p>
		<p
		v-if="cupon.amount">
			Descuento de {{ price(cupon.amount) }}
		</p>
		<p
		v-else>
			{{ cupon.percentage }}% de descuento
		</p>
		<b-button
		@click="deleteCupon"
		size="sm"
		variant="danger"
		block>
			Eliminar
		</b-button>
	</b-card>
</template>
<script>
export default {
	props: ['cupon'],
	methods: {
		deleteCupon() {
			this.$store.commit('online/cupons/setDelete', this.cupon)
			this.$bvModal.show('confirm')
		}
	}
}
</script>
<style lang="sass">
.cupon-card
	width: 200px 
</style>