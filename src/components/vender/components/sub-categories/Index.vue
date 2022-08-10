<template>
	<b-row
	v-if="sub_categories.length">
		<b-col
		cols="12">
			<div class="sub-categories">
				<sub-category-btn
				v-for="sub_category in sub_categories"
				:key="sub_category.id"
				:sub_category="sub_category"></sub-category-btn>
			</div>
		</b-col>
	</b-row>
</template>
<script>
import SubCategoryBtn from '@/components/vender/components/sub-categories/SubCategoryBtn'
export default {
	components: {
		SubCategoryBtn,
	},
	computed: {
		sub_categories() {
			return this.$store.state.vender.sub_categories
		}
	}
}
</script>
<style lang="sass">
.sub-categories
	width: 100%
	display: flex
	flex-direction: row
	flex-wrap: wrap
	justify-content: start
</style>