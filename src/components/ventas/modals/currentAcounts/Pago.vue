<template>
<b-modal v-if="client" id="current-acounts-pago" title="Pago" hide-footer>
    <b-form-group>
    	<b-form-input
    	type="number"
    	min="0"
        @keydown.enter="hacerPago"
    	:placeholder="placeholder"
    	v-model="pago"></b-form-input>
    </b-form-group>
    <b-form-group>
    	<b-button
        block
    	variant="primary"
    	@click="hacerPago">
    		<btn-loader
    		:loader="loading"
    		text="Registrar pago"></btn-loader>
    	</b-button>
    </b-form-group>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'CurrentAcountPago',
    components: {
    	BtnLoader
    },
    data() {
        return {
        	pago: '',
        	loading: false,
        }
    },
    computed: {
        client() {
            return this.$store.state.clients.current_acounts.client
        },
        title() {
            return `Cuentas corriente de ${this.client.name}`
        },
        placeholder() {
        	return `Ingrese el pago de ${this.client.name}`
        },
    },
    methods: {
    	hacerPago() {
    		this.loading = true
    		this.$api.post('/clients/pago', {
    			client_id: this.client.id,
    			pago:      this.pago,
    		})
    		.then(res => {
                // let client = this.client
                // client.current_acounts.push(res.data.current_acount)
                // this.$store.commit('clients/setClientCurrentAcounts', null)
                // this.$store.commit('clients/setClientCurrentAcounts', client)
                this.$store.dispatch('clients/current_acounts/getCurrentAcounts')
    			this.loading = false
    			this.$toast.success('Pago registrado correctamente')
                this.$bvModal.hide('current-acounts-pago')
                this.pago = ''
    		})
    		.catch(err => {
    			this.loading = false
    			console.log(err)
    			this.$toast.error('Error al registrar pago')
    		})
    	}
    }
}
</script>
<style lang="sass">
</style>
