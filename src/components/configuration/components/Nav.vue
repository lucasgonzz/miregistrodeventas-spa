<template>
	<b-row>
		<b-col
		cols="12"
		lg="10">
			<horizontal-nav
			:items="items"
			prop_name="name"
			:set_view="true"></horizontal-nav>
			<!-- <b-nav tabs>
				<b-nav-item
				@click="setView('cuenta')"
				:active="isActive('cuenta')">
					Cuenta
				</b-nav-item>
				<b-nav-item
				v-if="has_online"
				@click="setView('tienda-online')"
				:active="isActive('tienda-online')">
					Tienda online
				</b-nav-item>
				<b-nav-item
				@click="setView('suscripcion')"
				:active="isActive('suscripcion')">
					Suscripción
				</b-nav-item>
			</b-nav> -->
		</b-col>
	</b-row>
</template>
<script>
import configuration from '@/mixins/configuration'
import HorizontalNav from '@/components/common/horizontal-nav/Index'
export default {
	name: 'NavConfiguration',
	mixins: [configuration],
	components: {
		HorizontalNav,
	},
	computed: {
		items() {
			let items = []
			items.push({name: 'cuenta'})
			if (this.has_online) {
				items.push({name: 'tienda online'})
			}
			items.push({name: 'suscripcion'})
			items.push({name: 'facturacion'})
			return items
		}
	},
	methods: {
		setView(view) {
			if (this.view != view) {
				console.log('set view')
				this.$router.push({name: 'Configuration', params: {view: view}})
			}
		},
		isActive(name) {
			return this.view == name
		},
	}
}
</script>
<style scoped lang="sass">
.nav-tabs
	width: 100%
	.nav-item
		margin: 0 .2em
		.active 
			font-weight: bold
			box-shadow: 0px 3px 7px rgb(0 0 0 / 15%) !important
.badge 
	font-size: 1em
</style>