<template>
	<b-form-row
	v-if="has_online">
		<b-form-group
		label="Marca"
		label-for="article-brand">
			<b-form-select
			id="article-brand"
			v-model="article.brand_id"
			:options="brands_options"></b-form-select>
		</b-form-group>
	</b-form-row>
</template>
<script>
import brands from '@/mixins/brands'
export default {
	name: 'Brands',
	mixins: [brands],
	props: ['article'],
}
</script>