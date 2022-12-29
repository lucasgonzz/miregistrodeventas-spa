<template>
	<b-dropdown
	right
	variant="primary"
	text="Mas">
		<b-dropdown-item
		@click="exportModels">
			<i class="icon-download"></i>
			Exportar excel {{ filter_advise }}
		</b-dropdown-item>
		<b-dropdown-item
		v-b-modal="'import-'+model_name">
			<i class="icon-download"></i>
			Importar excel {{ filter_advise }}
		</b-dropdown-item>
		<b-dropdown-item
		@click="print">
			<i class="icon-print"></i>
			Imprimir {{ filter_advise }}
		</b-dropdown-item>
	</b-dropdown>
</template>
<script>
import display from '@/mixins/display'
export default {
	mixins: [display],
	props: {
		model_name: String,
	},
	computed: {
		filters() {
			return this.$store.state[this.model_name].filters
		},
		filter_advise() {
			if (typeof this.filters != 'undefined' && this.filters.length) {
				return 'filtrados'
			}
			return ''
		}
	},
	methods: {
		exportModels() {
			let url = process.env.VUE_APP_API_URL+'/'+this.model_name+'/excel/export'
			window.open(url)	
		},
		print() {
			let url = process.env.VUE_APP_API_URL+'/'+this.model_name+'/pdf'
			if (typeof this.filters != 'undefined' && this.filters.length) {
				url += "?filters=" + JSON.stringify(this.filters)
			}
			window.open(url)
			return

			// window.open(url)		
			this.$axios.get(url, {
				params: {
					obj
				}
			})	
		},
	}
}
</script>