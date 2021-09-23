<template>
	<div>
		<div 
		v-for="description in article.descriptions"
		class="description shadow-1 b-r-1">
			<p class="title">
				{{ description.title }}
			</p>
			<p class="m-b-0">
				{{ description.content }}
			</p>
		</div>
	</div>
</template>
<script>
export default {
	props: ['article'],
}
</script>
<style lang="sass">
.description
	padding: 1em
	margin-bottom: 1em
</style>