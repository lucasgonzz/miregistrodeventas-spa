<template>
	<b-col 
	v-if="hasExtencion('providers')"
	md="6">
		<b-form-group
		label="Proveedor">
			<b-form-select
			id="article-provider"
			v-model="article.provider_id"
			:options="getOptions('provider_id', 'Proveedor')"></b-form-select>
		</b-form-group>
		<b-form-group
		v-if="show_checkboxs && article.provider_id != 0">
			<b-form-checkbox
			:disabled="article.provider_id == 0"
			v-model="article.save_provider"
	        :value="1"
	        :unchecked-value="0"
			id="article-not-provider">
				Guardar compra al proveedor
			</b-form-checkbox>
		</b-form-group>
		<b-form-checkbox
		v-if="provider && provider.percentage_gain"
		v-model="article.apply_provider_percentage_gain"
        :value="1"
        :unchecked-value="0">
			Aplicar porcentaje de ganancia ({{ provider.percentage_gain }}%)
		</b-form-checkbox>
	</b-col>
</template>
<script>
export default {
	name: 'Provider',
	props: ['article', 'show_checkboxs'],
	computed: {
		provider() {
			let provider = this.$store.state.provider.models.find(model => {
				return model.id == this.article.provider_id
			})
			if (typeof provider != 'undefined') {
				return provider
			}
			return null
		}
	}
}
</script>
