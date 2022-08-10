<template>
	<b-dropdown 
	variant="primary"
	:text="sub_category.name" 
	class="m-10">
		<b-dropdown-item
		v-for="article in sub_category.articles"
		:key="article.id"
		@click="setArticleForSale(article)">
			{{ article.name }} | {{ price(article.price) }}
		</b-dropdown-item>
	</b-dropdown>
</template>
<script>
import vender from '@/mixins/vender'
export default {
	mixins: [vender],
	props: ['sub_category']
}
</script>