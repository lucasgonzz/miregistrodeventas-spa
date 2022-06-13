<template>
	<div class="j-between m-b-15">
		<select-component
		@setSelected="setSelected"
		placeholder="Buscar proveedor"
		:models="providers"></select-component>
		<b-button
		b-v-modal="'create-provider'"
		variant="primary">
			<i class="icon-plus"></i>
			Nuevo proveedor
		</b-button>
	</div>
</template>
<script>
import SelectComponent from '@/components/common/SelectComponent'
export default {
	components: {
		SelectComponent,
	},
	computed: {
		providers() {
			return this.$store.state.providers.models
		},
	},
	methods: {
		setSelected(result) {
			if (result.is_list) {
				this.$store.commit('providers/setToShow', result.selected)
			} else {
				this.$store.commit('providers/setToShow', [result.selected])
			}
		}
	}
}
</script>