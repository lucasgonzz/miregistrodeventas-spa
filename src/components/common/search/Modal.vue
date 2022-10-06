<template>
<b-modal
:title="'Buscar '+model_name"
size="xl"
hide-footer
:id="modal_id">
	<div
	class="search-component">
		<b-form-input
		@keyup="search"
		@keydown.enter="enterSelect"
		v-model="query"
		:id="_id+'-search-modal-input'"
		:placeholder="_placeholder"></b-form-input>

		<div
		v-if="results.length">
			<p
			class="results-title">
				<i class="icon-down"></i>
				Resultados
			</p>
			<table-component
			:loading="false"
			:models="results"
			:properties="modelPropertiesFromName(get_model_name)"
			:model_name="get_model_name"
			:set_model_on_click="false"
			emit_selected_on_row
			@clicked="setSelected"></table-component>	
		</div>
	</div>
</b-modal>
</template>
<script>
import TableComponent from '@/components/common/display/TableComponent'
export default {
	components: {
		TableComponent,
	},
	props: {
		_id: String,
		query_value: String,
		models: {
			type: Array,
		},
		model_name: {
			type: String,
		},
		prop: {
			type: Object,
		},
		str_limint: {
			type: Number,
			default: 2,
		},
		auto_select: {
			type: Boolean,
		},
		placeholder: {
			type: String,
		},
		properties_to_filter: Array,
	},
	data() {
		return {
			results: [],
			props_to_filter: [],
		}
	},
	computed: {
		modal_id() {
			return this._id+'-search-modal'
		},
		query: {
			get() {
				return this.query_value 
			},
			set(value) {
				this.$emit('setQuery', value)
			}
		},
		_placeholder() {
			if (this.placeholder) {
				return this.placeholder
			} else if (this.prop) {
				return 'Buscar '+this.prop.text.toLowerCase()
			}
		},
		get_model_name() {
			if (this.model_name) {
				return this.model_name
			} else if (this.prop) {
				return this.modelNameFromRelationKey(this.prop)
			}
		},

	},
	created() {
		if (this.properties_to_filter.length) {
			this.props_to_filter = this.properties_to_filter
		} else if (this.prop) {
			this.props_to_filter = this.modelPropertiesFromRelationKey(this.prop)
		} 
		// if (this.prop) {
		// 	this.props_to_filter = this.modelPropertiesFromRelationKey(this.prop)
		// } else {
		// 	this.props_to_filter = this.modelPropertiesFromName(this.model_name)
		// }
	},
	methods: {
		search() {
			this.results = []
			if (this.query.length >= this.str_limint) {
				if (this.props_to_filter.length >= 1) {
					let results = []
					this.props_to_filter.forEach(prop => {
						results = this.models.filter(model => {
							let value = ''+model[prop.key]
							return value && value.toLowerCase().includes(this.query.toLowerCase())
						})
						results = results.filter(model => {
							let index = this.results.findIndex(result => {
								return result.id == model.id 
							})
							return index == -1
						})
						this.results = this.results.concat(results)
					})
				}
			}
		},
		enterSelect() {
			if (this.auto_select && this.results.length) {
				this.$emit('setSelected', this.results[0])
			} else {
				this.$emit('setSelected', null)
			}
			this.results = []
			this.$bvModal.hide(this.modal_id)
		},
		setSelected(model) {
			console.log(model)
			this.results = []
			this.$emit('setSelected', model)
			this.$bvModal.hide(this.modal_id)
		}
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom'
.search-component
	width: 100%
	.results-title
		font-size: 1.2em
		font-weight: bold
		margin: 1em 0
</style>