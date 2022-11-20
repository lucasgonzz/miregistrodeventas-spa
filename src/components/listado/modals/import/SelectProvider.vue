<template>
	<b-form-group
	label="Proveedor de estos articulos">
		<b-form-select
		v-model="provider_id"
		:options="getOptions('provider_id', 'Proveedor')"></b-form-select>
	</b-form-group>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader,
	},
	props: {
		model_name: String,
		model_name_spanish: String,
	},
	computed: {
		title() {
			return 'Importar '+this.model_name_spanish
		},
		id() {
			return 'import-'+this.model_name
		},
		props() {
			return [
				{
					text: 'Nombre',
					key: 'name',
					column: 1,
				},
				{
					text: 'Costo',
					key: 'cost',
					column: 2,
				},
				{
					text: 'Precio',
					key: 'price',
					column: 3,
				},
			]
		},
	},
	data() {
		return {
			loading: false,
			file: null,
			percentage: '',
			provider_id: 0,
		}
	},
	methods: {
		upload() {
			this.loading = true
			let config = {headers: { 'content-type': 'multipart/form-data' }}
			let form_data = new FormData();
			form_data.append('models', this.file);
			form_data.append('percentage', this.percentage);
			form_data.append('provider_id', this.provider_id);
			this.props.forEach(prop => {
				form_data.append('prop_'+prop.text, prop.column);
			})
			this.$api.post(this.model_name+'/excel/import', form_data, config)
			.then(res => {
				this.loading = false
				this.file = null
				this.$bvModal.hide(this.id)
				this.$store.dispatch(this.model_name+'/getModels')
				this.$store.dispatch('provider/getModels')
				this.$store.dispatch('categories/getCategories')
				this.$store.dispatch('sub_categories/getSubCategories')
				console.log(res)
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		}
	}
}
</script>
<style lang="sass">
.cont-inputs
	display: flex
	flex-direction: row
	justify-content: space-between
	align-items: center
	// padding: .5em 0
	input 
		width: 100px
</style>