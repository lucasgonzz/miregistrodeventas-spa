<template>
	<b-col
	v-if="hasExtencion('combos')"
	cols="12"
	lg="4">
		<select-component
		full_width
		auto_select
		:id="id"
		@setSelected="setSelectedCombo"
		placeholder="Combo"
		model_prop="name"
		:bus="bus"
		:models="combos"></select-component>
	</b-col>
</template>
<script>
import Vue from 'vue'
import SelectComponent from '@/components/common/SelectComponent'
import vender from '@/mixins/vender'
export default {
	mixins: [vender],
	components : {
		SelectComponent,
	},
	computed: {
		combos() {
			return this.$store.state.combos.models
		},
		id() {
			return 'select-combo'
		},
	},
	data() {
		return {
			bus: new Vue()
		}
	},
	methods: {
		setSelectedCombo(result) {
			console.log(result)
			let combo = {
				...result.selected,
				amount: 1,
			}
			console.log(combo)
			this.$store.commit('vender/addCombo', combo)
			// console.log(document.getElementById(this.id).value)
			// setTimeout(() => {
			// 	document.getElementById(this.id).value = ''
			// 	console.log(document.getElementById(this.id).value)
			// }, 500)
			this.bus.$emit('clear')
		},
	}
}
</script>