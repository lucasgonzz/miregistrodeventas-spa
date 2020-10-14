<template>
	<b-modal
	title="Titulo de la tienda"
	id="title"
	hide-footer>
		<b-container>
			<b-row>
				<b-col>
					<b-form-group>
						<b-form-input
						@keydown.enter="updateTitle"
						type="text"
						v-model="title.header"
						placeholder="Titulo"></b-form-input>
					</b-form-group>
					<b-form-group>
						<b-form-input
						@keydown.enter="updateTitle"
						type="text"
						v-model="title.lead"
						placeholder="Pie"></b-form-input>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<b-button
					@click="updateTitle"
					variant="primary"
					block>
						<btn-loader
						:loading="updating"></btn-loader>
						Guardar
					</b-button>
				</b-col>
			</b-row>
		</b-container>
	</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'Title',
	components: {
		BtnLoader
	},
	data() {
		return {
			title: {},
			updating: false,
		}
	},
	methods: {
		getTitle() {
			this.$api.get('/online/titles')
			.then(res => {
				console.log(res.data.title)
				this.title = res.data.title
			})
			.catch(err => {
				console.log(err)
			})
		},
		updateTitle() {
			this.updating = true
			this.$api.put('/online/titles', this.title)
			.then(() => {
				this.updating = false
				this.$bvModal.hide('title')
				this.$toast.success('Titulo actualizado correctamente')
			})
			.catch(err => {
				this.updating = false
				console.log(err)
				this.$toast.error('Error al actualizar el titulo')
			})
		}
	},
	created() {
		this.getTitle()
	}
}
</script>