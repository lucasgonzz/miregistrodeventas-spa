<template>
	<div>
		<div class="row" v-show="is_loading">
			<div class="col"
				:class="tam == 'md' ? 'md' : tam == 'sm' ? 'sm' : 'lg'">
				<div class="spinner">
					<div class="spinner-border text-primary" role="status">
						<span class="sr-only">Cargando...</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: ['is_loading', 'tam'],
}
</script>
<style scoped>
.row {
	display: flex;
	justify-content: center
}
.lg {
	padding: 200px 0;
}	
.md {
	padding: 100px 0;
}
.sm {
	padding: 50px 0;
}	
</style>
