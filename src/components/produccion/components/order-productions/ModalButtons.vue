<template>
	<div>
		<b-button
		block
		@click="print"
		variant="outline-danger">
			<i class="icon-print"></i>
			Imprimir
		</b-button>
		<b-button
		block
		@click="printTickets"
		variant="outline-primary">
			<i class="icon-print"></i>
			Imprimir etiquetas
		</b-button>
		<b-button
		v-if="is_finished"
		block
		@click="printTickets"
		variant="primary">
			<i class="icon-check"></i>
			Entregar orden de produccion
		</b-button>
		<hr>
	</div>
</template>
<script>
export default {
	computed: {
		model_name() {
			return 'order_production'
		},
		model() {
			return this.$store.state[this.model_name].model
		},
		is_finished() {
			let statuses = this.modelsStoreFromName('order_production_status').filter(status => {
				return status.position
			})
			let last_status = statuses[statuses.length-1]
			console.log('ulitmo estado: '+last_status.name)
			let is_finished = true 
			this.model.articles.forEach(article => {
				if (Number(article.pivot['order_production_status_'+last_status.id]) != Number(article.pivot.amount)) {
					console.log('No entro con '+article.name+', tiene '+article.pivot['order_production_status_'+last_status.id])
					is_finished = false 
					console.log('tiene que tener: '+article.pivot.amount)
				} 
			})
			return is_finished
		}
	},
	methods: {
		print() {
            var link = process.env.VUE_APP_API_URL+'/order-productions/print-pdf/'+this.model.id
            window.open(link)
		},
		printTickets() {
			let link = process.env.VUE_APP_API_URL+'/order-productions/articles-pdf/'+this.model.id
			window.open(link)
		}
	}
}
</script>