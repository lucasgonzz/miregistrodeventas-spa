<template> 
	<b-card 
	@click="articleSelected()"
	class="article-card apretable border-radius-2 shadow-2" 
	no-body>
		<div class="img-container">
			<img :src="article_image">
		</div>
		<div
		class="card-article-body">
			<div 
			class="name-heart">
				<p class="product-name">
					{{ article_name }}
				</p>
			</div>
			</p>
			<p class="product-price">
				{{ articlePrice(article) }}
			</p>
		</div>
	</b-card>
</template>
<script>
export default {
	name: 'ArticleCard',
	props: {
		article: Object,
	},
	computed: {
		article_image() {
			if (this.article.variant) {
				return this.imageCropedUrlFromVariant(this.article)
			} else {
				if (this.article.images.length) {
					return this.articleImageUrl(this.article)
				}
			}
		},
		article_name() {
			if (this.article.variant) {
				return this.article.name + ' ' + this.article.variant.description
			} else {
				return this.article.name
			}
		},
	},
	methods: {
		articleSelected() {
			this.$emit('articleSelected', this.article)
		}
	}
}
</script>