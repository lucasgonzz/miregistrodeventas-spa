<template>
	<b-button
	@click="clicked"
	:block="block"
	:variant="variant">
		<span 
		v-show="(loader == true && !index) || index == loader"
		class="spinner-border spinner-border-sm"></span>
		<span v-show="(loader == false || (index && loader != index)) && icon != ''">
			<i :class="'icon-'+icon"></i>
		</span>
		<span v-show="(loader == false || (index && loader != index)) && text != ''">
			{{ text }}
		</span>
	</b-button>
</template>
<script>
export default {
	props: {
		loader: {
			default: null,
		},
		text: {
			default: null,
		},
		icon: {
			default: null,
		},
		index: {
			default: null,
		},
		variant: {
			type: String,
			default: 'primary',
		},
		block: {
			type: Boolean,
			default: true,
		}
	},
	methods: {
		clicked() {
			this.$emit('clicked')
		}
	}
}
</script>
<style scoped lang="sass">
.spinner-border
	margin-right: .1em
</style>