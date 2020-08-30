<template>
	<b-card
	no-body
	header="Preguntas">
		<div v-show="!loading && questions.length">
			<article-question
			@answer="answer"
			:question="question"
			v-for="question in questions"
			:key="question.id"></article-question>
		</div>
		<p
		v-show="questions.length == 0 && !loading"
		class="no-questions text-success">
			<i class="icon-check icon"></i>
			No hay preguntas por responder
		</p>
		<cargando
		:is_loading="loading"></cargando>
	</b-card>
</template>
<script>
import ArticleQuestion from '@/components/online/components/ArticleQuestion'
import Cargando from '@/components/common/Cargando'
export default {
	components: {
		ArticleQuestion,
		Cargando,
	},
	data() {
		return {
			questions: [],
			loading: false
		}
	},
	methods: {
		answer(question) {
			this.$emit('answer', question)
		},
		getQuestions() {
			this.loading = true
			this.$api.get('/questions')
			.then(res => {
				this.loading = false
				console.log(res)
				this.questions = res.data.questions
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		}
	},
	created() {
		this.getQuestions()
	}
}
</script>
<style scoped lang="sass">
.no-questions
	text-align: center
	font-size: 1.2em
	margin: 1em 0
	.icon 
		display: block
		font-size: 3em
</style>