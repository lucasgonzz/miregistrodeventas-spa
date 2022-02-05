<template>
	<div>
		<b-form-input 
		class="m-b-10"
		v-model="search" 
		placeholder="Buscar un icono"></b-form-input>
		<div class="icons">
			<div 
			v-for="icon in icons"
			@click="setSelected(icon)"
			:class="isSelected(icon) ? 'selected-icon' : ''"
			class="icon-container shadow border-radius c-p">
				<i :class="'icon-'+icon.slug"></i>
				<p>
					{{ icon.name }}
				</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: ['category'],
	computed: {
		icons() {
			let icons = this.$store.state.icons.icons
			if (this.search.length > 1) {
				return icons.filter(icon => {
					return icon.name.toLowerCase().includes(this.search.toLowerCase())
				})
			}
			return icons
		},
	},
	data() {
		return {
			search: '',
		}
	},
	methods: {
		setSelected(icon) {
			this.category.icon_id = icon.id
		},
		isSelected(icon) {
			return this.category.icon_id == icon.id
		}
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom.scss'
.icons 
	display: flex
	flex-wrap: wrap
	justify-content: space-between
	.icon-container
		width: 32%
		background: #FFF
		display: flex
		flex-direction: column
		align-items: center
		margin-bottom: .5em
		padding: .5em
		i 
			font-size: 1.5em
		p 
			margin-bottom: 0
	.selected-icon
		border: .2em solid $blue
		i 
			color: $blue
</style>