<template>
<b-modal
v-if="authenticated"
id="select-address"
hide-header
hide-footer
body-class="p-t-0 p-b-0">
	<p class="title text-center">
		Seleccione desde que direccion esta operando
	</p>
	<address-component
	v-for="address in user.addresses"
	:address="address"
	@setSelected="setSelected"></address-component>
</b-modal>
</template>
<script>
import AddressComponent from '@/components/common/select-address/AddressComponent'
export default {
	components: {
		AddressComponent,
	},
	methods: {
		setSelected(address) {
			this.$store.commit('auth/setSelectedAddress', address)
			this.$bvModal.hide('select-address')
		}
	}
}
</script>