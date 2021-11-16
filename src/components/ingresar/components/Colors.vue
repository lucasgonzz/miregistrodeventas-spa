<template>
	<b-form-group
	v-if="has_online"
	label="Colores">
		<div class="cont-colors">
			<div 
			@click="addColor(color)"
			:class="isColorSelected(color)"
			v-for="color in colors"
			:key="color.id"
			:style="{backgroundColor: color.value}"
			class="color c-p shadow-1">
				<p>
					{{ color.name }}
				</p>
			</div>
		</div>
	</b-form-group>
</template>
<script>
import Vue from 'vue'
export default {
	props: ['article'],
	computed: {
		colors() {
			return this.$store.state.colors.colors
		}
	},
	methods: {
		addColor(color) {
			if (this.hasColor(color)) {
				let index = this.article.colors.findIndex(col => {
								return col.id == color.id
							})
				console.log(index)
				this.article.colors.splice(index, 1)
			} else {
				this.article.colors.push(color)
			}
		},
		isColorSelected(color) {
			if (this.hasColor(color)) {
				return 'color-selected shadow-1'
			}
			return 'color-not-selected'
		},
		hasColor(color) {
			let index = this.article.colors.findIndex(col => {
							return col.id == color.id
						})
			return index != -1
		}
	}
}
</script>
<style lang="sass">
// .color 
// 	width: 50px
// 	height: 50px
// 	display: inline-block
// 	border-radius: .3em
// 	margin: 0 .5em
// 	transition: all .1s
// .color-selected
// 	border: 3px solid #000
// 	width: 55px
// 	height: 55px
// .color-not-selected
// 	margin-bottom: 2.5px
</style>