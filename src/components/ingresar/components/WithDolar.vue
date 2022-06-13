<template>
	<b-form-group
	v-if="can('articles.with_dolar')">
		<b-form-checkbox
		:value="1"
		:unchecked-value="0"
		v-model="article.with_dolar">
			Precio en dolares
		</b-form-checkbox>
	</b-form-group>
</template>
<script>
export default {
	props: ['article'],
}
</script>