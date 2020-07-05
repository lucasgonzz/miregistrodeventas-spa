<template>
<b-modal id="bar-codes" title="Codigos de barras" scrollable hide-footer>
	<b-container>
		<b-row class="m-b-15">
			<b-col>
				<b-card header="Crear un nuevo codigo" no-body>
					<b-card-body>
						<b-form-row class="m-0">
							<b-col>
								<b-form-group
								label="Codigo de barras"
								label-for="bar-code-name">
									<b-form-input
									type="text"
									id="bar-code-name"
									v-model="bar_code.name"
									autocomplete="off"
									placeholder="Ingrese el codigo de barras"></b-form-input>
								</b-form-group>
								<b-form-group>
									<b-button
									variant="success"
									size="sm"
									@click="generateCode">
										Generar
									</b-button>
								</b-form-group>
							</b-col>
						</b-form-row>
						<b-form-row>
							<b-col>
								<b-form-group
								label="Cuantas veces necesita imprimirlo"
								label-for="bar-code-amount">
									<b-form-input
									id="bar-code-amount"
									type="number"
									v-model="bar_code.amount"
									placeholder="Ingrese la cantidad de veces que necesita imprimirlo"></b-form-input>
								</b-form-group>
							</b-col>
						</b-form-row>
						<b-form-row>
							<b-col>
								<b-form-group
								label="Tamaño"
								label-for="bar-code-size">
									<b-form-radio
									v-model="bar_code.size"
									value="sm">
										Chico
									</b-form-radio>
									<b-form-radio
									v-model="bar_code.size"
									value="md">
										Mediano
									</b-form-radio>
									<b-form-radio
									v-model="bar_code.size"
									value="lg">
										Grande
									</b-form-radio>
								</b-form-group>
							</b-col>
						</b-form-row>
						<b-form-row>
							<b-col>
								<b-form-checkbox
								v-model="bar_code.text"
								:value="1"
								:unchecked-value="0">
									Numero debajo del código
								</b-form-checkbox>
							</b-col>
						</b-form-row>
					</b-card-body>
					<template v-slot:footer>
						<b-button
						variant="success"
						@click="saveBarCode">
							Generar código
						</b-button>
					</template>
				</b-card>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<p v-if="bar_codes.length > 0">
					No hay códigos generados aún
				</p>
				<b-card header="Códigos generados" no-body v-else>
					<b-card-header>
						<b-list-group>
							<b-list-group-item
							v-for="bar_code_ in bar_codes"
							:key="bar_code_.id">
								{{ bar_code_.name }}
							</b-list-group-item>
						</b-list-group>
					</b-card-header>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</b-modal>
</template>
	

					<!-- <div class="row m-t-20">
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
					</div> -->
<script>
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

			this.$toast.success('Codigo de barras copiado')
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
			document.getElementById('bar-code-amount').focus()
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
