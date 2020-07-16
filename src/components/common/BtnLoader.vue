<template>
	<div class="d-inline-block">
		<i :class="`icon-${this.icon}`" v-show="!loading"></i>
		<span class="spinner-border spinner-border-sm" v-show="loading"></span>
	</div>
</template>
<script>
export default {
	props: {
		loading: {
			type: Boolean
		},
		icon: {
			type: String,
			default: 'check'
		}
	}
}
</script>