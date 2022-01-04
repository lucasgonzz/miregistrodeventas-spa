export default {
	methods: {
		showImages(article) {
			this.$store.commit('articles/setImagesToShow', article)
			this.$bvModal.show('article-images')
		},
		imageUrl(image) {
			let url = `https://res.cloudinary.com/lucas-cn/image/upload/${image.url}`
			return url
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
		uploadPhoto(article) {
			var myCropWidget = cloudinary.createUploadWidget({
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
						inactiveTabIcon: "#967FBF",
						error: "#e3342f",
						inProgress: this.variant_color,
						complete: this.variant_color,
						sourceBg: "#FFF"
					},
					fonts: {
						"'Nunito', cursive": "https://fonts.googleapis.com/css?family=Nunito",
					},
				},
			}, (error, result) => { 
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
	}
}