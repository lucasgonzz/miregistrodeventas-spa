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
		articleImageUrl(article, cropped = true) {
			let url = `https://res.cloudinary.com/lucas-cn/image/upload`
			if (cropped) {
				url += `/c_crop,g_custom/${this.getFirstImage(article)}`
			} else {
				url += `/${this.getFirstImage(article)}`
			}
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
				sources: ['camera', 'local', 'instagram', 'image_search', 'facebook', 'google_drive'],
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
						windowBorder: "#4a2c82",
						tabIcon: "#4a2c82",
						menuIcons: "#967FBF",
						textDark: "#4a2c82",
						textLight: "#FFFFFF",
						link:  "#4a2c82",
						action:  "#4a2c82",
						inactiveTabIcon: "#967FBF",
						error: "#e3342f",
						inProgress: "#4a2c82",
						complete: "#4a2c82",
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