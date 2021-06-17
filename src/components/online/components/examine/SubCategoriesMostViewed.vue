<template>
	<b-card
	no-body
	header="Categorias mas vistas">
		<ul
		v-if="loading" 
		class="horizontal-ul">
			<li
			v-for="i in 3"
			:key="i+'0'">
				<b-card
				class="order">
					<b-skeleton width="100%"></b-skeleton>
					<b-skeleton width="100%"></b-skeleton>
				</b-card>
			</li>
		</ul>
		<ul 
		v-else
		class="horizontal-ul">
			<li
			v-for="sub_category in sub_categories"
			:key="sub_category.id">
				<sub-category-card
				:sub_category="sub_category"></sub-category-card>
			</li>
		</ul>
	</b-card>
</template>
<script>
import SubCategoryCard from '@/components/online/components/examine/SubCategoryCard'
export default {
	components: {
		SubCategoryCard,
	},
	computed: {
		sub_categories() {
			return this.$store.state.online.examine.sub_categories_most_viewed
		},
		loading() {
			return this.$store.state.online.examine.loading_sub_categories_most_viewed
		},
	},
	methods: {
	},
}
</script>