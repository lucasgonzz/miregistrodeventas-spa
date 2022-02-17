<template>
	<i :class="icon_class"></i>
</template>
<script>
export default {
	props: ['show'],
	computed: {
		icon_class() {
			return this.show ? 'icon-up' : 'icon-down'
		}
	}
}
</script>