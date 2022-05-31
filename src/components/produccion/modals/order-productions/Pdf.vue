<template>
	<div
	class="m-t-15"
	v-if="sub_view == 'planos'">
		<vue-pdf-embed 
		v-if="edit.pdf != ''"
		class="shadow m-b-15"
		:source="source"/>
		<b-row>
			<b-col
			md="9">
				<b-form-file
				class="m-b-15"
				:browse-text="text"
				v-model="file"
				variant="primary"
				:state="Boolean(file)"
				:placeholder="placeholder"
				drop-placeholder="Suelte el nuevo archivo aqui..."
				></b-form-file>
			</b-col>
			<b-col
			md="3">
				<b-button
				:disabled="!file"
				class="m-b-15"
				block
				@click="upload"
				variant="primary">
					<btn-loader
					text="Importar"
					:loader="loading_pdf"></btn-loader>
				</b-button>
			</b-col>
		</b-row>
		<p 
		v-if="edit.pdf == ''"
		class="text-with-icon">
			<i class="icon-pdf"></i>
			No hay ningun plano
		</p>
	</div>
</template>
<script>
import order_productions from '@/mixins/order_productions'
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
import BtnLoader from '@/components/common/BtnLoader'
export default {
	mixins: [order_productions],
	components: {
		VuePdfEmbed,
		BtnLoader,
	},
	data() {
		return {
			loading_pdf: false,
			file: null,
		}
	},
	computed: {
		source() {
			return process.env.VUE_APP_API_URL+'/order-productions/pdf/'+this.edit.pdf
		},
		text() {
			if (this.edit.pdf != '') {
				return 'Actualizar PDF'
			}
			return 'Seleccionar PDF'
		},
		placeholder() {
			if (this.edit.pdf != '') {
				return 'Seleccione un nuevo archivo o arrastrelo hasta aquí'
			}
			return 'Seleccione un archivo o arrastrelo hasta aquí'
		},
	},
	methods: {
		upload() {
			this.loading_pdf = true
			let config = {headers: { 'content-type': 'multipart/form-data' }}
			let form_data = new FormData();
			form_data.append('pdf', this.file);
			form_data.append('order_production_id', this.edit.id);
			this.$api.post('order-productions/pdf', form_data, config)
			.then(res => {
				this.loading_pdf = false
				this.file = null
				this.$store.commit('produccion/order_productions/update', res.data.order_production)
				this.$bvModal.hide('order-production-details')
			})
			.catch(err => {
				this.loading_pdf = false
				console.log(err)
			})
		}
	}
}
</script>