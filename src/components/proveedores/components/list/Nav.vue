<template>
	<b-row 
	class="m-b-15">
		<b-col
		md="8">
			<b-form-input
			@keyup="search"
			placeholder="Buscar un proveedor"
			v-model="query"></b-form-input>
		</b-col>
		<b-col
		md="4">
			<b-button
			block
			v-b-modal="'create-provider'"
			variant="primary">
				<i class="icon-plus"></i>
				Nuevo proveedor
			</b-button>
		</b-col>
	</b-row>
</template>
<script>
import SelectComponent from '@/components/common/select/Index'
export default {
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
			if (this.query.length < 3) {
				this.$store.commit('providers/setToShow')
			} else {
				let providers = this.providers.filter(item => {
					return item.name.toLowerCase().includes(this.query.toLowerCase())
				})
				this.$store.commit('providers/setToShow', providers)
			}

		}
	}
}
</script>