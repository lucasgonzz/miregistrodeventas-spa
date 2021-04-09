<template>
	<b-card
	no-body>
		<template
		v-slot:header>
			<div>
				Categorias mas vistas
				<b-form-select
				class="select-examine"
				v-model="weeks_ago"
				:options="options"></b-form-select>
			</div>
			<b-button
			@click="getCategories"
			size="sm">
				Actualizar
			</b-button>
		</template>
		<ul class="horizontal-menu" v-show="!loading">
			<li
			v-for="category in categories"
			:key="category.id">
				<category-card
				:category="category"></category-card>
			</li>
		</ul>
		<cargando
		size="sm"
		:is_loading="loading"></cargando>
	</b-card>
</template>
<script>
import Cargando from '@/components/common/Cargando'
import CategoryCard from '@/components/online/components/examine/CategoryCard'
import online from '@/mixins/online'
import arrayShort from 'array-sort'
export default {
	components: {
		Cargando,
		CategoryCard,
	},
	mixins: [online],
	data() {
		return {
			loading: false,
			categories: [],
			weeks_ago: 1,
		}
	},
	watch: {
		weeks_ago() {
			this.getCategories()
		}
	},
	computed: {
		options() {
			let options = []
			options.push({text: 'De los ultimos 7 días', value:1})
			options.push({text: 'De los ultimos 14 días', value:2})
			options.push({text: 'Del ultimo mes', value:4})
			return options
		}
	},
	methods: {
		getCategories() {
			this.loading = true
			this.$api.get(`/online/categories/most-view/${this.weeks_ago}`)
			.then(res => {
				this.loading = false
				console.log(res)
				this.categories = res.data.categories
				this.orderByViews()
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		},
		orderByViews() {
			this.categories.forEach(category => {
				category.views_count = 0
				category.views.forEach(view => {
					category.views_count++
				})
			})
			arrayShort(this.categories, 'views_count', {reverse: true})
		}
	},
	created() {
		// this.getCategories()
	}
}
</script>
<style scoped lang="sass">

.question
	cursor: pointer
	border: none
	-webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75)
	-moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75)
	box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75)	
	&:hover
		-webkit-box-shadow: 0px 0px 7px 0px rgba(0,0,0,1)
		-moz-box-shadow: 0px 0px 7px 0px rgba(0,0,0,1)
		box-shadow: 0px 0px 7px 0px rgba(0,0,0,1)	
	.question-body
		padding: 1em
		button 
			margin-top: .5em
		.buyer-name 
			text-align: center
			margin-bottom: .5em
		.total
			text-align: center
			margin-bottom: 0
			font-weight: bold
		.since 
			margin-top: .5em
			margin-bottom: 0
			font-size: .7em
			text-align: right
			color: rgba(0,0,0,.5)
.no-questions
	text-align: center
	font-size: 1.2em
	margin: 1em 0
	.icon 
		display: block
		font-size: 3em
</style>