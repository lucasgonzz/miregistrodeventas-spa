<template>
	<div 
	class="p-15"
	v-if="selected_articles.length">
		<b-button
		block 
		v-b-modal="'create-combo'"
		variant="primary">
			<i class="icon-plus"></i>
			Nuevo combo con los {{ selected_articles.length }} artículos seleccionados
		</b-button>
	</div>
</template>
<script>
import combos from '@/mixins/combos'
export default {
	mixins: [combos],
}
</script>