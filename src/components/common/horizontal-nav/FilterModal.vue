<template>
	<b-modal
	title="Buscar"
	hide-footer
	id="filter-modal">
		<p>
			<strong>
				Complete los campos que quiere usar para filtrar
			</strong>
		</p>
		<div
		v-for="(filter, index) in filters">

			<b-form-group
			v-if="filter.type == 'search'"
			:label="filter.label">
				<search-component
				class="m-b-15"
				:id="model_name+'-'+filter.key"
				@setSelected="setSelected"
				:model_name="filter.store"
				:model="filter"
				:prop="filter"></search-component>
			</b-form-group>

			<b-form-group
			v-if="filter.type == 'text' || filter.type == 'textarea'"
			:label="filter.label">
				<b-form-input
				@keyup.enter="search"
				class="m-b-15"
				v-model="filter.value"
				:placeholder="'Ingrese '+filter.text"></b-form-input>
			</b-form-group>

			<div
			class="m-b-15"
			v-if="filter.type == 'number'">
				<p
				v-if="filter.label">
					{{ filter.label }}
				</p>
				<b-form-input
				@keyup.enter="search"
				class="m-b-10"
				v-if="filter.number_type == 'min'"
				v-model="filter.value"
				type="number"
				:placeholder="'Que tengan '+filter.text+' menor a:'"></b-form-input>

				<b-form-input
				@keyup.enter="search"
				class="m-b-10"
				v-if="filter.number_type == 'equal'"
				v-model="filter.value"
				type="number"
				:placeholder="'Que tengan '+filter.text+' igual a:'"></b-form-input>

				<b-form-input
				@keyup.enter="search"
				class="m-b-10"
				v-if="filter.number_type == 'max'"
				v-model="filter.value"
				type="number"
				:placeholder="'Que tengan '+filter.text+' mayor a:'"></b-form-input>
			</div>

			<b-form-group
			class="m-b-15"
			v-if="filter.type == 'select'"
			:label="filter.label">
				<b-form-select
				@change="setSelectOptions(filter)"
				v-model="filter.value"
				:options="select_options[filter.key]"></b-form-select>
			</b-form-group>

			<b-form-group
			class="m-b-15"
			v-if="filter.type == 'boolean'"
			:label="filter.label">
				<b-form-select
				:options="booleanOptions(filter)"
				v-model="filter.value"></b-form-select>
			</b-form-group>

		</div>
		<b-button
		variant="primary"
		@click="search"
		block>
			Buscar
		</b-button>
	</b-modal>
</template>
<script>
import SearchComponent from '@/components/common/search/Index'
export default {
	props: {
		model_name: String,
	},
	components: {
		SearchComponent,
	},
	data() {
		return {
			filters: [],
			filter_model: {},
			select_options: {},
		}
	},
	computed: {
		props() {
			return this.propsToFilterInModal(this.model_name)
		},
		// filters() {
		// 	let filters = this.$store.state[this.model_name].filters
		// 	if (typeof filters != 'undefined') {
		// 		return filters 
		// 	} 
		// 	return this._filters
		// }
	},
	created() {	
		this.initFilter()
		this.setSelectOptions()
	},
	methods: {
		search() {
			this.$store.commit(this.model_name+'/setLoading', true)
			this.$store.commit(this.model_name+'/setFromDate', '')
			this.$bvModal.hide('filter-modal')
			this.$api.post('search/'+this.model_name, {
				props: this.props,
				filters: this.filters,
			})
			.then(res => {
				this.$store.commit(this.model_name+'/setLoading', false)
				this.$store.commit(this.model_name+'/setIsFiltered', true) 
				this.$store.commit(this.model_name+'/setFiltered', res.data.models)
				this.clearFilter()
			})
			.catch(err => {
				console.log(err)
				this.$toast.error('Error al buscar')
			})
		},
		clearFilter() {
			this.filters.forEach(filter => {
				if (filter.type == 'search') {
					filter.value = 0
				}
			})
		},
		initFilter() {	
			this.props.forEach(prop => {
				if (prop.type == 'number') {
					this.filters.push({
						label: prop.text,
						type: 'number',
						text: prop.text,
						number_type: 'min',
						key: prop.key,
						value: '',
					})
					this.filters.push({
						type: 'number',
						text: prop.text,
						number_type: 'equal',
						key: prop.key,
						value: '',
					})
					this.filters.push({
						type: 'number',
						text: prop.text,
						number_type: 'max',
						key: prop.key,
						value: '',
					})
				} else if (prop.type == 'text' || prop.type == 'textarea') {
					this.filters.push({
						label: prop.text,
						type: prop.type,
						text: prop.text,
						store: prop.store,
						key: prop.key,
						value: '',
					})
				} else if (prop.type == 'boolean') {
					this.filters.push({
						label: prop.text,
						type: prop.type,
						text: prop.text,
						store: prop.store,
						key: prop.key,
						value: -1,
					})
				} else {
					this.filters.push({
						label: prop.text,
						type: prop.type,
						text: prop.text,
						store: prop.store,
						key: prop.key,
						depends_on: prop.depends_on,
						value: 0,
					})
				}
			})
		},
		setSelectOptions() {
			this.filters.forEach(filter => {
				if (filter.type == 'select') {
					this.filter_model[filter.key] = filter.value 
					this.$set(this.select_options, filter.key, this.getOptions({key: filter.key, text: filter.label, depends_on: filter.depends_on}, this.filter_model))
				}
			})
			console.log(this.filter_model)
			console.log(this.select_options)
		},
		setSelected(result) {
			console.log(result)
			result.prop.value = result.model.id
		},
	}
}
</script>