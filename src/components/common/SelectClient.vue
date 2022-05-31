<template>
    <b-form-group>
        <autocomplete 
        :search="search" 
        auto-select
        :get-result-value="getResultValue"
        placeholder="Buscar un cliente..."
        @submit="setClient"></autocomplete>
    </b-form-group>
</b-modal>
</template>
<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
export default {
    components: {
        Autocomplete
    },
    computed: {
        clients() {
            return this.$store.state.clients.clients
        },
    },
    methods: {
        search(input) {
            if (input.length < 1) { return [] }
            return this.clients.filter(client => {
                return client.name.toLowerCase().includes(input.toLowerCase())
            })
        },
        getResultValue(client) {
            let res = client.name
            if (client.surname) {
                res += ' ' + client.surname
            }
            return res
        },
        setClient(client) {
            this.$emit('setClient', client)
        },
    }
}
</script>
<style>
.client-name {
    font-size: 1rem;
}
</style>  