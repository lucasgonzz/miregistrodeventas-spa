<template>
	<div id="online">
		<answer
		:question="question"></answer>
		<views></views>
		<b-row>
			<b-col
			cols="12">
				<b-card
				header="Tienda Online">
					<b-container fluid>
						<nav-component
						:view="view"
						@setView="setView"></nav-component>
						<orders
						v-show="view == 'orders'"></orders>
						<questions
						v-show="view == 'questions'"
						ref="questions"
						@answer="answer"></questions>
						<examine
						v-show="view == 'examine'"
						ref="examine"></examine>
					</b-container>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import NavComponent from '@/components/online/components/NavComponent'
import Orders from '@/components/online/components/orders/Orders'
import Questions from '@/components/online/components/questions/Questions'
import Examine from '@/components/online/components/examine/Examine'
import Answer from '@/components/online/modals/Answer'
import Views from '@/components/online/modals/examine/Views'
export default {
	components: {
		NavComponent,
		Orders,
		Questions,
		Examine,
		Answer,
		Views,
	},
	data() {
		return {
			question: {},
			order: {},
			view: 'orders'
		}
	},
	computed: {
	},
	methods: {
		setView(view) {
			this.view = view
		},
		answer(question) {
			this.question = question
			console.log(question)
			this.$bvModal.show('answer')
		},
	}
}
</script>
<style scoped lang="sass">
.col-nav 
	justify-content: flex-start
	margin-bottom: 1em
.col-orders
	flex-wrap: wrap
	.card 
		&:first-child
			margin-bottom: 1em
		width: 100%
.col-questions
	max-height: 75vh
	overflow-y: auto
</style>