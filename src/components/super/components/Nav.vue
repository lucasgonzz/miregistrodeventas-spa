<template>
	<b-row>
		<b-col
		cols="12"
		class="col-nav">

			<b-nav tabs>
				<b-nav-item
				@click="setView('usuarios')"
				:active="isActive('usuarios')">
					Usuarios
				</b-nav-item>
				<b-nav-item
				@click="setView('plans')"
				:active="isActive('plans')">
					Planes
				</b-nav-item>
			</b-nav>
		</b-col>
	</b-row>
</template>
<script>
import mixin from '@/mixins/super'
export default {
	mixins: [mixin],
	components: {
	},
	name: 'NavSuper',
	computed: {
		items() {
			return [
			]
		}
	},
	methods: {
		setView(view) {
			console.log('esta en la vista '+this.view+' y cambia a '+view)
			if (this.view != view) {
				this.$router.push({name: 'Super', params: {view: view}})
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