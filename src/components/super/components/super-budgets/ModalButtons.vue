<template>
	<b-button
	block 
	@click="print"
	variant="outline-danger"
	v-if="model.id">
		PDF
	</b-button>
</template>
<script>
export default {
	props: {
		model: Object,
	},
	methods: {
		print() {
			let link = process.env.VUE_APP_API_URL+'/pdf/super-budget/'+this.model.id 
			window.open(link)
		}
	}
}
</script>