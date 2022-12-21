<template>
	<div>
		<search-modal
		:_id="id"
		:query_value="query"
		:prop="prop"
		:auto_select="auto_select"
		:model_name="model_name"
		:placeholder="_placeholder"
		:str_limint="str_limint"
		@setQuery="setQuery"
		@setSelected="setSelected"></search-modal>

		<div
		class="search-component">
			<div class="cont-search">
				<div 
				:class="is_disabled ? 'bg-gray' : 'bg-withe'"
				class="icon">
					<i class="icon-search"></i>
				</div>
				<b-form-input
				:disabled="is_disabled"
				class="input-search"
				:id="id"
				@keyup="callSearchModal"
				v-model="query"
				:placeholder="_placeholder"></b-form-input>
			</div>
			<btn-create-model
			v-if="show_btn_create"
			:model_name="model_name"></btn-create-model>
		</div>
		<div
		class="align-center m-t-15"
		v-if="show_selected && selected_model && !prop.belongs_to_many">
			<b-button
			v-if="!is_disabled"
			size="sm"
			@click="clearSelected"
			variant="outline-primary">
				Limpiar
			</b-button>
			<p
			class="m-b-0 m-l-15">
				<i class="icon-right"></i>
				{{ prop.text }} seleccionado: <strong>{{ selected_model.name }}</strong>
			</p> 
		</div>
	</div>
</template>
<script>
import SearchModal from '@/components/common/search/Modal'
import BtnCreateModel from '@/components/common/search/BtnCreateModel'
import TableComponent from '@/components/common/display/TableComponent'
export default {
	components: {
		SearchModal,
		BtnCreateModel,
		TableComponent,
	},
	props: {
		id: {
			type: String,
			default: 'search-input',
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
		clear_query: {
			type: Boolean,
			default: false,
		},
		show_btn_create: {
			type: Boolean,
			default: false,
		},
		show_selected: {
			type: Boolean,
			default: true,
		},
		placeholder: {
			type: String,
			default: null,
		}
	},
	data() {
		return {
			query: '',
			props_to_filter: [],
			selected_model: null,
		}
	},
	computed: {
		_placeholder() {
			if (this.placeholder) {
				return this.placeholder
			}
			return 'Buscar '+this.singular(this.model_name)
		},
		is_disabled() {
			if (this.prop && this.prop.can_not_modify) {
				return true 
			}
			return false
		},
		// _placeholder() {
		// 	if (this.placeholder) {
		// 		return this.placeholder
		// 	} else if (this.prop) {
		// 		return 'Buscar '+this.singular(this.model_name)
		// 		// return 'Buscar '+this.prop.text.toLowerCase()
		// 	}
		// },
	},
	created() {
		this.setSelectedModelProp()
	},
	methods: {
		setSelectedModelProp() {
			if (this.show_selected) {
				if (this.model && this.model[this.prop.store]) {
					this.selected_model = this.model[this.prop.store]
					this.query = this.model[this.prop.store].name
				} 
			} 
		},
		clearSelected() {
			if (this.model) {
				this.model[this.prop.store] = null
				this.model[this.prop.key] = null
			}
			this.selected_model = null
			this.query = ''
		},
		setQuery(value) {
			this.query = value 
		},
		callSearchModal(e) {
			this.results = []
			if (this.query.length >= (this.str_limint-1) && e.code != 'Enter' && e.code != 'Backspace') {
				this.$bvModal.show(this.id+'-search-modal')
				setTimeout(() => {
					document.getElementById(this.id+'-search-modal-input').focus()
				}, 100)
			}
		},
		setSelected(model) {
			this.selected_model = model 
			this.$emit('setSelected', {
				model,
				prop: this.prop,
				query: this.query,				
			})
			if (this.clear_query) {
				this.query = ''
				console.log('se limpio')
			}
			// if (!this.prop.belongs_to_many && !this.clear_query) {
			// 	// this.query = model.name
			// } else {
			// 	console.log('se limpio')
			// 	this.query = '' 
			// }
		}
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom'
.search-component
	width: 100%
	// display: flex
	.cont-search
		position: relative
		display: flex
		flex-direction: row
		box-shadow: 0 2px 4px rgb(0 0 0 / 15%) !important
		border: 1px solid #ced4da
		border-radius: 0.25rem 
	.icon 
		background: #FFF
		width: 40px
		display: flex
		flex-direction: row
		align-items: center
		font-size: 1.2em
		justify-content: flex-end
		border-radius: 0.25rem 0 0 0.25rem
		i
			color: rgba(0, 0, 0, .6)
	.bg-gray 
		background: #e9ecef !important
	.input-search
		border-radius: 0 0.25rem 0.25rem 0 
		box-shadow: none !important
		border: none !important
</style>