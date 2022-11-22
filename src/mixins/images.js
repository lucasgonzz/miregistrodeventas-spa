export default {
	methods: {
		image(model, from_model = false, cropped = true) {
			let url 
			let image_url = null
			let model_prop_url
			let image_prop_url
			if (!this.from_cloudinary) {
				model_prop_url = 'hosting_image_url'
				image_prop_url = 'hosting_url'
			} else {
				model_prop_url = 'image_url'
				image_prop_url = 'url'
			}
			if (!from_model) {
				if (model[model_prop_url]) {
					image_url = model[model_prop_url]
				} else if (model.images && model.images.length) {
					image_url = model.images[0][image_prop_url] 
				}
			} else {
				image_url = model[from_model][model_prop_url]
			}
			if (!this.is_local) {
				image_url = this.getProductionUrl(image_url)
			} 
			if (!this.from_cloudinary) {
				return image_url 
			} else if (image_url) {
				if (cropped) {
					url = `https://res.cloudinary.com/lucas-cn/image/upload/c_crop,g_custom,q_auto,f_auto/${image_url}`
				} else {
					url = `https://res.cloudinary.com/lucas-cn/image/upload/q_auto,f_auto/${image_url}`
				}
			} else {
				url = '@/assets/image-not-found.jpg'
			}
			return url
		},
		getProductionUrl(image_url) {
			if (image_url) {
				let position = image_url.indexOf('storage')
				let first = image_url.substring(0, position)
				let end = image_url.substring(position)
				return first+'public/'+end 
			}
		},
		uploadImage(model_name, model, commit = null, url = null) {
			this.$store.commit('auth/setMessage', 'Cargando interfaz de multimedia')
			this.$store.commit('auth/setLoading', true)
			setTimeout(() => {
				this.$store.commit('auth/setMessage', '')
				this.$store.commit('auth/setLoading', false)
			}, 5000)
			var myCropWidget = cloudinary.createUploadWidget(this.widget_info, (error, result) => { 
				if (result.event == 'success') {
					let image_url = result.info.path
					let link 
					if (url) {
						link = url 
					} else {
						link = `/${this.routeString(model_name)}/image/${model.id}`
					}
					this.$api.put(link, {
						image_url
					})
					.then(res => {
						if (commit) {
							this.$store.commit(commit, res.data.model)
						} else {
							this.addModel(model_name, res.data.model)
						}
					})
					.catch(err => {
						console.log(err)
						this.$toast.error('Error al guardar imagen')
					})
				}
			})
			myCropWidget.open()
		},
		showImages(article) {
			this.$store.commit('articles/setImagesToShow', article)
			this.$bvModal.show('article-images')
		},
		imageUrl(path = null, cropped = false, from_cloudinary = false) {
			if (path) {
				let url
				if (from_cloudinary) {
					if (cropped) {
						url = `https://res.cloudinary.com/lucas-cn/image/upload/c_crop,g_custom/${path}`
					} else {
						url = `https://res.cloudinary.com/lucas-cn/image/upload/${path}`
					}
				} else {
					url = path 
				}
				return url
			}
			return null
		},
		imageCropedUrlfromImage(image) {
			let url = `https://res.cloudinary.com/lucas-cn/image/upload/c_crop,g_custom/${image.url}`
			return url
		},
		articleImgFromQuestion(question) {
			let url
			if (question.variant_id) {
				let selected_variant = question.article.variants.find(variant => {
					return variant.id == question.variant_id
				})
				console.log(selected_variant)
				url = selected_variant.url
			} else {
				url = this.getFirstImage(question.article)
			}
			return `https://res.cloudinary.com/lucas-cn/image/upload/${url}`
		},
		articleImageUrl(article, cropped = true) {
			let url = `https://res.cloudinary.com/lucas-cn/image/upload`
			if (cropped) {
				url += `/c_crop,g_custom/${this.getFirstImage(article)}`
			} else {
				url += `/${this.getFirstImage(article)}`
			}
			return url
		},
		imageCropedUrlFromVariant(article) {
			let url = `https://res.cloudinary.com/lucas-cn/image/upload/c_crop,g_custom/${article.
				variant.url}`
			return url
		},
		getFirstImage(article) {
			if (article.images) {
				let first_image = article.images[0].url
				article.images.forEach(image => {
					if (image.first) {
						first_image = image.url
					}
				})
				return first_image
			}
			return null
		},
		uploadArticlePhoto(article) {
			var myCropWidget = cloudinary.createUploadWidget(this.widget_info, (error, result) => { 
				if (result.event == 'success') {
					let path = result.info.path
					this.$store.commit('articles/setLoading', true)
					this.$api.post(`/articles/image/${article.id}`, {
						path
					})
					.then(res => {
						this.$store.commit('articles/setLoading', false)
						let article = res.data.article
						console.log(article)
						this.$store.commit('articles/update', article)
						this.$store.commit('articles/setImagesToShow', article)
						this.$bvModal.hide('article-images')
						if (article.variants.length) {
							this.$bvModal.show('article-variants')
						}
					})
					.catch(err => {
						this.$store.commit('articles/setLoading', false)
						console.log(err)
						this.$toast.error('Error al guardar imagen')
					})
				}
			})
			myCropWidget.open()
		},
		uploadTitlePhoto(title) {
			var myCropWidget = cloudinary.createUploadWidget(this.widget_info, (error, result) => { 
				if (result.event == 'success') {
					let image_url = result.info.path
					this.$api.put(`/titles/image/${title.id}`, {
						image_url
					})
					.then(res => {
						this.$store.commit('titles/update', res.data.title)
					})
					.catch(err => {
						console.log(err)
						this.$toast.error('Error al guardar imagen')
					})
				}
			})
			myCropWidget.open()
		},
	},
	computed: {
		widget_info() {
			return {
				cloudName: 'lucas-cn', 
				uploadPreset: 'my_preset',
				sources: ['image_search', 'instagram', 'local','camera', 'facebook', 'google_drive'],
				googleApiKey: 'AIzaSyD10kzclyxnd_mSdMkgxXZJCoMsKJu8T6U',
				searchByRights: true,
				cropping: true,
				cropping_aspect_ratio: 1, 
				showSkipCropButton: false,
				language: "en",  
				text: {
					"en": {
						"or": "O",
						"back": "Atras",
						"advanced": "Avanzado",
						"close": "Cerrar",
						"no_results": "Sin resultados",
						"search_placeholder": "Buscar archivos",
						"about_uw": "Sobre el widget",
						"menu": {
							"files": "Mis archivos",
							"web": "Direccion Web",
							"camera": "Camara",
							"gdrive": "Google Drive",
							"facebook": "Facebook",
							"instagram": "Instagram",
							"image_search": "Internet",
						},
						"crop": {
							"title": "Cortar",
							"crop_btn": "Cortar",
							"skip_btn": "Omitir",
							"reset_btn": "Resetear",
							"close_btn": "Si",
							"close_prompt": "Cancelar la subida?",
							"image_error": "Error cargando la imagen",
							"corner_tooltip": "Arrastra la esquina para cambiar el tamaño",
							"handle_tooltip": "Arrastra la manija para cambiar el tamaño"
						},
						"local": {
							"browse": "Busca en tu pc",
							"main_title": "Subir archivos",
							"dd_title_single": "Arrastra la imagen aqui",
							"dd_title_multi": "Arrastra las imagenes aqui",
							"drop_title_single": "Solta el archivo aqui",
							"drop_title_multiple": "Solta los archivos aqui"
						},
			            "instagram": {
			                "no_auth_title": "Subi fotos desde tu cuenta de Instagram",
			                "no_auth_action": "Conectar a Instagram",
			                "header_title": "Tus ultimas fotos de Instagram",
			                "authenticating": "Autenticando"
			            },
			            "image_search": {
			                "main_title": "Buscar imagenes",
			                "inputPlaceholder": "Ingrese el codigo o nombre del artículo",
			                "customPlaceholder": "Search {{site}}",
			                "show_options": "Mostrar opciones",
			                "hide_options": "Cerrar opciones",
			                "filters_title": "Sitio",
			                "all": "Todo",
			                "rights": "Usage rights:",
			                "rights_options": {
			                    "not_filtered": "not filtered by licence",
			                    "free": "free to use or share",
			                    "free_com": "free to use or share, even commercially",
			                    "free_mod": "free to use share or modify",
			                    "free_mod_com": "free to use, share or modify, even commercially"
			                },
			                "search_error": "Error al buscar, intente denuevo por favor."
			            },
			            "queue": {
			                "title": "Fila para subir",
			                "title_uploading_with_counter": "Subiendo {{num}} fotos",
			                "title_uploading": "Subiendo archivos",
			                "mini_title": "Subido",
			                "mini_title_uploading": "Subiendo",
			                "show_completed": "Subida completada",
			                "retry_failed": "Reintento fallido",
			                "abort_all": "Abandonar todo",
			                "upload_more": "Subir mas",
			                "done": "Listo",
			                "mini_upload_count": "{{num}} sibidos",
			                "mini_failed": "{{num}} fallidas",
			                "statuses": {
			                    "uploading": "Subiedno...",
			                    "error": "Error",
			                    "uploaded": "Listo",
			                    "aborted": "Abandonado"
			                }
			            },
					}
  				},
				styles: {
					palette: {
						window: "#FFF",
						windowBorder: this.variant_color,
						tabIcon: this.variant_color,
						menuIcons: this.variant_color,
						textDark: this.variant_color,
						textLight: "#FFFFFF",
						link:  this.variant_color,
						action:  this.variant_color,
						inactiveTabIcon: this.variant_color,
						error: "#e3342f",
						inProgress: this.variant_color,
						complete: this.variant_color,
						sourceBg: "#FFF"
					},
					fonts: {
						"'Nunito', cursive": "https://fonts.googleapis.com/css?family=Nunito",
					},
				},
			}
		},
	},
}