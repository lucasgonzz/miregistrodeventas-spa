<template>
	<b-row>
		<b-col>
			<h2
			class="title">
				Sistema de <strong>administracion y contabilidad</strong> online
			</h2>
			<iframe class="s" :width="width" :height="height" src="https://www.youtube.com/embed/VkRrJdGJWyQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</b-col>
	</b-row>
</template>
<script>
import home from '@/mixins/home'
export default {
	mixins: [home],
}
</script>