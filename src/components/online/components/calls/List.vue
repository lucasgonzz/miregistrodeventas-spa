<template>
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
	<div 
	v-else>
		<ul 
		v-if="calls.length"
		class="horizontal-ul">
			<li
			v-for="call in calls"
			:key="call.id">
				<call
				:call="call"></call>
			</li>
		</ul>
		<p
		v-else
		class="text-with-icon">
			<i class="icon-check"></i>
			No hay llamadas por realizar
		</p>
	</div>
</template>
<script>
import Call from '@/components/online/components/calls/Call'
export default {
	components: {
		Call,
	},
	computed: {
		calls() {
			return this.$store.state.online.calls.calls
		},
		loading() {
			return this.$store.state.online.calls.loading
		},
	}
}
</script>