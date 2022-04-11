<template>
	<b-col
	cols="12"
	class="j-end col-info-prints">
		<b-list-group 
		class="colors"
		horizontal>
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
</style>