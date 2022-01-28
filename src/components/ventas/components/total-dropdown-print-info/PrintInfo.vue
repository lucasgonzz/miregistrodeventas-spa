<template>
	<b-col
	cols="12"
	class="j-end col-info-prints">
		<b-list-group horizontal>
			<b-list-group-item>
				<i class="icon-print"></i>
				negocio
				<div class="color bg-danger"></div>
			</b-list-group-item>
			<b-list-group-item>
				<i class="icon-print"></i>
				cliente
				<div class="color bg-warning"></div>
			</b-list-group-item>
			<b-list-group-item>
				<i class="icon-print"></i>
				ambos
				<div class="color bg-primary"></div>
			</b-list-group-item>
		</b-list-group>
	</b-col>
</template>
<style lang="sass">

.col-info-prints
	@media screen and (min-width: 992px)
		margin-top: 10px
	.list-group
		.list-group-item
			padding: .3em 0 .3em .6em
			.color
				display: inline-block
				margin-bottom: -5px
				width: 20px
				height: 20px
				border-radius: .3em
</style>