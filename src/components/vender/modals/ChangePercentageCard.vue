<template>
<b-modal id="change-percentage-card" title="Cambiar porcentaje de tarjeta">
    <b-container fluid>
        <b-row>
            <b-col>
                <b-form-group
                label="Nuevo porcentaje de tarjeta"
                label-for="new-percentage-card">
                    <b-form-input
                    type="number"
                    min="0"
                    max="100"
                    id="new-percentage-card"
                    v-model="new_percentage_card"
                    @keyup.enter="updatePercentageCard"
                    placeholder="Ingrese el nuevo porcentaje de tarjeta"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
    </b-container>
    <template v-slot:modal-footer>
        <b-button
        variant="primary"
        @click="updatePercentageCard">
            <i class="icon-check" v-show="!updating_percentage_card"></i>
            <span class="spinner-border spinner-border-sm" v-show="updating_percentage_card"></span>
            Actualizar
        </b-button>
    </template>
</b-modal>
</template>
<script>
export default {
    props: ['percentage_card', 'updating_percentage_card'],
    data() {
        return {
            new_percentage_card: '',
        }
    },
    methods: {
        updatePercentageCard() {
            this.$emit('updatePercentageCard', this.new_percentage_card)
            this.new_percentage_card = ''
        }
    },
}
</script>