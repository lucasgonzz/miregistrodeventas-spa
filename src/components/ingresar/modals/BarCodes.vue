<template>
	<div class="modal fade" id="bar-codes">
		<div class="modal-dialog modal-dialog-scrollable">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">
						<strong>
							<i class="icon-barcode"></i>
							Codigos de barras
						</strong>
					</h5>
					<button class="close" data-dismiss="modal">
						<i class="icon-cancel"></i>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col">
							<div class="card">
								<div class="card-header">
									<strong>
										Genere un nuevo codigo de barras
									</strong>
								</div>
								<div class="card-body">
									<div class="form-group">
										<label for="bar-code">Codigo</label>
										<input v-model="bar_code.name"
												type="text" 
												placeholder="Ingrese su nuevo codigo de barras" 
												id="bar-code"
												autocomplete="off" 
												class="form-control">
										<button @click.prevent="generateCode"
												class="btn btn-success btn-sm m-t-5">
											<i class="icon-refresh"></i>
											Generar codigo
										</button>
									</div>
									<div class="form-group">
										<label for="bar-code-amount">
											Cuantas veces necesita imprimirlo
										</label>
										<input v-model="bar_code.amount"
												id="bar-code-amount"
												type="number" 
												min="0" 
												placeholder="Cantidad de veces que se imprimira" 
												class="form-control">
									</div>
									<div class="form-group">
										<label>Tamaño</label>
										<div class="custom-control custom-radio">
											<input type="radio" 
											v-model="bar_code.size" 
											value="lg" id="lg" 
											class="custom-control-input">
											<label class="custom-control-label" for="lg">Grande</label>
										</div>
										<div class="custom-control custom-radio">
											<input type="radio" 
											v-model="bar_code.size" 
											value="md" id="md" 
											class="custom-control-input">
											<label class="custom-control-label" for="md">Normal</label>
										</div>
										<div class="custom-control custom-radio">
											<input type="radio" 
											v-model="bar_code.size" 
											value="sm" id="sm" 
											class="custom-control-input">
											<label class="custom-control-label" for="sm">Chico</label>
										</div>
									</div>
									<div class="form-group">
										<div class="custom-control custom-checkbox my-1 mr-sm-2">
											<input type="checkbox" 
											v-model="bar_code.text" 
											class="custom-control-input"  
											id="bar-code-text">
											<label class="custom-control-label c-p" for="bar-code-text">
											Colocar numero debajo del código
											</label>
										</div>
									</div>
								</div>
								<div class="card-footer">
									<button class="btn btn-primary"
										@click.prevent="saveBarCode"
										:class="bar_code.name && bar_code.amount > 0 ? '' : 'disabled'"
										target="_blank">
										<i class="icon-check"></i>
										Generar codigo
									</button>
								</div>
							</div>
						</div>
					</div>

					<div class="row m-t-20">
						<div class="col">
							<div class="card">
								<div class="card-header">
									<strong>
										Codigos generados
									</strong>
								</div>
								<div class="card-body">
									<p class="card-text text-center" v-show="bar_codes.length == 0">
										<strong>
											No hay codigos de barras aun.
										</strong>
									</p>
									<ul class="list-group" v-show="bar_codes.length">
										<li v-for="bar_code_ in bar_codes" 
											:key="bar_code_.id"
											class="list-group-item c-p">
											<div class="row">
												<div class="col">
													<div class="form-group m-b-5">
														<input type="text" 
																:id="'bar-code-text-'+bar_code_.id"
																:value="bar_code_.name"
																class="form-control disabled m-b-5">
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col">
													<button @click.prevent="copyText(bar_code_)"
															class="btn btn-success btn-sm">
														Copiar
													</button>
													<button class="btn btn-primary btn-sm"
															v-show="bar_code_.article === null"
															@click="useCode(bar_code_)">
														Usar
													</button>
													<button class="btn btn-primary btn-sm"
															v-if="bar_code_.article">
															usado en {{ bar_code_.article.name }}
															{{ price(bar_code_.article.price) }}
													</button>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import toastr from 'toastr'
export default {
	props: ['article'],
	data() {
		return {
			bar_codes: [],
			bar_codes_articles: [],
			bar_code: {
				name: '',
				amount: 0,
				size: 'md',
				text: false,
			},
			bar_code_details: {
				article: {},
			},
			repeated_bar_code: false

		}
	},
	methods: {
		copyText(bar_code) {
			// Obtiene el id del input
			var bar_code_text_id = '#bar-code-text-'+bar_code.id

			// Guarda el input en una varialbe con el nombre del input
			var input = this.$jQuery(bar_code_text_id)

			// Selecciona el contenido del campo
			input.select();

			// Copia el texto seleccionado
			document.execCommand("copy");

			toastr.success('Codigo de barras copiado')
			this.$jQuery('#bar-codes').modal('hide')
		},
		useCode(bar_code) {
			this.article.bar_code = bar_code.name
			this.$jQuery('#bar-codes').modal('hide')
			this.$jQuery('#name').focus()
		},
		generateCode() {
			var bar_code = 1
			var bar_codes = []
			this.bar_codes.forEach(barCode => {
				bar_codes.push(Number(barCode.name))
			})
			this.bar_codes_articles.forEach(bar_code_article => {
				bar_codes.push(Number(bar_code_article))
			})

			while (bar_codes.includes(bar_code)) {
				bar_code++
			}
			bar_code = String(bar_code)
			var largo = bar_code.length
			var bc = '0000000000000'
			bc = bc.slice(0, 12-largo)
			bar_code = bc + bar_code
			this.bar_code.name = bar_code
			this.$jQuery('#bar-code-amount').focus()
		},
		saveBarCode() {
			var codigo_repetido = false
			if (!codigo_repetido) {
				window.open(this.getLink())
				setTimeout(() => {
					this.getBarCodes()
				}, 1000)
				this.bar_code.name = ''
				this.bar_code.amount = 0
			}
		},
		getBarCodes() {
			this.$api.get('bar-codes')
			.then( res => {
				this.bar_codes = res.data
			})
			.catch( err => {
				console.log(err)
			})
		},
		getBarCodesArticles() {
			this.$api.get('articles/bar-codes')
			.then( res => {
				this.bar_codes_articles = res.data
			})
			.catch( err => {
				console.log(err)
			})
		},
		getLink() {
			return 'bar-codes/'
					+this.bar_code.name+'/'
					+this.bar_code.amount+'/'
					+this.bar_code.size+'/'
					+this.bar_code.text
		},
	},
	created() {
		// this.getBarCodes()
		// this.getBarCodesArticles()
	}
}
</script>
<style scoped>
	
</style>
