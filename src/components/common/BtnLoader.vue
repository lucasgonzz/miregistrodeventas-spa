<template>
	<span>
		<span 
		v-show="(loader == true && !index) || index == loader"
		class="spinner-border spinner-border-sm"></span>
		<span v-show="(loader == false || (index && loader != index)) && icon != ''">
			<i :class="'icon-'+icon"></i>
		</span>
		<span v-show="(loader == false || (index && loader != index)) && text != ''">
			{{ text }}
		</span>
	</span>
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
	}
}
</script>
<style scoped lang="sass">
.spinner-border
	margin-bottom: .2em
	margin-right: .1em
</style>