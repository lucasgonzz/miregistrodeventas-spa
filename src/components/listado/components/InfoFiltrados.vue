<template>
<b-row v-show="is_filter">
	<b-col class="j-start">
		<strong>{{ articlesLength }} artículos filtrados</strong>
	</b-col>
</b-row>
</template>
<script>
export default {
	props: ['filtro', 'is_filter', 'providers', 'articlesLength']
}
</script>