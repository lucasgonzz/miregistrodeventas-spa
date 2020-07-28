<template>
<b-modal id="print-tickets" title="Imprimir tickets de los siguientes artículos"
		body-class="al-borde">
	<b-container>
		<div class="row">
			<div class="col">
				<ul class="list-group">
					<li class="list-group-item" v-for="article in articles" :key="article.id">
						{{ article.name }}
						<span class="float-right">
						<b-button 
						size="sm"
						variant="danger"
						@click="deleteArticle(article)">
							Quitar
						</b-button>
						</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<div class="custom-control custom-checkbox my-1 mr-sm-2">
					<input class="custom-control-input" 
					v-model="show_company_name" 
					true-value="1"
					false-value="0"
					type="checkbox" 
					id="show_company_name">
					<label class="custom-control-label" 
					for="show_company_name">
					Mostrar nombre del negocio
					</label>
				</div>
			</div>
		</div>
	</b-container>
	<template v-slot:modal-footer>
		<button class="btn btn-danger" @click="printTickets">
			<i class="icon-print"></i>
			Generar pdf
		</button>
	</template>
</b-modal>
</template>
<script>
export default {
	props: ['articles', 'articles_id'],
	data() {
		return {
			show_company_name: 1,
		}
	},
	methods: {
		printTickets() {
			var link = process.env.VUE_APP_API_URL+'/imprimir-precios/'
						+this.articles_id.join('-')+'/'
						+this.show_company_name
			window.open(link)
		},
		deleteArticle(article) {
			var i = this.articles.indexOf(article)
			this.articles.splice(i, 1)
			this.articles_id.splice(i, 1)
		}
	}
}
</script>