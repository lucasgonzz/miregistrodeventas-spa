<template>
	<b-row 
	class="m-b-15">
		<b-col
		md="9">
			<b-form-input
			@keyup="search"
			placeholder="Buscar un proveedor"
			v-model="query"></b-form-input>
		</b-col>
		<b-col
		class="j-end"
		md="3">
			<b-dropdown 
			variant="primary" 
			text="Nuevo Proveedor">
				<b-dropdown-item 
				@click="createProvider">
					<i class="icon-plus"></i>
					Crear Proveedor
				</b-dropdown-item>
				<b-dropdown-item 
				v-b-modal="'import-providers'">
					<i class="icon-download"></i>
					Importar
				</b-dropdown-item>
			</b-dropdown>
			<!-- <b-button
			block
			v-b-modal="'create-provider'"
			variant="primary">
				<i class="icon-plus"></i>
				Nuevo proveedor
			</b-button> -->
		</b-col>
	</b-row>
</template>
<script>
import SelectComponent from '@/components/common/select/Index'

import providers from '@/mixins/providers'
export default {
	mixins: [providers],
	components: {
		SelectComponent,
	},
	data() {
		return {
			query: '',
		}
	},
	computed: {
		providers() {
			return this.$store.state.providers.models
		},
	},
	methods: {
		search() {
			if (this.query.length < 4) {
				this.$store.commit('providers/setToShow')
			} else {
				let providers = this.providers.filter(item => {
					return this.includes(item)
				})
				this.$store.commit('providers/setToShow', providers)
			}
		},
		includes(item) {
			if (item.name && item.name.toLowerCase().includes(this.query.toLowerCase())) {
				return true
			}
			if (item.address && item.address.toLowerCase().includes(this.query.toLowerCase())) {
				return true
			}
			if (item.phone && item.phone.toLowerCase().includes(this.query.toLowerCase())) {
				return true
			}
			if (item.razon_social && item.razon_social.toLowerCase().includes(this.query.toLowerCase())) {
				return true
			}
			if (item.email && item.email.toLowerCase().includes(this.query.toLowerCase())) {
				return true
			}
			if (item.cuit && item.cuit.toLowerCase().includes(this.query.toLowerCase())) {
				return true
			}
			return false
		},
	}
}
</script>