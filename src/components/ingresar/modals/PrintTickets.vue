<template>
<b-modal id="print-tickets" title="Imprimir tickets de los siguientes artículos"
		body-class="al-borde" hide-footer>
	<b-container>
		<b-row>
			<b-col
			cols="12">
				<b-form-group>
					<b-list-group>
						<b-list-group-item 
						v-for="article in articles" 
						:key="article.id">
							{{ article.name }}
							<span class="float-right">
							<b-button 
							size="sm"
							variant="danger"
							@click="deleteArticle(article)">
								<i class="icon-cancel"></i>
							</b-button>
							</span>
						</b-list-group-item>
					</b-list-group>
				</b-form-group>
				<b-form-group>
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
				</b-form-group>
				<b-form-group>
					<b-button 
					block
					variant="primary" 
					@click="printTickets">
						<i class="icon-print"></i>
						Generar pdf
					</b-button>
				</b-form-group>
			</b-col>
		</b-row>
	</b-container>
	<template v-slot:modal-footer>
	</template>
</b-modal>
</template>
<script>
import mixin from '@/mixins/ingresar'
export default {
	props: ['articles', 'articles_id'],
	data() {
		return {
			show_company_name: 1,
		}
	},
	mixins: [mixin],
	methods: {
		printTickets() {
			var link = process.env.VUE_APP_API_URL+'/imprimir-precios/'
						+this.getIds(this.articles)+'/'
						+this.show_company_name
			window.open(link)
		},
		deleteArticle(article) {
			var i = this.articles.indexOf(article)
			this.articles.splice(i, 1)
		}
	}
}
</script>
<style scoped lang="sass">
.col-12
	flex-direction: column
</style>