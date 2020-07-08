<template>
<div v-if="canUse('marker', user)">
	<div class="row m-b-10" 
		v-show="!show_markers">
		<div class="col">
			<button class="btn btn-primary btn-sm float-right"
					@click="showMarkers">
				Mostrar Marcadores
			</button>
		</div>
	</div>
	<div class="row m-b-10" 
		v-show="(markers.length || marker_groups.length) && show_markers">
		<div class="col">
			<div class="card" v-show="show_markers">
				<div class="card-header p-5">
					<div class="row">
						<div class="col-6" v-if="is_desktop">
							<h6 class="p-l-10 m-0 m-t-5">
								<strong>
									<i class="icon-star-1"></i>
									Marcadores
								</strong>
							</h6>
						</div>
						<div class="col-12 col-md-6">
							<div class="custom-control custom-checkbox my-1 mr-sm-2 c-p float-right">
								<input class="custom-control-input c-p" 
								v-model="show_markers" 
								type="checkbox" 
								id="show-markers">
								<label class="custom-control-label c-p" 
								for="show-markers">
									<strong>Mostrar marcadores</strong>
								</label>
							</div>
							<div class="custom-control custom-checkbox  custom-control-inline-50 my-1 mr-sm-2 c-p float-right" v-show="is_desktop">
								<input class="custom-control-input c-p" 
								v-model="show_markers_prices" 
								type="checkbox" 
								id="show_markers_prices">
								<label class="custom-control-label c-p" 
								for="show_markers_prices">
									<strong>Mostrar precios</strong>
								</label>
							</div>
						</div>
					</div>
				</div>
				<div class="card-body p-5" v-show="show_markers">
					<div 
					class="dropdown m-l-5" 
					v-for="marker_group in marker_groups"
					:key="marker_group.id"
					v-show="marker_group.markers.length">
						<button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							{{ marker_group.name }}
						</button>
						<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
							<a 
							v-for="marker in marker_group.markers"
							:key="marker.id"
								@click.prevent="addMarker(marker)"
								class="dropdown-item btn-sm" 
								href="#">
								{{ marker.article.name }}
								<span v-show="show_markers_prices">
									(${{ marker.article.price }})
								</span>
							</a>
						</div>
					</div>
					<button 
					v-for="marker in markers"
					:key="marker.id"
					@click="addMarker(marker)"
					class="btn btn-primary btn-sm m-l-5">
						{{ marker.article.name }}
						<span v-show="show_markers_prices">
							(${{ marker.article.price }})
						</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	props: ['article', 'user', 'is_desktop'],
	data() {
		return {
			show_markers: true,
			show_markers_prices: true,

			markers: [],
			marker_groups: [],
		}
	},
	methods: {
		addMarker(marker) {
			if (marker.article.bar_code === null) {
				this.article.name = marker.article.name
			} else {
				this.article.bar_code = marker.article.bar_code
			}
			this.$emit('addArticle')
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