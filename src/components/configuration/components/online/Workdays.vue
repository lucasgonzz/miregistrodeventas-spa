<template>
	<b-card
	class="shadow-2 b-r-1 m-b-25"
	title="Horarios del comerico">
		<ul class="horizontal-ul">
			<li
			v-for="workday in workdays"
			:key="workday.id">
				<b-card
				class="workday shadow-1 b-r-1 c-p"
				@click="updateWorkday(workday)">
					<p
					class="text-center">
						<strong>
							{{ workday.name }}
						</strong>
					</p>
					<hr>
					<div
					v-if="workday.schedules.length">
						<p
						v-for="schedule in workday.schedules">
							{{ schedule.name }} de {{ schedule.from }} a {{ schedule.to }}
						</p>
					</div>
					<p
					class="text-with-icon"
					v-else>
						<i class="icon-not"></i>
						Cerrado
					</p>
				</b-card>
			</li>
		</ul>
	</b-card>
</template>
<script>
export default {
	computed: {
		workdays() {
			return this.$store.state.workdays.workdays
		}
	},
	methods: {
		updateWorkday(workday) {
			this.$store.commit('workdays/setSelected', workday)
			this.$bvModal.show('schedules')
		}
	}
}
</script>
<style lang="sass">
.workday 
	width: 200px
</style>