<template>
	<div>
		<b-button
		block
		@click="printTickets"
		variant="outline-primary">
			<i class="icon-print"></i>
			Imprimir etiquetas
		</b-button>
		<b-button
		v-if="is_finished && !model.finished"
		block
		@click="finish"
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
			let is_finished = false 
			let statuses = this.modelsStoreFromName('order_production_status')
			let last_status = statuses[statuses.length-1]
			if (this.model.id && last_status && this.model.order_production_status.id == last_status.id) {
				is_finished = true 
			}
			return is_finished




			// let is_finished = true 
			// if (this.model.finished) {
			// 	is_finished = false
			// }
			// let statuses = this.modelsStoreFromName('order_production_status').filter(status => {
			// 	return status.position
			// })
			// let last_status = statuses[statuses.length-1]
			// console.log('ulitmo estado: '+last_status.name)
			// this.model.articles.forEach(article => {
			// 	if (Number(article.pivot['order_production_status_'+last_status.id]) != Number(article.pivot.amount)) {
			// 		console.log('No entro con '+article.name+', tiene '+article.pivot['order_production_status_'+last_status.id])
			// 		is_finished = false 
			// 		console.log('tiene que tener: '+article.pivot.amount)
			// 	} 
			// })
			// return is_finished
			
			// let statuses = this.modelsStoreFromName('order_production_status').filter(status => {
			// 	return status.position
			// })
			// let is_finished = true 
			// let str_len = 'order_production_status_'.length
			// let last_id = 0
			// let current_status_id
			// let last_status
			// this.model.articles.forEach(article => {
			// 	console.log(article)
			// 	if (article.recipe) {
			// 		article.recipe.articles.forEach(article_recipe => {
			// 			current_status_id = article_recipe.pivot.order_production_status_id
			// 			if (current_status_id > last_id) {
			// 				last_id = current_status_id
			// 			}
			// 		})
			// 	}
			// 	console.log('ultimo estado de '+article.name+': '+last_id)
			// 	if (Number(article.pivot['order_production_status_'+last_id]) != Number(article.pivot.amount)) {
			// 		console.log('No entro con '+article.name+', tiene '+article.pivot['order_production_status_'+last_id])
			// 		is_finished = false 
			// 		console.log('tiene que tener: '+article.pivot.amount)
			// 	} 
			// })
			// return is_finished
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
		},
		finish() {
			if (this.model.client_id) {
				this.$bvModal.show('finish-order-production')
			} else {
				this.$bvModal.show('confirm-finish-order-production')
			}
		}
	}
}
</script>