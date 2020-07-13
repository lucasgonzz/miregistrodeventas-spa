<template>
<div>
	<b-row v-show="(markers.length || marker_groups.length) && !loading">
		<b-col>
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
	</b-row>
	<cargando :is_loading="loading" size="sm"></cargando>
</div>
</template>
<script>
import Cargando from '@/components/common/Cargando'
export default {
	props: ['article'],
	components: {
		Cargando
	},
	data() {
		return {
			show_markers_prices: true,

			markers: [],
			marker_groups: [],
			loading: false
		}
	},
	methods: {
		addMarker(marker) {
			this.$emit('addArticle', marker.article.id)
		},
		showMarkers() {
			if (this.show_markers) {
				this.show_markers = false
			} else {
				this.show_markers = true
			}
		},
		getMarkers() {
			this.$api.get('markers')
			.then(res => {
				this.loading = false
				this.markers = res.data
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		},
		getMarkerGroups() {
			this.loading = true
			this.$api.get('marker-groups/only-with-markers')
			.then(res => {
				this.marker_groups = res.data
				this.getMarkers()
			})
			.catch(err => {
				console.log(err)
				location.reload()
			})
		},
	},
	created() {
		this.getMarkerGroups()
	}
}
</script>
<style scoped>
	
.dropdown {
	display: inline-block;
	margin-top: -5px;
}
</style>