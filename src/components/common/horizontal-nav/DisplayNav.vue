<template>
	<div 
	class="display-nav"> 
		<div  
		:class="isSelected('cards')"
		@click="setDisplay('cards')"
		class="item apretable">
			<i class="icon-grid"></i>
		</div>
		<div 
		:class="isSelected('table')"
		@click="setDisplay('table')"
		class="item apretable">
			<i class="icon-list"></i>
		</div>
	</div>
</template>
<script>
export default {
	props: ['display', 'model_name'],
	methods: {
		setDisplay(display) {
			this.$emit('setDisplay', display)
			this.$store.commit(this.model_name+'/setDisplay', display)
		},
		isSelected(display) {
			if (this.display == display) {
				return 'selected-display'
			}
			return 'nooo'
		}
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom'
.display-nav 
	display: flex
	justify-content: flex-end
	.item 
		padding: 0 .5em
		font-size: 1.2em
		cursor: pointer
	[class^='icon-']:before
		margin-right: 0
	.selected-display
		i
			color: $blue
			border-bottom: 3px solid $blue
</style>