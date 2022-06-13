<template>
	<b-col 
	v-if="can('providers')"
	md="6">
		<b-form-group
		label="Proveedor">
			<b-form-select
			id="article-provider"
			v-model="article.provider_id"
			:options="providers_options"></b-form-select>
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
	</b-col>
</template>
<script>
export default {
	name: 'Provider',
	props: ['article', 'show_checkboxs'],
}
</script>
