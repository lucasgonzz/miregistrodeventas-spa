<template>
	<div 
	@click="setSelected"
	class="result c-p apretable">
		<img 
		v-if="image_url"
		:src="imageUrl(image_url, true)">
		<div 
		class="info">
			<p
			class="important">
				{{ result[prop_to_show] }}
			</p>
			<p
			v-for="prop in props_to_show">
				<span
				v-if="prop == 'price'">
					{{ price(result[prop]) }}
				</span>
				<span
				v-else-if="prop == 'bar_code' && result[prop] != ''">
					<i class="icon-barcode"></i>
					{{ result[prop] }}
				</span>
				<span
				v-else>
					{{ result[prop] }}
				</span>
			</p>
		</div>
	</div>
</template>
<script>
export default {
	props: ['result', 'prop_to_show', 'prop_name', 'props_to_show'],
	computed: {
		image_url() {
			if (this.result.image_url) {
				return this.result.image_url
			}
			if (this.result.images && this.result.images.length) {
				return this.result.images[0].url
			}
			return null
		},
	},
	methods: {
		setSelected() {
			this.$emit('setSelected', this.result)
		}
	}
}
</script>
<style lang="sass">
.result 
	display: flex
	align-items: center
	border-bottom: 1px solid rgba(0,0,0,.7)
	&:last-child
		border-bottom: none
	img 
		width: 30%
		height: auto
		border-radius: 5px
		margin-left: .5em
	.info 
		padding: 1em
		display: flex
		flex-direction: column
		align-items: center
		justify-content: flex-start
		width: 70%
		margin-bottom: 0
		p 
			display: block
			width: 100%
			margin-bottom: 0
			text-align: left
		.important
			font-weight: bold
			font-size: 1.2em
</style>