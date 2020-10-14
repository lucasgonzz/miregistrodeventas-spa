<template>
	<b-card>
		<div>
			<p class="category-name">
				{{ category.name }}
			</p>
			<p class="articles-count">
				{{ category.articles_count }} artículos
			</p>
			<p class="views">
				<i class="icon-eye"></i>
				{{ category.views_count }}
			</p>
		</div>
	</b-card>
</template>
<script>
export default {
	props: ['category'],
}
</script>
<style scoped lang="sass">
.card 
	p 
		text-align: center
		margin-bottom: 1em
		&:last-child
			margin-bottom: 0
	.category-name
		font-weight: bold
</style>