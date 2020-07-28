<template>
<b-modal id="print-tickets" title="Imprimir tickets">
	<b-container fluid>
		<b-row>
			<b-col cols="12">
				<h5>{{ message }}</h5>
			</b-col>
			<b-col cols="12">
				<b-form-checkbox
				v-model="show_company_name"
				:value="1"
				:unchecked-value="0">
					Mostrar nombre del negocio
				</b-form-checkbox>
			</b-col>
		</b-row>
	</b-container>
	<template v-slot:modal-footer>
		<b-button
		variant="primary"
		@click="printTickets">
			Imprimir tickets
		</b-button>
	</template>
</b-modal>
</template>
<script>
export default {
	props: ['selected_articles'],
	data() {
		return {
			show_company_name: 1,
		}
	},
	computed: {
		message() {
			if (this.selected_articles.selected_articles.length == 1) {
				return 'Se van a imprimir 1 ticket'
			} else {
				return `Se van a imprimir ${ this.selected_articles.selected_articles.length } tickets`
			}
		}
	},
	methods: {
		printTickets() {
			var link = process.env.VUE_APP_API_URL + '/imprimir-precios/'
						+this.selected_articles.selected_articles.join('-')+'/'
						+this.show_company_name
			window.open(link)
		}
	}
}
</script>