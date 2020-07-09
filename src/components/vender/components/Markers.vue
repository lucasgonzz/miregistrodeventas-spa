<template>
<div>
	<b-row v-show="(markers.length || marker_groups.length)">
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
</div>
</template>
<script>
export default {
	props: ['article'],
	data() {
		return {
			show_markers_prices: true,

			markers: [],
			marker_groups: [],
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
				// console.log('marcadores: ')
				// console.log(res.data)
				this.markers = res.data
			})
			.catch(err => {
				console.log(err)
				location.reload()
			})
		},
		getMarkerGroups() {
			this.$api.get('marker-groups/only-with-markers')
			.then(res => {
				// console.log('grupo de marcadores: ')
				// console.log(res.data)
				this.marker_groups = res.data
			})
			.catch(err => {
				console.log(err)
				location.reload()
			})
		},
	},
	created() {
		this.getMarkers()
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