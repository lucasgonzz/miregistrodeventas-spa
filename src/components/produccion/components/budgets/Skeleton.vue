<template>
	<div
	class="shadow-1 model budget b-r-1 c-p apretable">
		<b-skeleton-img
		width="100%"
		height="150px"></b-skeleton-img>
		<b-skeleton
		width="100%"
		class="m-b-15 m-t-20"></b-skeleton>
		<b-skeleton
		width="100%"
		class="m-b-15"></b-skeleton>
		<b-skeleton
		width="100%"
		class="m-b-15"></b-skeleton>
	</div>
</template>
<style lang="sass">
.budget 
	padding-bottom: 0 !important 
	.client
		width: 100%
		padding-top: 100%
		position: relative
		display: flex
		justify-content: center
		align-items: center
		p 
			position: absolute
			top: 50%
			transform: translatey(-50%)
			font-size: 2em
			font-weight: bold
			text-align: center
</style>