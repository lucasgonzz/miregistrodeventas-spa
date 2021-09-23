<template>
	<b-row
	class="m-t-20"
	v-if="!is_city_selected">
		<b-col
		lg="6">
			<b-card
			class="shadow-2"
			title="Selecciona tu ciudad">
				<b-form-group>
					<b-form-select
					v-model="provincia"
					:options="provincias_options"></b-form-select>
				</b-form-group>
				<b-form-group>
					<b-form-select
					v-model="ciudad"
					:options="city_options"></b-form-select>
				</b-form-group>
				<b-form-group>
					<b-button
					block 
					variant="primary"
					@click="setCity">
						Siguiente
					</b-button>
				</b-form-group>
			</b-card>
		</b-col>
	</b-row>
</template>
<script>
import address from '@/mixins/address'
export default {
	mixins: [address],
	data() {
		return {
			provincia: '',
			ciudad: '',
		}
	},
	created() {
		this.initCity()
	},
	watch: {
		provincia() {
			this.ciudad = ''
		}
	},
	computed: {
		ciudades() {
			return this.$store.state.political.ciudades	
		},
		provincias() {
			return this.$store.state.political.provincias	
		},
		provincias_options() {
			let options = []
			options.push({
				text: 'Seleccione la provincia',
				value: 0,
			})
			this.provincias.forEach(prov => {
				options.push({
					text: prov.iso_nombre,
					value: prov.iso_nombre,
				})
			})
			return options
		},
		city_options() {
			let ciudades = this.ciudades.filter(city => {
				return city.provincia.nombre == this.provincia
			})
			let options = []
			options.push({
				text: 'Seleccione la ciudad',
				value: '',
			})
			ciudades.forEach(city => {
				options.push({
					text: city.nombre,
					value: city.nombre,
				})
			})
			return options
		}
	},
	methods: {
		setCity() {
			if (this.ciudad != '') {
				this.$store.commit('address/setCity', this.ciudad)
			} else {
				this.$toast.error('Seleccione su ciudad, por favor')
			}
		},
		initCity() {
			let ciudad = this.ciudades.find(city => {
				return city.nombre == this.user.city
			})
			let provincia = this.provincias.find(prov => {
				return prov.iso_nombre == ciudad.provincia.nombre
			})
			this.provincia = provincia.iso_nombre
			setTimeout(() => {
				this.ciudad = ciudad.nombre
			}, 100)
		}
	}
}
</script>