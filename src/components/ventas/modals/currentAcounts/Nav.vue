<template>
	<b-form 
	@submit.prevent="getCurrentAcounts"
	class="p-15"
	inline>
		<label>Mostrar cuentas corrientes de </label>
		<b-form-input
		v-model="months_ago"
		class="input"
		min="1"
		type="number"></b-form-input>
		<label>meses atras</label>
		<b-button
		type="submit"
		variant="primary"
		class="m-l-15">
			Buscar
		</b-button>
		<b-button
		@click="print"
		variant="danger"
		class="m-l-15">
			<i class="icon-print"></i>
			<span
			v-show="selected_currents_acounts.length">
				{{ selected_currents_acounts.length }}
			</span>
			<span
			v-show="!selected_currents_acounts.length">
				todas
			</span>
		</b-button>
		<b-button
		@click="checkSaldos"
		variant="primary"
		class="m-l-15">
			<btn-loader
			:loader="loading_check_saldos"
			text="Checkear saldos"></btn-loader>
		</b-button>
	</b-form>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'CurrentAcountsNav',
	components: {
		BtnLoader
	},
	computed: {
		months_ago: {
			set(value) {
				this.$store.commit('clients/current_acounts/setMonthsAgo', value)
			},
			get() {
				return this.$store.state.clients.current_acounts.months_ago
			}
		},
		loading() {
			return this.$store.state.clients.current_acounts.loading
		},
		loading_check_saldos() {
			return this.$store.state.clients.current_acounts.loading_check_saldos
		},
        client() {
            return this.$store.state.clients.current_acounts.client
        },
        selected_currents_acounts() {
            return this.$store.state.clients.current_acounts.selected
        },
	},
	methods: {
		getCurrentAcounts() {
			this.$store.dispatch('clients/current_acounts/getCurrentAcounts')
		},
		checkSaldos() {
			this.$store.dispatch('clients/current_acounts/checkSaldos')
			.then(() => {
				this.$toast.success('Saldos checkeados')
				this.getCurrentAcounts()				
			})
		},
		print() {
			let link = ''
			if (this.selected_currents_acounts.length) {
				let ids = []
				this.selected_currents_acounts.forEach(current_acount => {
					ids.push(current_acount.id)
				})
            	link = process.env.VUE_APP_API_URL+'/current-acounts/pdf/'+ids.join('-')
			} else {
            	link = process.env.VUE_APP_API_URL+'/current-acounts/pdf/'+this.client.id+
            	'/'+this.months_ago
			}
            window.open(link)
		},
	}
}
</script>
<style scoped lang="sass">
.input 
	width: 70px
	margin: 0 1em
</style>