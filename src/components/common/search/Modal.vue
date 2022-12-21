<template>
<b-modal
:title="title"
size="xl"
hide-footer
:id="modal_id">
	<div
	class="search-component-modal">
		<b-form-input
		@keyup="callSearch"
		@keydown.enter="enterSelect"
		@keydown.up="selectUp"
		@keydown.down="selectDown"
		v-model="query"
		:id="_id+'-search-modal-input'"
		:placeholder="_placeholder"></b-form-input>
		<div
		v-if="query.length >= 3">
			<div
			v-if="loading || results.length">
				<p
				class="results-title">
					<i class="icon-down"></i>
					Resultados
				</p>
				<table-component
				:selected_index="selected_index"
				select_mode="single"
				:loading="loading"
				:models="results"
				:model_name="model_name"
				:set_model_on_click="false"
				:show_btn_edit="false"
				emit_selected_on_row
				@clicked="setSelected"></table-component>	
			</div>
			<div
			v-else>
				<div class="text-with-icon">
					<i class="icon-search"></i>
					No se encontraron resultados
				</div>
				<!-- <div class="text-with-icon">
					<i class="icon-check"></i>
					ENTER para crear {{ model_name }}
				</div> -->
			</div>
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
		prop: {
			type: Object,
		},
		model_name: String,
		str_limint: {
			type: Number,
			default: 2,
		},
		auto_select: Boolean,
		placeholder: {
			type: String,
		},
	},
	data() {
		return {
			loading: false,
			interval: 0,
			waiting_time: 1,
			searching: false,
			results: [],
			props_to_filter: [],
			selected_index: -1,
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
	},
	methods: {
		callSearch(e) {
			if (e.key != 'ArrowDown' && e.key != 'ArrowUp') {
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
							this.search()
						} else {
							this.waiting_time--
						}		
					}, 200)
				} else {
					this.loading = false 
				}
			}
		},
		search() {
			this.results = []
			if (this.query.length >= this.str_limint) {
				let results = []
				this.searching = true
				this.propsToFilter(this.model_name).forEach(prop => {
					results = this.modelsStoreFromName(this.model_name).filter(model => {
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
				if (this.auto_select) {
					setTimeout(() => {
						this.selected_index = -1
						setTimeout(() => {
							this.selected_index = 0
						}, 100)
					}, 100)
				}
			}
		},
		enterSelect() {
			console.log(this.selected_index)
			if (!this.loading) {
				if (this.selected_index != -1 && this.results.length) {
					this.$emit('setSelected', this.results[this.selected_index])
				} else {
					this.$emit('setSelected', null)
				}
				this.results = []
				this.$bvModal.hide(this.modal_id)
			} else {
				this.$toast.error('Espere a que termine la busqueda, por favor')
			}
		},
		selectUp() {
			if (this.selected_index > 0) {
				this.selected_index--
			}
		},	
		selectDown() {
			if (this.selected_index < this.results.length-1)
			this.selected_index++
		},	
		setSelected(model) {
			this.$emit('setSelected', model)
			this.results = []
			this.$bvModal.hide(this.modal_id)
		}
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom'
.search-component-modal
	width: 100%
	display: flex
	flex-direction: column
	.results-title
		font-size: 1.2em
		font-weight: bold
		margin: 1em 0
</style>