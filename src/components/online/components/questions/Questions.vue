<template>
	<b-row>
		<b-col
		cols="12">
			<b-card
			no-body
			header="Preguntas por responder">
				<ul 
				v-if="loading"
				class="horizontal-ul">
					<li
					v-for="i in 3"
					:key="i">
						<b-card
						class="order">
							<b-skeleton width="100%"></b-skeleton>
							<b-skeleton width="100%"></b-skeleton>
						</b-card>
					</li>
				</ul>
				<ul 
				class="horizontal-ul" 
				v-else>
					<li
					v-for="question in questions"
					:key="question.id">
						<b-card
						@click="answer(question)"
						class="order"
						no-body>
							<div
							class="order-body">
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
				class="no-orders text-success">
					<i class="icon-check icon"></i>
					No hay preguntas por responder
				</p>
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
	computed: {
		questions() {
			return this.$store.state.online.questions.questions
		},
		loading() {
			return this.$store.state.online.questions.loading
		},
	},
	methods: {
		answer(question) {
			this.$store.commit('online/questions/setAnswer', question)
			this.$bvModal.show('answer')
		},
	},
}
</script>