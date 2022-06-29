<template>
	<div
	class="search-component">
		<b-form-input
		:id="id"
		@keydown="search"
		@keydown.enter="select"
		v-model="model[prop_name]"
		:placeholder="placeholder"></b-form-input>
		<div
		class="search-results shadow-2"
		v-if="results.length">
			<div 
			class="cont-results">
				<result
				v-for="result in results"
				@setSelected="setSelected"
				:result="result"
				:prop_name="prop_name"
				:prop_to_show="prop_to_show"
				:props_to_show="props_to_show"></result>	
			</div>
		</div>
	</div>
</template>
<script>
import Result from '@/components/common/select/Result'
export default {
	components: {
		Result,
	},
	props: {
		id: {
			type: String,
			default: 'select-component',
		},
		models: {
			type: Array,
		},
		model: {
			type: Object,
		},
		prop_name: {
			type: String,
			default: 'name',
		},
		prop_to_show: {
			type: String,
			default: 'name',
		},
		props_to_show: {
			type: Array,
		},
		placeholder: {
			type: String,
			default: 'Buscar',
		},
		str_limint: {
			type: Number,
			default: 2,
		},
		select_empty: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			results: []
		}
	},
	methods: {
		search() {
			if (this.model[this.prop_name].length < this.str_limint) {
				this.results = []
			} else {
				this.results = this.models.filter(model => {
					return model[this.prop_name] && model[this.prop_name].toLowerCase().includes(this.model[this.prop_name].toLowerCase())
				})
			}
		},
		select() {
			if (this.select_empty) {
				this.$emit('selectEmpty')
			}
		},
		setSelected(result) {
			this.results = []
			this.$emit('setSelected', result)
		}
	}
}
</script>
<style lang="sass">
.search-component
	position: relative
	width: 100%
	.search-results
		position: absolute
		z-index: 100
		background: #FFF
		// -webkit-box-shadow: 0px 3px 7px 1px rgba(0,0,0,0.41)
		// box-shadow: 0px 3px 7px 1px rgba(0,0,0,0.41)
		border-radius: 0 0 5px 5px
		width: 100%
		max-height: 400px
		overflow-y: scroll
		&::-webkit-scrollbar 
			display: none
</style>