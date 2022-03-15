<template>
<b-row
v-if="view == 'suscripcion'">
	<b-col
	lg="8">
		<p
		class="title">
			Plan actual
		</p>
		<plan
		:plan="user.plan"></plan>
	</b-col>
	<b-col
	class="j-start m-b-15"
	lg="8">
		<b-button
		variant="primary"
		:to="{ name: 'Subscription', params: {view: 'plan'} }">
			Cambiar plan
		</b-button>
	</b-col>
	<b-col
	class="j-start"
	lg="8">
		<b-button
		variant="danger"
		:to="{ name: 'Subscription', params: {view: 'plan'} }">
			Dar de baja mi suscripcion
		</b-button>
	</b-col>
</b-row>
</template>
<script>
import Plan from '@/components/home/components/Plan'
import configuration from '@/mixins/configuration'
export default {
	mixins: [configuration],
	components: {
		Plan
	}
}
</script>