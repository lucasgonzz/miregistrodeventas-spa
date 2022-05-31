<template>
<b-modal
title="Calcular precio"
id="dolar-calculator"
hide-footer>
	<p>
		Se esta tomando el dolar a <strong>{{ price(dolar_blue) }}</strong> pesos 
		<b-button
		:to="{name: 'Configuration', params: {view: 'tienda-online'}}"
		variant="link">
			Cambiar
		</b-button>
	</p>
	<p>
		Precio de {{ article.name }}: 
	</p>
	<p>
		<strong>{{ price(article.price) }}</strong> dolares
	</p>
	<p>
		<strong>{{ price(article.price * dolar_blue) }}</strong> pesos
	</p>
	<hr>
	<p
	class="sub-title">
		Ingresa los montos de las monedas que se usaran para hacer la compra
	</p>
	<b-form-group
	label="Dolares">
		<b-form-input
		@keyup="calculate"
		v-model="dolares"
		placeholder="Ingrese los dolares"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Pesos">
		<b-form-input
		@keyup="calculate"
		v-model="pesos"
		placeholder="Ingrese los pesos"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Dolares cara chica">
		<b-form-input
		@keyup="calculate"
		v-model="dolares_cara_chica"
		placeholder="Ingrese los dolares cara chica"></b-form-input>
	</b-form-group>
	<hr>
	<p
	class="">
		Pagandose: {{ price(pagando) }} dolares | {{ price(pagando * dolar_blue) }} pesos
	</p>
	<p
	class=" m-b-0">
		Faltan pagar: {{ price(faltantes) }} dolares | {{ price(faltantes * dolar_blue) }} pesos
	</p>
</b-modal>
</template>
<script>
export default {
	computed: {
		article() {
			return this.$store.state.articles.article_to_edit
		},
		dolar_coin() {
			return this.$store.state.coins.dolar
		}
	},
	data() {
		return {
			dolares: '',
			pesos: '',
			dolares_cara_chica: '',
			pagando: 0,
			faltantes: 0,
		}
	},
	methods: {
		calculate() {
			let faltantes = this.article.price 
			if (this.dolares != '') {
				faltantes -= Number(this.dolares)
			}
			if (this.pesos != '') {
				let dolares_a_restar = Number(this.pesos) / this.dolar_blue
				faltantes -= dolares_a_restar
			}
			if (this.dolares_cara_chica != '') {
				let valor_dolar_cara_chica = this.dolar_blue - Number(this.user.dolar_cara_chica) 
				let pesos_a_restar = Number(this.dolares_cara_chica) * valor_dolar_cara_chica
				let dolares_a_restar = pesos_a_restar / this.dolar_blue
				faltantes -= dolares_a_restar
			}
			this.pagando = this.article.price - faltantes
			this.faltantes = faltantes
		}
	}
}
</script>