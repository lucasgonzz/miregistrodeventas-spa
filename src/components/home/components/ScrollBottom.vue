<template>
	<div 
	v-scroll-to="'#'+element"
	class="scroll-bottom apretable">
		{{ text }}
	</div>
</template>
<script>
export default {
	props: ['text', 'element'],
}
</script>
<style lang="sass">
@import '@/sass/_custom.scss'
.scroll-bottom
	position: absolute
	bottom: 15px
	width: 300px
	height: 80px
	padding: .5em
	cursor: pointer
	border-radius: 50% 
	overflow-wrap: anywhere
	color: #000
	font-size: 1em
	font-weight: bold
.scroll-bottom::before,
.scroll-bottom::after 
	content: ''
	position: absolute
	top: 40% 
	left: 50%
	border: 2px solid #000 
	height: 10px
	width: 10px 
	transform: translate(-50%, -50%) rotate(45deg)
	border-top: transparent
	border-left: transparent
	animation: scroll-down 1s ease-in-out infinite
.scroll-bottom::after 
	top: 50%
@keyframes scroll-down 
	0%
		opacity: 0
	30%
		opacity: 1
	60%
		opacity: 1
	100%
		opacity: 0
		top: 90%
</style>