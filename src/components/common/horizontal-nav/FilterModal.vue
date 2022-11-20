<template>
	<b-modal
	title="Buscar"
	hide-footer
	id="filter-modal">
		<div
		v-for="filter in filters">

			<b-form-group
			v-if="filter.type == 'search'"
			:label="filter.text">
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
			:label="filter.text">
				<b-form-input
				class="m-b-15"
				:placeholder="'Ingrese '+filter.text"></b-form-input>
			</b-form-group>

			<div
			class="m-b-15"
			v-if="filter.type == 'number'">
				<b-form-input
				class="m-b-10"
				v-if="filter.number_type == 'min'"
				v-model="filter.value"
				type="number"
				:placeholder="'Que tengan '+filter.text+' menor a:'"></b-form-input>

				<b-form-input
				class="m-b-10"
				v-if="filter.number_type == 'equal'"
				v-model="filter.value"
				type="number"
				:placeholder="'Que tengan '+filter.text+' igual a:'"></b-form-input>

				<b-form-input
				class="m-b-10"
				v-if="filter.number_type == 'max'"
				v-model="filter.value"
				type="number"
				:placeholder="'Que tengan '+filter.text+' mayor a:'"></b-form-input>
			</div>

			<b-form-group
			class="m-b-15"
			v-if="filter.type != 'search' && isRelationKey(filter)"
			:label="filter.text">
				<b-form-select
				v-model="filter.value"
				:options="getOptions(filter.key, filter.text)"></b-form-select>
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
			filters: []
		}
	},
	computed: {
		props() {
			return this.propsToFilterInModal(this.model_name)
		},
	},
	created() {	
		this.initFilter()
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
				this.$store.commit(this.model_name+'/setToShow', res.data.models)
			})
			.catch(err => {
				console.log(err)
				this.$toast.error('Error al buscar')
			})
		},
		initFilter() {	
			this.props.forEach(prop => {
				if (prop.type == 'number') {
					this.filters.push({
						type: 'number',
						text: prop.key,
						number_type: 'min',
						key: prop.key,
						value: '',
					})
					this.filters.push({
						type: 'number',
						text: prop.key,
						number_type: 'equal',
						key: prop.key,
						value: '',
					})
					this.filters.push({
						type: 'number',
						text: prop.key,
						number_type: 'max',
						key: prop.key,
						value: '',
					})
				} else {
					this.filters.push({
						type: prop.type,
						text: prop.text,
						store: prop.store,
						key: prop.key,
						value: 0,
					})
				}
			})
		},
		setSelected(result) {
			console.log(result)
			result.prop.value = result.model.id
			// this.filter[result.prop.key] = result.model.id
			// this.filter[result.prop.store] = result.model
		},
	}
}
</script>