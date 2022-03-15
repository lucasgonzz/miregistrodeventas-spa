<template>
<b-row
id="payment-plans"
class="row-dark">
	<b-col
	cols="11"
	lg="12">
		<!-- <h2
		class="title">
			Nuestros planes
		</h2> -->
		<!-- <h5>
			No cobramos licencia inicial, actualizaciones ni mantenimiento extra.
		</h5> -->
		<vue-horizontal-list 
		v-if="is_mobile"
		:items="plans" :options="options">
			<template v-slot:default="{ item }">
				<div 
				class="plan s b-r-1">
					<i :class="'icon-'+item.icon" class="text-primary"></i>
					<p class="name text-primary">
						{{ item.name }}
					</p>
					<p class="price">
						{{ price(item.price, false) }}
					</p>
					<p class="price-aclaration">
						AR$ por mes
					</p>
					<div 
					class="feature">
						<i class="icon-check text-success"></i>
						<p>
							Modulos: {{ item.modules }}
						</p>
						<hr>
					</div>
					<div 
					v-for="feature in item.features"
					class="feature">
						<i :class="iconClass(feature)"></i>
						<p>
							{{ feature.text }}
						</p>
						<hr>
					</div>
				</div>
			</template>
		</vue-horizontal-list>
		<div 
		v-else
		class="cont-models">
			<plan 
			v-for="plan in plans"
			:plan="plan"
			v-animate-onscroll="{down: 'animated fadeInUp'}"></plan>
		</div>
	</b-col>
	<scroll-bottom
	class="d-none d-lg-block"
	text="Probar gratis"
	element="register-form"></scroll-bottom>
</b-row>
</template>
<script>
import Plan from '@/components/home/components/Plan'
import ScrollBottom from '@/components/home/components/ScrollBottom'
import VueHorizontalList from "vue-horizontal-list"
import plans from '@/mixins/plans'
export default {
	mixins: [plans],
	components: {
		Plan,
		ScrollBottom,
		VueHorizontalList,
	},
	data() {
		return {
			options: {
				responsive: [
					{ size: 1 },
				],
				list: {
					// 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
					// windowed: 200,

					// Because: #app {padding: 80px 24px;}
					padding: 30,
					// padding: 10,
				},
				navigation: {
					// when to show navigation
					start: 0,
					color: "#000",
				},
				position: {
					start: 2,
				},
				autoplay: { play: false, repeat: false, speed: 2500 },
			},
		}
	},
}
</script>
<style lang="sass">	
#payment-plans
	background: url('~@/assets/fondo cuadrados azules.png') no-repeat center center 
	background-size: cover
</style>