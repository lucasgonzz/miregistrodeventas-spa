<template>
	<b-modal id="answer" title="Repsonder" v-if="question.buyer">
		<b-container>
			<b-row
			class="m-b-0">
				<b-col>
					<p>
						Pregunta:
					</p>
					<p>
						{{ question.text }}
					</p>
					<b-form-group>
						<b-form-textarea
						v-model="answer.text"
						:placeholder="`Repsonder a ${this.question.buyer.name}`"></b-form-textarea>
					</b-form-group>
				</b-col>
			</b-row>
		</b-container>
		<template v-slot:modal-footer>
			<b-button
			@click="sendAnswer"
			block
			variant="primary">
				Responder
			</b-button>
		</template>
	</b-modal>
</template>
<script>
export default {
	props: ['question'],
	data() {
		return {
			loading: false,
			answer: {text: ''}
		}
	},
	methods: {
		sendAnswer() {
			this.loading = true
			this.$api.post('/answers', {
				text        : this.answer.text,
				question_id : this.question.id
			})
			.then(res => {
				console.log(res)
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