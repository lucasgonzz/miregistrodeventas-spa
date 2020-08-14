<template>
<div>
	<b-row>
		<b-col
		cols="12"
		md="6"
		lg="4"
		class="col-total">
			<p class="m-0">
				<strong class="total">
					Total: {{ price(total) }}
				</strong>
			</p>
			<p class="m-0">
				{{ cantidad_articulos }} artículos, {{ cantidad_unidades }} unidades
			</p>
		</b-col>
		<b-col
		cols="12"
		md="6"
		lg="2"
		class="col-credit-card">
			<b-button-group>
				<b-button 
				:variant="with_card ? 'primary' : 'outline-primary'"
				size="sm"
				@click="changeWithCard">
					<i class="icon-credit-card"></i>
				</b-button>
				<b-button 
				variant="outline-success" 
				size="sm"
				@click="showChangePercentageCard">
					<i class="icon-refresh"></i>
					{{ percentage_card }}%
				</b-button>
			</b-button-group>
		</b-col>
		<b-col
		cols="12"
		lg="6"
		class="align-center j-end">
			<div class="btn-group">
				<button v-if="previus_sale.client" 
						class="btn btn-dark">
					<i class="icon-user"></i>
					{{ previus_sale.client.name }}
				</button>
				<button v-if="previus_sale.created_at" 
						class="btn btn-primary">
					{{ since(previus_sale.created_at) }}
				</button>
				<button v-if="previus_sale.debt" 
						class="btn btn-danger">
					Debe {{ price(total - previus_sale.debt) }}
				</button>
			</div>
			<div class="float-right m-l-5 d-none d-sm-block">
				<b-dropdown split
				@click="previusSale">
					<template v-slot:button-content>
						<span class="spinner-border spinner-border-sm" v-show="updating_previus_sale"></span>
						Anterior
					</template>
					<b-dropdown-item
					v-show="sales_previus_next_index > 1"
					@click="nextSale">
						<i v-show="!loading_next_sale" class="icon-redo"></i>
						Atras
					</b-dropdown-item>
					<b-dropdown-item
					v-show="sales_previus_next_index > 0"
					@click="updatePreviusSale">
						<i v-show="!updating_previus_sale"
							class="icon-refresh"></i>
						<span v-show="updating_previus_sale" 
							class="spinner-border spinner-border-sm"></span>
						Actualizar
					</b-dropdown-item>
					<b-dropdown-item
					v-show="sales_previus_next_index > 0"
					@click="cancelPreviusSale">
						<i class="icon-cancel"></i>
						Cancelar
					</b-dropdown-item>
				</b-dropdown>
			</div>
		</b-col>
	</b-row>
</div>
</template>
<script>
export default {
	props: [
		'total', 'cantidad_articulos', 'cantidad_unidades',
		'previus_sale',
		'sales_previus_next_index', 'loading_previus_sale', 'loading_next_sale',
		'updating_previus_sale',
		'user', 'with_card', 'percentage_card',
		'is_desktop','loading_add_article',
	],
	data() {
		return {
		}
	},
	methods: {
		nextSale() {
			this.$emit('nextSale')
		},
		previusSale() {
			this.$emit('previusSale')
		},
		updatePreviusSale() {
			this.$emit('updatePreviusSale')
		},
		cancelPreviusSale() {
			this.$emit('cancelPreviusSale')
		},

		changeWithCard() {
			this.$emit('changeWithCard')
		},
		showChangePercentageCard() {
			this.$bvModal.show('change-percentage-card')
		},
	},
}
</script>
<style scoped lang="sass">

.col-12
	@media screen and (max-width: 992px)
		margin-bottom: 1em
		&:last-child
			margin-bottom: 0

.col-total
	display: flex
	flex-direction: column
	justify-content: flex-start
	@media screen and (min-width: 768px)
		p 
			text-align: left
.col-credit-card
	display: flex
	align-items: center
	@media screen and (max-width: 992px)
		justify-content: flex-end
	.btn 
		&:hover
			background: #fff
			color: #007bff
.icon-credit-card 
	font-size: 1.5rem

.p-price 
	display: block

.total 
	font-size: 1.5rem

</style>