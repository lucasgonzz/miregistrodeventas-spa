<template>
	<b-modal id="answer" title="Repsonder" v-if="question.buyer" hide-footer>
		<b-container>
			<b-row
			class="m-b-0">
				<b-col>
					<p>
						{{ question.buyer.name }} pregunto por {{ question.article.name }}
					</p>
					<div class="img-container">
						<img :src="articleImageUrl(question.article, false)" :alt="question.article.name">
					</div>
					<p>
						{{ question.text }}
					</p>
					<b-form-group>
						<b-form-textarea
						v-model="answer.text"
						:placeholder="`Repsonder a ${this.question.buyer.name}`"></b-form-textarea>
					</b-form-group>
					<b-button
					@click="sendAnswer"
					block
					variant="primary">
						<btn-loader
						text="Responder"
						:loader="loading">
						</btn-loader>
					</b-button>
					<b-button
					@click="deleteQuestion"
					block
					variant="danger">
						<btn-loader
						text="Eliminar pregunta"
						:loader="loading_delete">
						</btn-loader>
					</b-button>
				</b-col>
			</b-row>
		</b-container>
	</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	props: ['question'],
	components: {
		BtnLoader
	},
	data() {
		return {
			loading: false,
			loading_delete: false,
			answer: {text: ''}
		}
	},
	methods: {
		deleteQuestion() {
			this.loading_delete = true
			this.$api.delete(`/questions/${this.question.id}`)
			.then(() => {
				this.loading_delete = false
				this.$bvModal.hide('answer')
				this.$toast.success('Pregunta eliminada correctamente')
                this.$store.dispatch('online/questions/getQuestions')
			})
			.catch(err => {
				this.loading_delete = false
				console.log(err)
			})
		},
		sendAnswer() {
			this.loading = true
			this.$api.post('/answers', {
				text        : this.answer.text,
				question_id : this.question.id,
				buyer_id	: this.question.buyer_id
			})
			.then(() => {
				this.$toast.success('Respuesta enviada correctamente')
				this.$bvModal.hide('answer')
				this.answer.text = ''
				this.$store.dispatch('online/questions/getQuestions')
				this.loading = false
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		}
	}
}
</script>
<style scoped lang="sass">
.img-container
	width: 100%
	margin-bottom: 1em
	img
		max-width: 100%
</style>