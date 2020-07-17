<template>
<div>
	<b-row>
		<b-col v-show="(markers.length || marker_groups.length) && !loading">
			<b-card no-body>
				<template v-slot:header>
					Marcadores
					<b-form-checkbox
					v-model="show_markers_prices">
						Mostrar precios
					</b-form-checkbox>
				</template>
				<div class="j-start p-10">
					<b-dropdown
					v-for="marker_group in marker_groups"
					:key="marker_group.id"
					:text="marker_group.name"
					class="m-t-0 m-r-5"
					size="sm">
						<b-dropdown-item
						v-for="marker in marker_group.markers"
						:key="marker.id"
						@click="addMarker(marker)">
							{{ marker.article.name }}
							<span v-show="show_markers_prices">
								{{ price(marker.article.price) }}
							</span>
						</b-dropdown-item>
					</b-dropdown>
					<b-button
					v-for="marker in markers"
					:key="'A'+marker.id"
					@click="addMarker(marker)"
					variant="primary"
					class="m-r-5"
					size="sm">
						{{ marker.article.name }}
						<span v-show="show_markers_prices">
							{{ price(marker.article.price) }}
						</span>
					</b-button>
				</div>
			</b-card>
		</b-col>
		<b-col v-show="loading">
			<span class="text-primary">
				<span class="spinner-border spinner-border-sm"></span>
				Cargando marcadores
			</span>
		</b-col>
	</b-row>
</div>
</template>
<script>
export default {
	props: ['article'],
	components: {
	},
	data() {
		return {
			show_markers_prices: true,
			loading: false
		}
	},
	methods: {
		addMarker(marker) {
			this.article.id = marker.article.id
			this.$emit('addArticle')
		},
		showMarkers() {
			if (this.show_markers) {
				this.show_markers = false
			} else {
				this.show_markers = true
			}
		},
	},
	computed: {
		markers() {
			return this.$store.state.markers.markers
		},
		marker_groups() {
			return this.$store.state.markers.marker_groups
		},
		markers_loaded() {
			return this.$store.state.markers.markers_loaded
		}
	},
	created() {
		if (!this.markers_loaded) {
			this.$store.dispatch('markers/getMarkers')
			this.$store.dispatch('markers/getMarkerGroups')
		} 
	}
}
</script>
<style scoped>
	
.dropdown {
	display: inline-block;
	margin-top: -5px;
}
</style>