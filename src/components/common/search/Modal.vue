<template>
<b-modal
:title="title"
size="xl"
hide-footer
:id="modal_id">
	<div
	class="search-component">
		<b-form-input
		@keyup="callSearch"
		@keydown.enter="enterSelect"
		@keydown.up="selectUp"
		@keydown.down="selectDown"
		v-model="query"
		:id="_id+'-search-modal-input'"
		:placeholder="_placeholder"></b-form-input>
		<!-- <p
		v-if="interval && waiting_time > 0">
			Buscando en {{ waiting_time }}
		</p> -->
		<!-- <div
		v-if="interval"
		class="align-center m-t-15">
			<b-spinner 
			small
			type="grow"
			class="m-r-10" 
			variant="primary"></b-spinner>
			Buscando
		</div> -->
		<div>
			<p
			v-if="results.length"
			class="results-title">
				<i class="icon-down"></i>
				Resultados
			</p>
			<table-component
			:loading="loading"
			:models="results"
			:properties="modelPropertiesFromName(get_model_name)"
			:model_name="get_model_name"
			:set_model_on_click="false"
			:show_btn_edit="false"
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
			loading: false,
			interval: 0,
			waiting_time: 1,
			searching: false,
			results: [],
			props_to_filter: [],
		}
	},
	computed: {
		modal_id() {
			return this._id+'-search-modal'
		},
		title() {
			if (this.prop) {
				return 'Buscar '+this.prop.text.toLowerCase()
			}
			return 'Buscar'
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
		callSearch() {
			this.loading = true 
			if (this.interval) {
	            window.clearInterval(this.interval)
				this.interval = null
			}
			if (this.query.length >= this.str_limint) {
				this.waiting_time = 1
				this.interval = window.setInterval(() => {
					if (this.waiting_time == 0) {
	                    window.clearInterval(this.interval)
	                    console.log('Se termino intervalo, llamando a search')
						this.search()
					} else {
						this.waiting_time--
					}		
				}, 200)
			} else {
				this.loading = false 
			}
		},
		search() {
			this.results = []
			if (this.query.length >= this.str_limint) {
				if (this.props_to_filter.length >= 1) {
					let results = []
					console.log('Empezando a buscar en')
					console.log(this.models)
					this.searching = true
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
					this.searching = false
					this.interval = null
					this.loading = false 
					console.log('Terminando a buscar')
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
		selectUp() {
			// let selected = this.$store.state[this.model_name].selected 
			// this.$store.commit(this.model_name+'/setSelected', this.results[])
		},	
		selectDown() {
			// this.$store.commit(this.model_name+'/setSelected',)
		},	
		setSelected(model) {
			console.log('se llamoooo')
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