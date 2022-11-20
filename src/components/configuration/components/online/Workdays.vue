<template>
	<div
	v-if="sub_view == 'horarios'">
	    <confirm
	    :text="text_delete"
	    :actions="['schedules/delete']"
	    id="delete-schedule"
	    toast="Horario eliminado"></confirm>
		<b-card
		class="shadow b-r-1 m-b-25"
		title="Horarios del comerico">
			<ul class="horizontal-ul">
				<li
				v-for="workday in workdays"
				:key="workday.id">
					<b-card
					class="workday shadow-2 b-r-1 c-p apretable"
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
	</div>
</template>
<script>
import Confirm from '@/components/common/Confirm'
export default {
	components: {
		Confirm,
	},
	computed: {
		workdays() {
			return this.$store.state.workdays.workdays
		},
		delete() {
			return this.$store.state.schedules.delete 
		},
		text_delete() {
			if (this.delete) {
				return '¿Seguro que quiere eliminiar el horario '+this.delete.name+'?'
			}
			return ''
		},
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