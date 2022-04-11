<template>
	<b-card 
	class="shadow-5 b-r-1 title-image"
	title="Imagenes">
		<div
		v-for="(title, index) in titles"
		:key="title.id"
		class="title">
			<p
			@click="setShow(title)"
			:class="show(title) ? 'text-bold' : ''"
			class="sub-title c-p">
				<i 
				v-if="show(title)"
				class="icon-up"></i>
				<i 
				v-else
				class="icon-down"></i>
				Imagen {{ index + 1}}
			</p>
			<div
			v-show="show(title)">
				<b-form-input
				class="m-b-15"
				v-model="title.header"
				placeholder="Titulo"></b-form-input>
				<b-form-textarea
				class="m-b-15"
				v-model="title.lead"
				placeholder="Texto"></b-form-textarea>
				<div
				:id="'cont-img-'+title.id"
				class="cont-img"
				v-if="title.image_url">
					<img 
					class="s b-r-1"
					:id="'image-'+title.id"
					:src="imageUrl(title.image_url)">
					<b-button 
					@click="uploadTitlePhoto(title)"
					variant="primary">
						Cambiar imagen
					</b-button>
				</div>
				<b-button 
				v-else
				@click="uploadTitlePhoto(title)"
				variant="primary">
					Subir imagen
				</b-button>
				<div
				class="cont-color-picker"
				:id="'cont-color-picker-'+title.id">
					<p>
						Color de fondo
					</p>
					<color-picker
					class="shadow-2 b-r-1"
					:colors-default="[]"
					theme="light"
					:color="title.color"
					:sucker-hide="false"
					:sucker-canvas="suckerCanvas"
					:sucker-area="suckerArea"
					@changeColor="changeColor"
					@openSucker="openSucker(title)"/>
	                <!-- <img v-if="is_open_sucker" ref="cover" /> -->
	                <img v-if="is_open_sucker == title.id" :ref="'cover-'+title.id" :id="'cover-'+title.id" />
				</div>
				<b-button 
				block
				class="m-t-15"
				@click="update(title)"
				variant="primary">
					<btn-loader
					:loader="loading"
					text="Actualizar"></btn-loader>
				</b-button>
			</div>
			<hr>
		</div>
		<b-button 
		block
		class="m-t-15"
		@click="addTitle"
		variant="primary">
			<btn-loader
			:loader="adding"
			text="Agregar imagen"></btn-loader>
		</b-button>
	</b-card>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import VueHorizontalList from "vue-horizontal-list"
import ColorPicker from '@caohenghu/vue-colorpicker'
export default {
	components: {
		BtnLoader,
		VueHorizontalList,
		ColorPicker,
	},
	computed: {
		titles() {
			return this.$store.state.titles.titles
		}
	},
	data() {
		return {
			loading: false,
			adding: false,
            suckerCanvas: null,
            suckerArea: [],
            is_open_sucker: 0,
            shows: [],
			options: {
				responsive: [
					{ size: 1 },
				],
				list: {
					// 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
					windowed: 0,

					// Because: #app {padding: 80px 24px;}
					padding: 20,
				},
				position: {
					start: 0,
				},
				navigation: {
					// when to show navigation
					start: 0,
					color: "#000",
				},
				autoplay: { play: false, repeat: false, speed: 2500 },
			},
		}
	},
	methods: {
		show(title) {
			return this.shows.includes(title.id)
		},
		setShow(title) {
			let index = this.shows.findIndex(id => {
				return id == title.id
			})
			if (index != -1) {
				this.shows.splice(index, 1)
			} else {
				this.shows.push(title.id)
			}
			console.log(this.shows)
		},
		changeColor(color) {
            console.log(color)
            let index = this.titles.findIndex(t => {
            	return t.id == this.selected_title.id
            })
            this.titles[index].color = color.hex
        },
        openSucker(title) {
            // this.is_open_sucker = isOpen
            if (this.is_open_sucker == title.id) {
            	this.is_open_sucker = 0
            } else {
            	this.is_open_sucker = title.id
            	this.selected_title = title
            }
            if (this.is_open_sucker == title.id) {
                setTimeout(() => {
                    const cover = this.$refs['cover-'+title.id][0]
                    console.log('cover:')
                    console.log(cover)
                    setTimeout(() => {
                        // 如果已经点击取消了才加载完，则不执行
                    	console.log('onload')
                        if (!this.is_open_sucker) {
                            return
                        }
                        const coverRect = cover.getBoundingClientRect()
                        const canvas = this.createCanvas(cover, coverRect)
						document.getElementById("cont-color-picker-"+title.id).appendChild(canvas)
                        this.suckerCanvas = canvas
                        this.suckerArea = [
                            coverRect.left,
                            coverRect.top,
                            coverRect.left + coverRect.width,
                            coverRect.top + coverRect.height
                        ]
                    }, 500)
                    cover.setAttribute('crossorigin', 'Anonymous')
                    cover.src = this.imageUrl(title.image_url)
                }, 10)
            } else {
                this.suckerCanvas && this.suckerCanvas.remove()
            }
        },
        createCanvas(cover, coverRect) {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.width = coverRect.width
            canvas.height = coverRect.height
            console.log('width: '+coverRect.width)
            console.log('height: '+coverRect.height)
            console.log('top: '+coverRect.top)
            console.log('left: '+coverRect.left)

            ctx.drawImage(cover, 0, 0, coverRect.width, coverRect.height)
            Object.assign(canvas.style, {
                position: 'absolute',
                left: '50%',
                top: '25%',
                // left: coverRect.left + 'px',
                // top: coverRect.top + 'px',
                opacity: 0
            })
            return canvas
        },
		addTitle() {
			this.adding = true
			this.$api.post('titles')
			.then(res => {
				this.adding = false
				this.$store.commit('titles/add', res.data.title)
				this.$toast.success('Imagen creado')
			})
			.catch(err => {
				console.log(err)
				this.adding = false
				this.$toast.error('Error al agregar imagen')
			})
		},
		update(title) {
			this.loading = true 
			this.$api.put('titles', title)
			.then(res => {
				this.loading = false 
				this.$store.commit('titles/update', res.data.title)
				this.$toast.success('Titulo actualizado')
			})
			.catch(err => {
				this.loading = false 
				this.$toast.error('Error al actualizar')
				console.log(err)
			})
		}
	}
}
</script>
<style lang="sass">
.title-image
	.title 
		width: 100%
		.cont-img 
			display: flex
			width: 100%
			justify-content: space-around
			align-items: center
			margin-bottom: 15px
			position: relative
			&:hover
				.btn 
					display: block
			img 	
				width: 100%
			.btn 
				display: none
				position: absolute
			// canvas
			// 	top: 0
			// 	left: 25%
			// 	position: absolute
			// 	width: 50%
			// 	height: 100%
			// 	border: 1px solid #000 !important
		.cont-color-picker
			position: relative
			.hu-color-picker
				width: 220px !important
			// display: flex
			// align-items: center
			// justify-content: space-around
			img
				position: absolute
				left: 50%
				top: 25%
				width: 50%
		.col-form-label
			font-size: .7em 
</style>