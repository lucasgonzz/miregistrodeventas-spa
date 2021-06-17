<template>
<b-modal id="article-variants" :title="title" size="lg">
	<div class="cont-cards">
		<b-card
		class="card-article-variant shadow-2 border-radius"
		no-body
		v-for="variant in variants"
		:key="variant.id"
		:img-src="imageCropedUrlfromImage(variant)">
			<div class="p-10">
				<b-form-group
				label="Descripcion">
					<b-form-input
					placeholder="Descripcion"
					@keyup.enter="save"
					v-model="variant.description"></b-form-input>
				</b-form-group>
				<b-form-group
				label="Stock">
					<b-form-input
					placeholder="Stock"
					type="number"
					min="0"
					@keyup.enter="save"
					v-model="variant.stock"></b-form-input>
				</b-form-group>
				<b-form-group
				label="Cantidad para agregar">
					<b-form-input
					placeholder="Cantidad para agregar"
					type="number"
					min="0"
					@keyup.enter="save"
					v-model="variant.stock_to_add"></b-form-input>
				</b-form-group>
			</div>
		</b-card>
	</div>
	<template #modal-footer>
		<b-button
		@click="save"
		variant="primary">
			<btn-loader
			:text="'Listo'"
			:loader="loading"></btn-loader>
		</b-button>
	</template>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader,
	},
	data() {
		return {
			variants: [],
			loading: false,
		}
	},
	computed: {
		title() {
			return 'Modelos de ' + this.article.name
		},
		article() {
			return this.$store.state.articles.images_to_show
		},
	},
	created() {
		console.log('created')
	},
	watch: {
		article() {
			console.log('wathc')
			this.setVariants()
		}
	},
 	methods: {
		setVariants() {
			if (this.article.variants.length) {
				console.log('tiene variants')
				if (this.article.images.length > this.article.variants.length) {
					for (var i = this.article.images.length - 1; i >= this.article.variants.length - 1; i--) {
						this.article.variants.push({
							description: '',
							stock: '',
							url: this.article.images[i].url,
						})
					}
				}
				this.variants = this.article.variants
			} else {
				console.log('no tiene variants')
				let variants = []
				this.article.images.forEach((image, index) => {
					variants.push({
						description: '',
						stock: '',
						url: this.article.images[index].url,
					})
				})
				this.variants = variants
				console.log(this.variants)
			}
		},
		save() {
			if (this.check()) {
				this.loading = true
				this.$api.post('/articles/variants/'+this.article.id, {
					variants: this.variants
				})
				.then(res => {
					this.loading = false
					this.$store.commit('articles/update', res.data.article)
					this.$toast.success('Artículo actualizado')
					this.$bvModal.hide('article-variants')
					this.$bvModal.hide('article-images')
				})
				.catch(err => {
					console.log(err)
					this.loading = false
				})
			}
		},
		check() {
			let ok = true
			this.variants.forEach(variant => {
				if (variant.description == '') {
					this.$toast.error('Ingrese la descripcion')
					ok = false
				}
				if (variant.stock == '') {
					this.$toast.error('Ingrese el stock')
					ok = false
				}
			})	
			return ok
		}
	}
}
</script>