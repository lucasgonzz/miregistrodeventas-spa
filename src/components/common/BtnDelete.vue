<template>
	<b-button
	v-if="model.id"
	block
	variant="danger"
	@click="callDelete">
		Eliminar
	</b-button>
</template>
<script>
export default {
	props: ['model_name', 'model', 'modal'],
	methods: {
		callDelete() {
			this.$store.commit(this.model_name+'/setDelete', this.model)
			this.$bvModal.show(this.modal)
			this.$bvModal.hide(this.model_name)
		}
	}
}
</script>