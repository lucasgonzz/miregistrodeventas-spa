<template>
	<b-row
	v-if="is_city_selected">
		<b-col
		class="al-borde"
		cols="12">
			<div
			class="address-search shadow-2">
				<b-button 
				variant="primary"
				@click="back"
				class="btn-nav apretable text-black m-r-15">
					<i class="icon-arrow-back"></i>
				</b-button>	
				<b-form-input
				v-model="query"
				@keyup.enter="search"
				placeholder="Ingresa tu direccion"></b-form-input>
			</div>
			<div class="mapa" ref="mapaaa"></div>
			<div
			class="maps-address shadow-2">
				<b-button
				:disabled="disabled"
				@click="next"
				block
				variant="primary">
					<btn-loader
					text="Siguiente"
					:loader="loading"></btn-loader>
				</b-button>
			</div>
		</b-col>
	</b-row>
</template>
<script>
import BtnLoader from "@/components/common/BtnLoader"
import { configMapa } from "@/constants/configMapa"
import address from '@/mixins/address'
export default { 
	mixins: [address],
	components: {
		BtnLoader,
	},
	data() {
		return {
			map: null,
			marker: null,
			has_error: false,
			loading: false,
			query: '',
		}
	},
	// mounted() {
	// 	this.initializeMap()
	// },
	watch: {
		city() {
			console.log('watch')
			this.initializeMap()
		}
	},
	computed: {
		disabled() {
			return this.address.street_number == ''
		},
		configMapa() {
			return {
				...configMapa,
				center: { lat: 0, lng: 0}
			}
		},
	},
	methods: {
		back() {
			this.$store.commit('address/setCity', '')
		},
		next() {
			this.$bvModal.show('address-details')
		},
		initializeMap() {
			const mapContainer = this.$refs.mapaaa
			if (window.google && typeof mapContainer != 'undefined') {
				this.map = new window.google.maps.Map(mapContainer, this.configMapa)
				this.map.addListener('click', this.setClick)
				this.search('', true)
				console.log(mapContainer)
			} else {
				setTimeout(() => {
					this.initializeMap()
				}, 100)
			}
		},
		search() {
			this.loading = true
			let address
			if (this.query != '') {
				address = this.query+' '+this.city
			} else {
				address = this.city
			}
			let geocoder = new window.google.maps.Geocoder()
			geocoder.geocode({
				'address': address+' Argentina',
			}, (results, status) => {
				this.loading = false
				if (status == 'OK') {
					this.has_error = false
					this.setMarker(results[0].geometry.location)
				} else if (status == 'ZERO_RESULTS') {
					this.has_error = true
					console.log('ZERO_RESULTS')
				} else {
					console.log(status)
					this.$toast.error('Hubo un error al encontrar la direccion')
				}
			})
		},
		setMarker(location, center = true) {
			if (this.marker) {
				this.marker.setMap(null) 
			}
			if (center) {
				this.map.setCenter(location)
			}
	        this.marker = new window.google.maps.Marker({
	            map: this.map,
	            position: location
	        })
	        console.log(this.map)
	        if (this.query != '') {
		        this.address.lat = location.lat()
		        this.address.lng = location.lng()
		        let split = this.query.split(' ')
		        let street_number = Number(split[split.length - 1].replace(',', ''))
		        if (Number.isInteger(street_number)) {
			        this.address.street_number = street_number
			        let replace = ' '+this.address.street_number
			        this.address.street = this.query.replace(replace, '')
			        console.log(this.address)
		        	this.map.setZoom(17)
		        } else {
		        	this.$toast.error('Ingrese el numero de la calle')
		        	this.address.street_number = ''
		        }
	        } else {
		        this.address.street_number = ''
	        }
		},
		setClick(location) {
			this.loading = true
			let geocoder = new window.google.maps.Geocoder()
			geocoder.geocode({
				location: location.latLng,
			}, (results, status) => {
				this.loading = false
				this.address.formated = this.getAddress(results[0])
				this.query = this.getAddress(results[0])
				if (this.marker) {
					this.setMarker(location.latLng, false)
				} else {
					this.setMarker(location.latLng)
				}
			})
		},
		getAddress(result) {
			let address 
			let route = result.address_components.find(address => {
				return address.types[0] == 'route'
			})
			if (route && typeof route != 'undefined') {
				address = route.long_name
			}
			let street_number = result.address_components.find(address => {
				return address.types[0] == 'street_number'
			})
			if (street_number) {
				address += ' ' + street_number.long_name
			}
			return address
		}
	},
}
</script>
<style lang="sass">
.mapa 
	position: fixed
	top: 50px
	width: 100%
	height: calc(100vh - 100px)
	// @media screen and (min-width: 992px)
	// 	height: calc(100vh - 100px)
	// @media screen and (max-width: 992px)
	// 	height: calc(100vh - 100px)
.address-search
	@media screen and (max-width: 992px)
		background: #FFF
	height: 50px
	top: 0
	left: 0
	display: flex
	justify-content: space-between
	align-items: center
	padding: 0 1em
	position: fixed
	z-index: 100
	width: 100%
	div
		width: 87%
		.autocomplete
			width: 100%

.maps-address
	@media screen and (max-width: 992px)
		background: #FFF
	position: fixed
	left: 0
	bottom: 0
	height: 50px
	padding: 0 1em
	display: flex
	align-items: center
	justify-content: space-between
	width: 100%
</style>