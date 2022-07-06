<template>
	<div>
		<articles-table
		v-if="!is_mobile"
		:articles="articles"
		:loading="loading"></articles-table>
		<articles-cards
		v-else
		:articles="articles"
		:loading="loading"></articles-cards>
	</div>
</template>
<script>
import ArticlesTable from '@/components/listado/components/articles-list/ArticlesTable'
import ArticlesCards from '@/components/listado/components/articles-list/cards/Index'
export default {
	props: {
		articles: {
			type: Array,
		},
		loading: {
			type: Boolean,
			default: false,
		}
	},
	components: {
		ArticlesTable,
		ArticlesCards,
	}
}
</script>