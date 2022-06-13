<template>
    <autocomplete 
    ref="articleName"
    :search="search" 
    @keydown.shift="callVender"
	:get-result-value="getResultValue"
    auto-select
    placeholder="Buscar un proveedor"
    @submit="setSelected"></autocomplete>
</template>
<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
export default {
	components : {
		Autocomplete,
	},
	computed: {
		models() {
			return this.$store.state.providers.models
		},
	},
	methods: {
        search(input) {
            if (input.length < 3) { return [] }
            return this.models.filter(item => {
                return item.name && item.name.toLowerCase().includes(input.toLowerCase())
            })
        },
		getResultValue(item) {
			return `${item.name}`
		},
		setSelected(item) {
			let input = document.getElementsByClassName('autocomplete-input')[0]
			if (item) {
				let item = this.models.find(model => {
					return model.id == item.id
				})
				this.$emit('setSelected', item)
			} else {
				this.$emit('setSelected', input.value)
			}
			input.value = ''
		}
	}
}
</script>