<template>
	<div class="j-md-end j-lg-end j-center">
		<button class="btn btn-primary m-l-5 btn-sm-only-sm" 
				v-show="showing_statistics || is_from_date || is_from_only_one_date" 
				@click="today">
			<i class="icon-undo"></i>
			Volver
		</button>
		<button v-if="!hasPermissionTo('sale.index.only_day', user, true)"
		class="btn btn-primary m-l-5 btn-sm-only-sm" 
		v-b-modal="'from-date'">
			<i class="icon-calendar"></i>
			Por fecha
		</button>
	</div>
</template>
<script>
export default {
	props: ['user', 'is_from_date', 'is_from_only_one_date', 'showing_statistics'],
	methods: {
		today() {
			this.$emit('today')
		},
	},
}
</script>