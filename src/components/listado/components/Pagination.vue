<template>
<!-- <nav> -->
<div>
	<ul class="pagination m-b-0">
		<li v-if="pagination.current_page > 1" @click.prevent="changePage(pagination.current_page - 1)" class="page-item">
			<a href="" class="page-link">
				<span><i class="icon-back"></i></span>
			</a>
		</li>

		<li 
		v-for="(page, i) in pagesNumber" 
		:key="i"
		:class="page==pagination.current_page ? 'active' : ''" class="page-item">
			<a href="#" @click.prevent="changePage(page)" class="page-link">
				{{ page }}
			</a>
		</li>

		<li v-if="pagination.current_page < pagination.last_page" @click.prevent="changePage(pagination.current_page + 1)" class="page-item">
			<a href="" class="page-link">
				<span><i class="icon-next"></i></span>
			</a>
		</li>
	</ul>
	<!-- <cargando size="sm" :is_loading="is_loading"></cargando> -->
</div>
<!-- </nav> -->
</template>
<script>
// import Cargando from '../../common/Cargando'
export default {
	props: ['pagination', 'pagesNumber', 'is_filter', 'is_loading'],
	components: {
		// Cargando
	},
	computed: {
		current_page() {
			return this.$store.articles.pagination.current_page
		}
	},
	methods: {
		changePage(page) {
			this.$store.commit('articles/setPagination', page)
			let articles = this.articles.slice()
		}
	}
}
</script>
<style scoped>
.pagination {
	display: inline-block;
}

.page-item {
	display: inline-block;
}

.active-pagination {
    color: #fff;
    background-color: #007bff;
    border: none;
}
</style>