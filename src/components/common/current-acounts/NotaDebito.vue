<template>
<b-modal 
v-if="from_model" 
id="current-acounts-nota-debito" 
title="Nota Credito" 
hide-footer>
    <b-form-group>
        <b-form-input
        type="number"
        min="0"
        @keydown.enter="save"
        :placeholder="placeholder"
        v-model="debe"></b-form-input>
    </b-form-group>
    <b-form-group>
        <b-form-textarea
        @keydown.enter="save"
        placeholder="Ingrese una descripcion"
        v-model="description"></b-form-textarea>
    </b-form-group>
    <b-form-group>
    	<b-button
        block
    	variant="primary"
    	@click="save">
    		<btn-loader
    		:loader="loading"
    		text="Registrar nota de debito"></btn-loader>
    	</b-button>
    </b-form-group>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'

import clients from '@/mixins/clients'
import current_acounts from '@/mixins/current_acounts'
export default {
	name: 'CurrentAcountNotaCredito',
    mixins: [clients, current_acounts],
    components: {
        BtnLoader
    },
    data() {
        return {
    	    debe: '',
            description: '',
            loading: false,
        }
    },
    computed: {
        placeholder() {
        	return `Ingrese el monto de la nota de debito para ${this.from_model.name}`
        },
    },
    methods: {
    	save() {
    		this.loading = true
    		this.$api.post('/current-acount/nota-debito', {
                model_id         : this.from_model.id,
    			model_name       : this.from_model_name,
                debe             : this.debe,
    			description      : this.description,
    		})
    		.then(res => {
                this.$store.dispatch('current_acount/getModels')
    			this.loading = false
    			this.$toast.success('Nota de debito registrada')
                this.$bvModal.hide('current-acounts-nota-debito')
                this.clear()
                // this.updateClient(this.client)
    		})
    		.catch(err => {
    			this.loading = false
    			console.log(err)
    			this.$toast.error('Error al registrar nota de debito')
    		})
    	},
        clear() {
            this.debe = ''
            this.description = ''
        }
    }
}
</script>
<style lang="sass">
</style>
