<template>
<b-modal id="add-marker" size="lg" :title="`Crear marcardor de ${this.article.name}`" scrollable>
	<b-container fluid>
		<b-row>
			<b-col>
				<b-card header="Grupos de marcadores" no-body>
					<b-card-body>
						<b-list-group v-if="marker_groups.length">
							<b-list-group-item
							v-for="marker_group in marker_groups"
							:key="marker_group.id">
								{{ marker_group.name }}
								({{ marker_group.markers.length }} artículos)
								<span class="float-right">
									<b-button 
									variant="danger"
									class="m-r-5"
									size="sm"
									@click="deleteMarkerGroup(marker_group)">
										<i class="icon-trash-3" v-show="deleting_marker_group != marker_group.id"></i>
										<span v-show="deleting_marker_group == 							marker_group.id"
												class="spinner-border spinner-border-sm"></span>
										Eliminar grupo de marcadores
									</b-button>
									<b-button 
									variant="primary"
									size="sm"
									@click="addMarkerToGroup(marker_group)">
										<i class="icon-check" v-show="saving_marker_in_marker_group != marker_group.id"></i>
										<span v-show="saving_marker_in_marker_group == 							marker_group.id"
												class="spinner-border spinner-border-sm"></span>
										Agregar a este grupo
									</b-button>
								</span>
							</b-list-group-item>
						</b-list-group>
						<p v-else>
							Todavia no hay ningun grupo de marcadores
						</p>
					</b-card-body>
				</b-card>
			</b-col>
		</b-row>

		<b-row>
			<b-col>
				<b-card header="Crear un nuevo grupo de marcadores" no-body>
					<b-card-body>
						<b-form-group
						label="Nombre para el nuevo grupo de marcadores"
						label-for="marker-group-name">
							<b-form-input
							type="text"
							placeholder="Ingrese el nombre para el nuevo grupo de marcadores"
							id="marker-group-name"
							v-model="marker_group.name"
							@keyup.enter="saveMarkerGroup"></b-form-input>
						</b-form-group>
					</b-card-body>
					<template v-slot:footer>
						<b-button
						variant="primary"
						@click="saveMarkerGroup">
							<i class="icon-check" v-show="!saving_marker_group"></i>
							<span v-show="saving_marker_group"
									class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
							Guardar
						</b-button>
					</template>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
	<template v-slot:modal-footer>
		<b-button 
		variant="primary"
		@click="addMarker">
			<i class="icon-check" v-show="!saving_marker"></i>
			<span v-show="saving_marker"
					class="spinner-border spinner-border-sm"></span>
			Agregar a marcadores
		</b-button>
	</template>
</b-modal>
</template>
<script>
export default {
	props: ['article', 'marker_groups', 'saving_marker_in_marker_group', 'deleting_marker_group'],
	data() {
		return {
			saving_marker: false,
			saving_marker_group: false,
			marker_group: {
				'name': ''
			}
		}
	},
	methods: {
		saveMarkerGroup() {
			this.saving_marker_group = true
			this.$api.post('marker-groups', {
				marker_group: this.marker_group
			})
			.then(() => {
				this.saving_marker_group = false
				this.$store.dispatch('markers/getMarkerGroups')
				this.$toast.success('Grupo de marcadores creado correctamente')
				this.marker_group.name = ''
			})
			.catch(err => {
				console.log(err)
			})
		},
		deleteMarkerGroup(marker_group) {
			this.$emit('deleteMarkerGroup', marker_group.id)
		},
		addMarkerToGroup(marker_group) {
			this.$emit('addMarkerToGroup', marker_group.id, this.article.id)
		},
		addMarker() {
			this.saving_marker = true
			this.$api.post('markers', {
				article_id: this.article.id
			})
			.then(() => {
				this.saving_marker = false
				this.$bvModal.hide('add-marker')
				this.$emit('updateArticlesList')
				this.$toast.success('Marcador creado correctamente')
				this.$store.dispatch('markers/getMarkers')
			})
			.catch(err => {
				console.log(err)
			})
		},
	},
}
</script>
<style scoped lang="sass">
.form-control-group-markers 
	display: inline-block
	width: 50%
.row 
	margin-bottom: 1rem
</style>