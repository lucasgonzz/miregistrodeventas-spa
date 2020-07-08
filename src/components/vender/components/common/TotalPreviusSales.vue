<template>
<div>
	<div class="row m-b-10 d-none d-lg-flex">
		<div class="col-3">
			<p class="p-price m-b-0">
				<strong class="total" v-show="!loading_add_article">
					Total: {{ price(total) }}
				</strong>
				<span class="text-primary" v-show="loading_add_article">
					<span class="spinner-border spinner-border-sm"></span>
					Cargando...
				</span>
			</p>
			<p class="card-text">
				{{ cantidad_articulos }} artículos, {{ cantidad_unidades }} unidades
			</p>
		</div>
		<div class="col-2" v-if="canUse('percentage_card', user)" data-step="3" data-intro="Indique si la venta es con tarjeta para aplicar un recargo.">
			<div class="form-group m-0">
				<div class="btn-group">
					<button class="btn btn-sm p-t-0 t-b-0"
							:class="with_card ? 'btn-primary' : 'btn-outline-primary'"
							@click="changeWithCard">
						<i class="icon-credit-card"></i>
					</button>
					<button class="btn btn-outline-success btn-sm" 
							data-step="4" data-intro="Cambie el recargo que se aplica a las ventas con tarjeta."
							@click="showChangePercentageCard">
						<!-- Cambiar -->
						<i class="icon-refresh"></i>
						{{ percentage_card }}%
					</button>
				</div>
			</div>
		</div>
		<!-- <div class="col-1">
			<button class="btn btn-secondary btn-sm" @click="showIntro">
				Ayuda
			</button>
		</div> -->
		<div class="col" v-if="canUse('sale.update', user)">
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
			<div class="float-right">
				<div class="dropdown">
					<button type="button" class="btn btn-secondary" @click="previusSale"
							data-step="5" data-intro="Retroceda entre las ventas realizadas y editelas si eso necesita.">
						<i class="icon-undo"></i>
						Anterior
					</button>
					<button type="button" 
							v-show="sales_previus_next_index > 0"
							class="btn btn-secondary dropdown-toggle dropdown-toggle-split" 
							data-toggle="dropdown" 
							aria-haspopup="true" 
							aria-expanded="false">
					<!-- <span class="sr-only">Toggle Dropdown</span> -->
					</button>
					<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<a class="dropdown-item" href="#"
							v-show="sales_previus_next_index > 1"
							@click="nextSale">
							<i v-show="!loading_next_sale"
								class="icon-redo"></i>
								Atras
						</a>
						<a class="dropdown-item" href="#"
							v-show="sales_previus_next_index > 0"
							@click="updatePreviusSale">
							<i v-show="!updating_previus_sale"
								class="icon-refresh"></i>
							<span v-show="updating_previus_sale" 
								class="spinner-border spinner-border-sm"></span>
							Actualizar
						</a>
						<a class="dropdown-item" href="#"
							v-show="sales_previus_next_index > 0"
							@click="cancelPreviusSale">
							<i class="icon-cancel"></i>
							Cancelar
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>	
	<div class="row m-b-5 d-lg-none">
		<div class="col-12">
			<p class="p-price m-b-0">
				<strong class="total" v-show="!loading_add_article">
					Total: {{ price(total) }}
				</strong>
				<span class="text-primary" v-show="loading_add_article">
					<span class="spinner-border spinner-border-sm"></span>
					Cargando...
				</span>
			</p>
			{{ cantidad_articulos }} artículos, {{ cantidad_unidades }} unidades
		</div>
		
		<div class="col-2 m-t-5 m-b-5" v-if="canUse('percentage_card', user)">
			<div class="form-group m-0">
				<div class="btn-group">
					<button class="btn btn-sm p-t-0 t-b-0"
							:class="with_card ? 'btn-primary' : 'btn-outline-primary'"
							@click="changeWithCard">
						<i class="icon-credit-card"></i>
					</button>
					<button class="btn btn-outline-success btn-sm"
							@click="showChangePercentageCard">
						<!-- Cambiar -->
						<i class="icon-refresh"></i>
						{{ percentage_card }}%
					</button>
				</div>
			</div>
		</div>
	</div>
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
		showIntro() {
			introJs().setOption('showProgress', true).setOption('hidePrev', true).setOption('hideNext', true).start()
		},
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
			$('#change-percentage-card').modal('show')
		},
	},
}
</script>
<style scoped>
.icon-credit-card {
	font-size: 1.5rem;
}
.p-price {
	height: 40px;
	display: flex;
	align-items: center;
}
.total {
	font-size: 1.5rem;
}
</style>