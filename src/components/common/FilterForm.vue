<template>
<b-modal
title="Filtrar"
id="filter"
size="lg"
hide-footer>
	<model-form
	:model="model"
	:model_name="model_name"
	:properties="properties"
	:form_to_filter="true">
		<template
		v-slot:buttons>
			<b-button
			@click="filter"
			block
			variant="primary">
				Filtrar
			</b-button>
		</template>
	</model-form>
</b-modal>
	<!-- <div
	class="search-form p-20 s-1 b-r-5">
	</div> -->
</template>
<script>
import ModelForm from '@/components/common/model/ModelForm'
export default {
	props: {
		model_name: {
			type: String,
		},
	},
	data() {
		return {
			model: {},
		}
	},
	computed: {
		properties() {
			let props = this.modelPropertiesFromName(this.model_name)
			return props.filter(prop => {
				return prop.filterable
			})
		},
	},
	methods: {
		filter() {
			console.log(this.model)
			this.$bvModal.hide('filter')
			this.$store.commit(this.model_name+'/setLoading', true)
			this.$api.post(this.model_name+'/filter', this.model)
			.then(res => {
				this.$store.commit(this.model_name+'/setLoading', false)
				this.$store.commit(this.model_name+'/setModels', res.data.models)
				this.$store.commit(this.model_name+'/setToShow')
			})
			.catch(err => {
				this.$store.commit(this.model_name+'/setLoading', false)
				console.log(err)
			})
		}
	},
	components: {
		ModelForm,
	},
}
</script>
<style lang="sass">
.search-form 
	max-width: 500px
	background: #FFF
	.form-group
		width: 100%
		& > div
			width: 100%
			display: flex
			flex-direction: column
			align-items: flex-start
</style>