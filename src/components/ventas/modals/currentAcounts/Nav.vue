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
        client() {
            return this.$store.state.clients.current_acounts.client
        },
	},
	methods: {
		getCurrentAcounts() {
			this.$store.dispatch('clients/current_acounts/getCurrentAcounts')
		},
		print() {
            var link = process.env.VUE_APP_API_URL+'/current-acounts/pdf/'+this.client.id+
            '/'+this.months_ago
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