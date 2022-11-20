<template>
	<div>
		<p
		class="j-between">
			Metodo de pago
			<strong>
				{{ model.name }}
			</strong>
		</p>
		<div
		class="shadow-2 p-15 b-r-1"
		v-if="model.credit_card">
			<p 
			class="j-between">
				Tarjeta
				<strong>
					{{ model.credit_card.name }}
				</strong>
			</p>
			<div>
				<p 
				class="j-between">
					Cuotas
					<strong>
						{{ model.credit_card_payment_plan.installments }}
					</strong>
				</p>
				<p 
				class="j-between">
					Recargo
					<strong>
						{{ model.credit_card_payment_plan.surchage }}
					</strong>
				</p>
			</div>
		</div>
		<hr>
	</div>
</template>
<script>
export default {
	props: {
		model: Object,
	},
}
</script>