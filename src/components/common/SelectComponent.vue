<template>
	<div 
	:class="full_width ? 'width-100' : ''"
	class="select-component">
	    <autocomplete 
	    :id="id"
	    :ref="placeholder"
	    :search="search" 
		:get-result-value="getResultValue"
	    :auto-select="auto_select"
	    :placeholder="placeholder"
	    @submit="setSelected"></autocomplete>
	</div>
</template>
<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
export default {
	components : {
		Autocomplete,
	},
	props: {
		full_width: {
			type: Boolean,
			default: false,
		},
		model: {
			type: Object,
		},
		model_prop: {
			type: String,
			default: 'name',
		},
		models: {
			type: Array
		},
		placeholder: {
			type: String
		},
		auto_select: {
			type: Boolean,
			default: false,
		},
		select_empty: {
			type: Boolean,
			default: false,
		},
		id: {
			type: String,
			default: 'select-component-input',
		},
	},
	watch: {
		model() {
			let input = document.getElementById(this.id)
			console.log(this.model)
			console.log('se va a setear '+this.id+' con el valor '+this.model[this.model_prop] )
			input.value = this.model[this.model_prop] 
			// this.$refs[this.placeholder].value = this.model[this.model_prop]
		},
	},
	methods: {
        search(input, all = false) {
            if (!all && input.length < 2) { return [] }
            return this.models.filter(item => {
                return item[this.model_prop] && item[this.model_prop].toLowerCase().includes(input.toLowerCase())
            })
        },
		getResultValue(item) {
			return item[this.model_prop]
		},
		setSelected(value) {
			// let input = document.getElementById(this.id).getElementsByClassName('autocomplete-input')[0]
			let input = this.$refs[this.placeholder]
			if (value) {
				// let item = this.models.find(model => {
				// 	return model.id == value.id
				// })
				// this.$emit('setSelected', {is_list: false, selected: item})
				this.$emit('setSelected', {is_list: false, selected: value})
			} else {
				if (this.select_empty) { 
					this.$emit('setSelected', {is_empty: true, selected: input.value})
				} else {
					let items = this.search(input.value, true)
					this.$emit('setSelected', {is_list: true, selected: items})
				}
			}
			// input.value = ''
		}
	}
}
</script>
<style lang="sass">
.select-component
	width: 50%
	.autocomplete-input
		width: 100%
.width-100
	width: 100%
</style>