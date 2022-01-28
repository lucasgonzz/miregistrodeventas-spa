<template>
<b-modal id="is-marker" :title="`${this.article.name} ya es un marcador`">
	<p>
		{{ article.name }} ya esta en la lista de marcadores, quiere eliminarlo?
	</p>
	<template v-slot:modal-footer>
		<b-button
		@click="deleteMarker"
		variant="danger"> 
			<i class="icon-trash" v-show="!deleting_marker"></i>
			<span v-show="deleting_marker"
					class="spinner-border spinner-border-sm"></span>
			Eliminar marcador
		</b-button>
	</template>
</b-modal>
</template>
<script>
export default {
	props: ['article', 'deleting_marker'],
	methods: {
		deleteMarker() {
			this.$emit('deleteMarker', this.article.marker.id)
		},
	},
}
</script>