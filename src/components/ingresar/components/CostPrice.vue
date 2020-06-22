<template>
	<div class="row m-b-10" data-step="6" data-intro="Costo al que compro el articulo, precio al que quiere venderlo.">
		<div class="col-12" :class="classCost">
			<label for="cost">Costo</label>
			<input type="number" 
					class="form-control focus-red" 
					placeholder="Costo"
					required 
					id="cost"
					autocomplete="off" 
					@keyup.enter="changeToPrice"
					@keyup="calculatePorcentageForPrice"
					v-model="article.cost">
		</div>
		<div :class="classPrice">
			<label for="price">Precio</label>
			<br>
			<input type="number" 
					class="form-control focus-red" 
					:class="article.uncontable ? 'input-uncontable-price' : ''"
					placeholder="Precio"
					required 
					autocomplete="off" 
					@keyup.enter="changeFromPrice"
					id="price"
					v-model="article.price">
			<span class="p-l-5 p-r-5" v-show="article.uncontable">el</span>
			<select v-show="article.uncontable" 
					id="measurement" 
					v-model="article.measurement"
					class="form-control select-measurement">
				<option value="kilo" selected>Kilo</option>
				<option value="gramo">Gramo</option>
			</select>
			<template v-if="canUse('percentage_fixed', user)">
				<a @click.prevent="showPorcentageForPrice"
					href="#" 
					class="btn btn-secondary btn-sm m-t-10" v-show="porcentage_for_price == 0">
					Usar un porcentaje fijo
				</a>
				<a @click.prevent="stopPorcentageForPrice"
					href="#" 
					class="btn btn-secondary btn-sm" v-show="porcentage_for_price != 0">
					Dejar de usar porcentaje fijo (%{{ porcentage_for_price }})
				</a>
			</template>
		</div>
		<div :class="classOnline" v-show="article.online">
			<label for="online-price">Precio online</label>
			<input type="number" 
					class="form-control focus-red" 
					placeholder="Precio online"
					required 
					id="online-price"
					autocomplete="off" 
					@keyup.enter="changeToStock"
					v-model="article.online_price">
			<small class="text-muted">
				Si no se llena se usara el precio normal
			</small>
		</div>
	</div>
</template>
<script>
export default {
	props: ['article', 'user', 'porcentage_for_price'],
	data() {
		return {

		}
	},
	computed: {
		classCost() {
			if (this.article.uncontable && this.article.online) {
				return 'col-md-3'
			} else if (this.article.online) {
				return 'col-md-4'
			} else if (this.article.uncontable) {
				return 'col-md-4'
			} else {
				return 'col-md-6'
			}
		},
		classPrice() {
			if (this.article.uncontable && this.article.online) {
				return 'col-md-6'
			} else if (this.article.online) {
				return 'col-md-4'
			} else if (this.article.uncontable) {
				return 'col-md-8'
			} else {
				return 'col-6'
			}
		},
		classOnline () {
			if (this.article.uncontable && this.article.online) {
				return 'col-md-3'
			} else if (this.article.online) {
				return 'col-md-4'
			} else if (this.article.uncontable) {
				return ''
			}
		},
	},
	methods: {
		changeToPrice() {
			if (this.porcentage_for_price == 0) {
				$('#price').focus()
			} else {
				$('#stock').focus()
			}
		},
		changeToStock() {
			$('#stock').focus()
		},
		changeFromPrice() {
			if (this.article.online) {
				$('#online-price').focus()
			} else {
				$('#stock').focus()
			}
		},
		calculatePorcentageForPrice() {
			if (this.porcentage_for_price != 0) {
				this.article.price = parseFloat(this.article.cost) + 
									(parseFloat(this.porcentage_for_price) / 100) * 
									parseFloat(this.article.cost)
			}
		},
		showPorcentageForPrice() {
			$('#porcentage-for-price').modal('show')
		},
		stopPorcentageForPrice() {
			this.porcentage_for_price = 0
		},
	},
}
</script>
<style scoped>
.input-uncontable-price {
	width: 50%;
	display: inline-block;
}
.select-measurement {
	width: 30%;
	display: inline-block;
}
	
</style>
