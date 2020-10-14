<template>
	<b-nav tabs>
		<b-nav-item 
		@click="setView('images')"
		:active="active('images')">Fotos</b-nav-item>
		<b-nav-item
		@click="setView('add-image')"
		:active="active('add-image')">Agregar foto</b-nav-item>
	</b-nav>
</template>
<script>
export default {
	props: ['view'],
	methods: {
		setView(view) {
			this.$emit('setView', view)
		},
		active(view) {
			if (this.view == view) {
				return true
			}
			return false
		}
	},
	computed: {
	}
}
</script>