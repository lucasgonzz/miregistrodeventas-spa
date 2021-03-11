<template>
	<b-row>
		<b-col
		cols="12">
			<b-card
			no-body
			header="Preguntas por responder">
				<ul 
				class="card-questions-body" 
				v-show="!loading && questions.length">
					<li
					v-for="question in questions"
					:key="question.id">
						<b-card
						@click="answer(question)"
						class="question"
						no-body>
							<div
							class="question-body">
								<p
								class="buyer-name">
									<strong>{{ buyerName(question) }}</strong> te hizo una pregunta
								</p>
								<p class="since">
									{{ since(question.created_at) }}
								</p>
							</div>
						</b-card>
					</li>
				</ul>
				<p
				v-show="questions.length == 0 && !loading"
				class="no-questions text-success">
					<i class="icon-check icon"></i>
					No hay preguntas por responder
				</p>
				<cargando
				size="sm"
				:is_loading="loading"></cargando>
			</b-card>
		</b-col>
	</b-row>
</template>
<script>
import Cargando from '@/components/common/Cargando'
import online from '@/mixins/online'
export default {
	components: {
		Cargando,
	},
	mixins: [online],
	data() {
		return {
			loading: false
		}
	},
	computed: {
		questions() {
			return this.$store.state.online.questions
		}
	},
	methods: {
		answer(question) {
			this.$emit('answer', question)
		},
	},
}
</script>
<style scoped lang="sass">
.card-questions-body
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