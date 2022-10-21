<template>
	<div>
		<search-modal
		:_id="id"
		:query_value="query"
		:models="models"
		:model_name="model_name"
		:prop="prop"
		:auto_select="auto_select"
		:placeholder="placeholder"
		:properties_to_filter="props_to_filter"
		:str_limint="str_limint"
		@setQuery="setQuery"
		@setSelected="setSelected"></search-modal>
		<div
		class="search-component">
			<b-form-input
			:id="id"
			@keyup="search"
			@keydown.enter="select"
			v-model="query"
			:placeholder="_placeholder"></b-form-input>
		</div>
		<div
		v-if="show_selected">
			<p
			class="m-t-15 m-l-15 m-b-0">
				<i class="icon-right"></i>
				{{ prop.text }} seleccionado: <strong>{{ model[modelNameFromRelationKey(prop)].name }}</strong>
			</p> 
		</div>
	</div>
</template>
<script>
import SearchModal from '@/components/common/search/Modal'
import TableComponent from '@/components/common/display/TableComponent'
export default {
	components: {
		SearchModal,
		TableComponent,
	},
	props: {
		id: {
			type: String,
			default: 'search-input',
		},
		models: {
			type: Array,
		},
		model: {
			type: Object,
			default: null,
		},
		model_name: {
			type: String,
			default: null,
		},
		prop: {
			type: Object,
			default: null,
		},
		str_limint: {
			type: Number,
			default: 2,
		},
		auto_select: {
			type: Boolean,
			default: true,
		},
		placeholder: {
			type: String,
			default: null,
		},
		properties_to_filter: {
			type: Array,
			default: () => {
				return []
			}
		},
		clear_query: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			query: '',
			results: [],
			props_to_filter: [],
		}
	},
	computed: {
		_placeholder() {
			if (this.placeholder) {
				return this.placeholder
			} else if (this.prop) {
				return 'Buscar '+this.prop.text.toLowerCase()
			}
		},
		show_selected() {
			if (this.model) {
				return this.prop && typeof this.prop.belongs_to_many == 'undefined' && this.model[this.modelNameFromRelationKey(this.prop)]
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
			this.props_to_filter = this.propsToFilter(this.prop.store)
		} 
		// if (this.prop) {
		// 	this.props_to_filter = this.modelPropertiesFromRelationKey(this.prop)
		// } else {
		// 	this.props_to_filter = this.modelPropertiesFromName(this.model_name)
		// }
	},
	methods: {
		setQuery(value) {
			this.query = value 
		},
		search() {
			this.results = []
			if (this.query.length >= (this.str_limint-1)) {
				this.$bvModal.show(this.id+'-search-modal')
				setTimeout(() => {
					document.getElementById(this.id+'-search-modal-input').focus()
				}, 100)
			}
		},
		setSelected(model) {
			console.log('emitiendo setSelected desde index con model =')
			console.log(model)
			this.results = []
			this.$emit('setSelected', {
				model,
				prop: this.prop,
				query: this.query,				
			})
			if (!this.clear_query && model) {
				this.query = model.name
			} else if (this.clear_query) {
				this.query = '' 
			}
		}
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom'
.search-component
	position: relative
	width: 100%
	.search-results
		position: absolute
		background: $background
		box-shadow: 0 0 0 0.2rem rgba($blue, .25)
		z-index: 100
		border-radius: 0 0 5px 5px
		min-width: 400px
		width: 100%
		top: 100%
		// transform: translateX(-100%)
		max-height: 700px
		overflow-y: scroll
		&::-webkit-scrollbar 
			display: none
		.results-title
			font-size: 1.2em
			font-weight: bold
			margin: 1em 1em 0
</style>