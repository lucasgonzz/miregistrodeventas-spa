<template>
	<b-row
	v-show="view == 'llamadas'">
		<b-col
		cols="12">
			<b-card
			no-body
			header="Llamadas">
				<list></list>
			</b-card>
		</b-col>
	</b-row>
</template>
<script>
import List from '@/components/online/components/calls/List'
import online from '@/mixins/online'
export default {
	mixins: [online],
	components: {
		List,
	},
}
</script>