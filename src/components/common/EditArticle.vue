<template>
<b-modal 
id="edit-article" 
:title="title" 
hide-footer 
size="lg">
	<div>
		<b-form-row>
			<b-col
			v-if="has_online && article.images && article.images.length"
			cols="12">
				<img 
				@click="showImages(article)"
				class="article-image b-r-1"
				:src="image(article)">
			</b-col>
			<b-col
			v-if="has_online"
			cols="12">
				<b-form-group>
					<b-button
					variant="primary"
					block
					@click="uploadImage('article', article)">
						Agregar foto
					</b-button>
				</b-form-group>
			</b-col>
			<b-col
			cols="12"
			md="6">
				<b-form-group
				label="Creado"
				label-for="creado">
					<b-form-input
					id="creado"
					type="text"
					v-model="article.creado"
					disabled></b-form-input>
				</b-form-group>
			</b-col>
			<b-col
			cols="12"
			md="6">
				<b-form-group
				label="Actualizado"
				label-for="actualizado">
					<b-form-input
					id="actualizado"
					type="text"
					v-model="article.actualizado"
					disabled></b-form-input>
				</b-form-group>
			</b-col>
			<b-col
			cols="12">

				<barcode-name
				:article="article"></barcode-name>

				<cost-price 
				@saveArticle="updateArticle"
				:article="article"></cost-price>

				<stock-provider 
				:show_checkboxs="true"
				:article="article"></stock-provider>

				<category-subcategory 
				:article="article"></category-subcategory>

				<hr>

				<iva
				:article="article"></iva>
				
				<discounts
				:article="article"></discounts>
				
				<tags
				:article="article"></tags>
				
				<brand
				:article="article"></brand>
				
				<sizes
				:article="article"></sizes>
				
				<colors
				:article="article"></colors>
					
				<description
				:article="article"></description>
				
				<condition
				:article="article"></condition>
				
			</b-col>
			
			<b-col
			cols="12">
				<b-form-group
				class="m-b-0">
					<b-button
					block
					variant="primary"
					@click="updateArticle">
						<btn-loader
						:loader="loading"
						text="Actualizar"></btn-loader>
					</b-button>
				</b-form-group>	
			</b-col>
		</b-form-row>
	</div>
</b-modal>
</template>
<script>
import BarcodeName from '@/components/ingresar/components/barcode-name/Index'
import CostPrice from '@/components/ingresar/components/cost-price/Index'
import StockProvider from '@/components/ingresar/components/provider-stock/Index'
import CategorySubcategory from '@/components/ingresar/components/category-subcategory/Index'
import Tags from '@/components/ingresar/components/Tags'
import Brand from '@/components/ingresar/components/Brand'
import Iva from '@/components/ingresar/components/Iva'
import Discounts from '@/components/ingresar/components/Discounts.vue'
import Descriptions from '@/components/common/Descriptions'
import Sizes from '@/components/ingresar/components/Sizes.vue'
import Colors from '@/components/ingresar/components/Colors.vue'
import Description from '@/components/ingresar/components/Description'
import Condition from '@/components/ingresar/components/Condition.vue'
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'EditArticle',
	components: {
		BarcodeName,
		CostPrice,
		StockProvider,
		CategorySubcategory,
		Tags,
		Brand,
		Iva,
		Discounts,
		Descriptions,
		Sizes,
		Colors,
		Description,
		Condition,
		BtnLoader,
	},
	data() {
		return {
			loading: false,
		}
	},
	computed: {
		article() {
			return this.$store.state.article.model
		},
		title() {
			let title = 'Editar '+this.article.name 
			if (this.article.num) {
				title += ' | N° '+this.article.num 
			}
			return title
		},
	},
	methods: {
		showImages(article) {
			this.$store.commit('articles/setImagesToShow', article)
			this.$bvModal.show('article-images')
		},
		updateArticle() {
			if (this.check()) {
				this.loading = true
				this.$api.put('/article', this.article)
				.then(res => {
					console.log(res.data.model)
					this.loading = false
					this.$store.commit('article/add', res.data.model)
					this.$toast.success('Articulo actualizado')
					this.$bvModal.hide('edit-article')
					this.$bvModal.hide('articles-stock-min')
					this.$bvModal.hide('articles-stock-0')
					let input = document.getElementById('article-bar-code')
					input.value = ''
					input.focus()
				})
				.catch(err => {
					this.loading = false
					this.$toast.error('Error al actualizar articulo, intentelo mas tarde')
					console.log(err)
				})
			}
		},
		check() {
			var ok = true
			if (this.article.price == '' && this.article.percentage_gain == '') {
				ok = false
				this.$toast.error('No puede dejar el precio vacio')
				document.getElementById("article-price").focus()
				return ok
			}
			// if (this.article.cost == '') {
			// 	ok = false
			// 	this.$toast.error('No puede dejar el costo vacio')
			// 	document.getElementById("article-cost").focus()
			// 	return ok
			// }
			if (this.article.name == '') {
				ok = false
				this.$toast.error('No puede dejar el nombre vacio')
				document.getElementById("article-name").focus()
				return ok
			}
			return ok
		},
		createBarCode() {
			window.open('codigos-de-barra')
		},
	}
}
</script>
<style scoped lang="sass">
[class^='col-']
	flex-direction: column
	justify-content: flex-start
	@media screen and (min-width: 768px)
		padding-right: 1em
		padding-left: 1em
		margin-bottom: 1em
.container-fluid 
	margin: 0

.article-image
	width: 100%
	max-width: 500px
	margin: auto
hr 
	border: .1px solid rgba(0, 0, 0, .1) !important
	width: 100%
	margin-top: 0
</style>