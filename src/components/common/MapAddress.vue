<template>
<b-modal ref="mapAddress" id="map-address" size="xl" hide-footer :title="title">
	<div class="buyer-mapa" ref="mapa"></div>
</b-modal>
</template>
<script>
export default {
	data() {
		return {
			map: null,
			marker: null,
		}
	},
	mounted() {
		this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
			if (modalId == 'map-address') {
				console.log('iniciando mapa')
				this.initializeMap()
			}
		})
	},
	created() {
		console.log('mapa creado')
	},
	computed: {
		location() {
			return this.$store.state.map.location
		},
		title() {
			return this.$store.state.map.title
		},
		configMapa() {
			return {
			    clickableIcons: false,
			    streetViewControl: false,
			    panControlOptions: false,
			    gestureHandling: "cooperative",
			    mapTypeControl: false,
			    zoom: 15,
			    minZoom: 7,
			    maxZoom: 20,
				center: { lat: -34.397, lng: 150.644 }
			}
		},
	},
	methods: {
		initializeMap() {
			const mapContainer = this.$refs.mapa
			if (window.google && typeof mapContainer != 'undefined') {
				this.map = new window.google.maps.Map(mapContainer, this.configMapa)
				console.log('mapa creado')
				this.setMarker()
			} else {
				setTimeout(() => {
					this.initializeMap()
				}, 100)
			}
		},
		setMarker() {
			this.map.setCenter(this.location)
	        this.marker = new window.google.maps.Marker({
	            map: this.map,
	            position: this.location
	        })
	        // this.map.setZoom(17)
		},
	},
}
</script>
<style lang="sass">
.buyer-mapa
	height: calc(100vh - 150px)
</style>