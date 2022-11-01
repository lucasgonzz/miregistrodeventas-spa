<template>
	<b-modal
	title="Buscar"
	hide-footer
	id="filter-modal">
		<div
		v-for="prop in props">

			<search-component
			v-if="prop.type == 'search'"
			class="m-b-15"
			:id="model_name+'-'+prop.key"
			@setSelected="setSelected"
			:models="modelsToSearch(prop)"
			:model_name="prop.store"
			:prop="prop"></search-component>

			<b-form-input
			class="m-b-15"
			v-if="prop.type == 'text' || prop.type == 'textarea'"
			:placeholder="'Ingrese '+prop.text"></b-form-input>

			<div
			class="m-b-15"
			v-if="prop.type == 'number'">
				<b-form-input
				type="number"
				:placeholder="'Que tengan '+prop.text+' menor a:'"></b-form-input>

				<b-form-input
				type="number"
				:placeholder="'Que tengan '+prop.text+' igual a:'"></b-form-input>

				<b-form-input
				type="number"
				:placeholder="'Que tengan '+prop.text+' mayor a:'"></b-form-input>
			</div>

			<div
			class="m-b-15"
			v-if="prop.type != 'search' && isRelationKey(prop)">
				<b-form-select
				v-model="filter[prop.key]"
				:options="getOptions(prop.key, prop.text)"></b-form-select>
			</div>
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
			filter: {}
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
				filter: this.filter,
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
				if (this.isRelationKey(prop)) {
					this.filter[prop.key] = 0
				} else {
					this.filter[prop.key] = ''
				}
			})
		},
		setSelected(result) {
			console.log(result)
			this.filter[result.prop.key] = result.model.id
			// this.filter[result.prop.store] = result.model
		},
	}
}
</script>