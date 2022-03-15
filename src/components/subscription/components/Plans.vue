<template>
	<b-row
	v-if="view == 'plan'">
		<b-col
		lg="10">
			<h1 
			class="title">
				Elegí tu Plan
			</h1>
			<div 
			class="cont-models">
				<plan
				v-for="plan in plans"
				:key="plan.id"
				:plan="plan"
				@setSelected="setSelected"></plan>	
			</div>
		</b-col>
		<b-col
		lg="4">
			<b-button
			block 
			variant="primary"
			@click="next">
				<i class="icon-right"></i>
				Siguiente
			</b-button>
		</b-col>
	</b-row>
</template>
<script>
import Plan from '@/components/home/components/Plan'
import plans from '@/mixins/plans'
export default {
	mixins: [plans],
	components: {
		Plan,
	},
	created() {
		if (this.view == 'plan') {
			this.$store.commit('plans/setSelected', this.user.plan)
		}
	},
	methods: {
		next() {
			this.$router.push({ name: 'Subscription', params: {view: 'pago'} })
			this.$scrollToTop()
		},
		setSelected(plan){
			this.$store.commit('plans/setSelected', plan)
		}
	}
}
</script>