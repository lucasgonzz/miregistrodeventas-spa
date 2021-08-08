<template> 
	<b-card 
	@click="articleSelected()"
	class="article-card apretable border-radius-2"
	no-body>
		<div class="img-container">
			<img :src="articleImageUrl(article)">
		</div>
		<div
		class="card-article-body">
			<div 
			class="name-heart">
				<p class="product-name">
					{{ article.name }}
				</p>
			</div>
			</p>
			<p class="product-price">
				{{ price(article.price) }}
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
	methods: {
		articleSelected() {
			this.$emit('articleSelected', this.article)
		}
	}
}
</script>