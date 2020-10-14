<template>
	<div>
		<title-online></title-online>
		<b-row>
			<b-col
			cols="12">
				<b-button
				block
				variant="primary"
				v-b-modal="'title'">
					Titulo
				</b-button>
			</b-col>
		</b-row>
		<b-row>
			<b-col
			cols="12">
				<articles-most-view></articles-most-view>
			</b-col>
		</b-row>
		<b-row>
			<b-col
			cols="12">
				<categories-most-view></categories-most-view>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import TitleOnline from '@/components/online/modals/examine/Title'
import ArticlesMostView from '@/components/online/components/examine/ArticlesMostView'
import CategoriesMostView from '@/components/online/components/examine/CategoriesMostView'
export default {
	components: {
		TitleOnline,
		ArticlesMostView,
		CategoriesMostView,
	},
}
</script>
<style scoped lang="sass">
.card-examine-body
	width: 100%
	padding: .5em
	margin: 0
	overflow-x: scroll
	display: flex
	flex-direction: row
	flex-wrap: nowrap
	li 
		display: table
		padding: 0 .5em
		width: 200px
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