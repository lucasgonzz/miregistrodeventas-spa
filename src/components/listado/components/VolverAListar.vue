<template>
	<b-row v-show="is_filter || searched">
		<b-col>
			<b-button
			variant="primary"
			class="float-right"
			@click="volverAListar">
				<i class="icon-undo"></i>
				Volver a listar todos mis artículos
			</b-button>
		</b-col>
	</b-row>
</template>
<script>
export default {
	props: ['searched', 'is_filter'],
	methods: {
		volverAListar() {
			this.$emit('volverAListar')
		}
	}
}
</script>
<style scoped>
.row {
	margin-bottom: 15px;
}
.col {
	padding: 0 15px;
}
</style>