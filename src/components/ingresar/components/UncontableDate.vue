<template>
	<div id="uncontable-date">
		<div class="row">
			<div class="col-12 col-md-4" 
					data-position="top"
					data-step="1" 
					data-intro="Por defecto la fecha es la actual, de ser otra fecha desmarcar y elejir la fecha.">
				<div class="form-group m-b-5">
					<div class="custom-control custom-checkbox">
						<input type="checkbox"
							v-model="current_date"
							id="current-date"
							class="custom-control-input">
						<label for="current-date" class="custom-control-label c-p">
							Fecha de hoy
						</label>
					</div>
				</div>
				<div class="form-group m-b-0" v-show="!current_date">
					<label for="created_at">Seleccione la fecha</label>
					<input type="date" 
							@change="remember_date_"
							id="created_at"
							class="form-control focus-red"
							v-model="article.created_at">
				</div>
				<div v-show="remember_date && !current_date"
						class="custom-control custom-checkbox my-1 mr-sm-2 m-b-10">
					<input v-model="remember_date" 
							type="checkbox" 
							class="custom-control-input" 
							id="remember_date">
					<label class="custom-control-label c-p" 
							for="remember_date">
						Recordar fecha
					</label>
					<small class="form-text text-muted">
						Sí el proximo artículo también es del {{ article.created_at }} se recordara
					</small>
				</div>
			</div>
			<div class="col-12 col-md-4" v-if="canUse('online', user)" data-step="2" data-intro="Marque esta opcion si su articulo se vender por cantidades. Entonces se le pedira el precio por la unidad que seleccione (kilos o gramos).">
				<div class="form-group m-b-0">
					<div class="custom-control custom-checkbox my-1 mr-sm-2 m-b-10">
						<input v-model="article.online" 
								type="checkbox" 
								class="custom-control-input" 
								id="article-online">
						<label class="custom-control-label c-p" 
								for="article-online">
							Online
						</label>
					</div>
				</div>
			</div>
			<div class="col-12 col-md-4" v-if="canUse('article.uncontable', user)" data-step="2" data-intro="Marque esta opcion si su articulo se vender por cantidades. Entonces se le pedira el precio por la unidad que seleccione (kilos o gramos).">
				<div class="form-group m-b-0">
					<div class="custom-control custom-checkbox my-1 mr-sm-2 m-b-10">
						<input v-model="article.uncontable" 
								type="checkbox" 
								true-value="1"
								false-value="0"
								class="custom-control-input" 
								id="article-uncontable">
						<label class="custom-control-label c-p" 
								for="article-uncontable">
							Incontable
						</label>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>
<script>
export default {
	props: ['article', 'user'], 
	data() {
		return {
			remember_date: false,
			current_date: true,
		}
	},
	methods: {
		remember_date_() {
			this.remember_date = true
		},
	},
}
</script>
<style scoped>
	
</style>
