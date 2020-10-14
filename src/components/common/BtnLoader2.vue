<template>
	<span>
		<span 
		v-show="loader"
		class="spinner-border spinner-border-sm"></span>
		<span v-show="!loader">
			<slot></slot>
		</span>
	</span>
</template>
<script>
export default {
	props: ['loader']
}
</script>
<style scoped lang="sass">
.spinner-border
	margin-bottom: .2em
	margin-right: .1em
</style>