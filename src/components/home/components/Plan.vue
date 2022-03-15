<template>
	<div 
	@click="setPlan(plan)"
	:class="isSelectedPlan(plan)"
	class="model plan s b-r-1 c-p">
		<i :class="'icon-'+plan.icon" class="text-primary"></i>
		<p class="name text-primary">
			{{ plan.name }}
		</p>
		<p class="price">
			{{ price(plan.price, false) }}
		</p>
		<p class="price-aclaration">
			AR$ por mes
		</p>
		<div 
		class="feature">
			<i class="icon-check text-success"></i>
			<p>
				Modulos: {{ plan.modules }}
			</p>
			<hr>
		</div>
		<div 
		v-for="feature in plan.features"
		class="feature">
			<i :class="iconClass(feature)"></i>
			<p>
				{{ feature.text }}
			</p>
			<hr>
		</div>
	</div>
</template>
<script>
import plans from '@/mixins/plans'
export default {
	props: ['plan'],
	mixins: [plans],
	methods: {
		isSelectedPlan(plan) {
			if (this.selected_plan && plan.id == this.selected_plan.id) {
				return 'selected-plan'
			}
			return ''
		},
		setPlan(plan) {
			this.$emit('setSelected', plan)
		},
	}
}
</script>
<style lang="sass">	
@import '@/sass/_custom.scss'
.selected-plan 
	padding: 1em
	box-shadow: 0px 3px 10px 0px $blue !important
	-webkit-box-shadow: 0px 3px 10px 0px $blue !important
	-moz-box-shadow: 0px 3px 10px 0px $blue !important
.plan 
	margin-bottom: 2em !important
	background: #FFF
	padding: 1em
	@media screen and (max-width: 992px)
		width: 90%
		margin: auto
	p 
		text-align: center
	.name 
		font-size: 1.2em
		margin-bottom: 0
		font-weight: bold
	.price 
		font-weight: bold
		font-size: 2em
		margin-bottom: 0
	.price-aclaration
		color: rgba(0,0,0,.6)
		font-size: 1em
	.feature
		display: flex
		p 
			text-align: left
			font-size: .9em
		i 
			padding-right: 15px
			&.icon-cancel 
				padding-right: 10px
				font-size: 1.2em
		&:last-child
			p 
				margin-bottom: 0
			hr
				display: none
</style>