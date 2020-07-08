<template>

<!-- Modal -->
<div class="modal fade" id="change-percentage-card" tabindex="-1" role="dialog" aria-labelledby="ventas-resumens" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    <strong>
                        Cambiar porcentaje de tarjeta
                    </strong>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="new_percentage_card">
                        Nuevo porcentaje
                    </label>
                    <input type="number"
                            min="1" 
                            max="100" 
                            id="new_percentage_card"
                            @keyup.enter="updatePercentageCard"
                            class="form-control"
                            v-model="percentage_card_">
                    <small class="text-muted">Porcentaje actual: {{ percentage_card }}%</small>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary"
                            @click="updatePercentageCard">
                        <i v-show="!updating_percentage_card"
                            class="icon-refresh"></i>
                        <span v-show="updating_percentage_card"
                                class="spinner-border spinner-border-sm m-r-5" role="status" aria-hidden="true"></span>
                        Actualizar porcentaje
                    </button>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props: ['percentage_card', 'updating_percentage_card'],
    data() {
        return {
            percentage_card_: 0,
        }
    },
    methods: {
        updatePercentageCard() {
            this.$emit('updatePercentageCard', this.percentage_card_)
            this.percentage_card_ = 0
        }
    },
}
</script>