<template>
	<b-form-row
	v-if="can('brands')">
		<b-col>
			<p
			class="c-p"
			@click="show ? show = false : show = true">
				Marca
				<icon-show
				:show="show"></icon-show>
			</p>
			<b-form-select
			v-show="show"
			class="m-b-15"
			id="article-brand"
			v-model="article.brand_id"
			:options="brands_options"></b-form-select>
		</b-col>
	</b-form-row>
</template>
<script>
import brands from '@/mixins/brands'
import IconShow from '@/components/common/IconShow'
export default {
	name: 'Brands',
	components: {
		IconShow,
	},
	mixins: [brands],
	props: ['article'],
	data() {
		return {
			show: false
		}
	}
}
</script>