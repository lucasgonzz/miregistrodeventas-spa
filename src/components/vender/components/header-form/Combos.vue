<template>
	<b-col
	v-if="hasExtencion('combos')"
	cols="12"
	lg="3">
		<select-component
		:id="id"
		:model="combo"
		:models="combos"
		prop_name="name"
		placeholder="Buscar un combo"
		:props_to_show="['price']"
		@setSelected="setSelectedCombo"></select-component>
	</b-col>
</template>
<script>
import Vue from 'vue'
import SelectComponent from '@/components/common/select/Index'
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
			combo: {
				name: '',
			},
		}
	},
	methods: {
		setSelectedCombo(result) {
			let combo = {
				...result,
				is_combo: true,
				amount: 1,
			}
			console.log(combo)
			this.$store.commit('vender/addItem', combo)
			this.combo = {
				name: '',
			}
			
		},
	}
}
</script>