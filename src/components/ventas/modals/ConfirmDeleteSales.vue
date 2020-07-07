<template>
<b-modal id="delete-sales" title="Eliminar ventas seleccionadas">
    <b-container fluid>
        <b-row>
            <b-col>
                <p>{{ message }}</p>
                <p class="m-0">Se repondran las unidades de sus artículos</p>
            </b-col>
        </b-row>
    </b-container>
    <template v-slot:modal-footer>
        <b-button 
        variant="danger" 
        @click="deleteSales">
            <i class="icon-trash-3" v-show="!deleting_sales"></i>
            <span v-show="deleting_sales" 
                class="spinner-border spinner-border-sm"></span>
            {{ button_text }}
        </b-button>
    </template>
</b-modal>
</template>
<script>
export default {
  props: ['selected_sales', 'deleting_sales'],
    computed: {
        message() {
            if (this.selected_sales.length > 1) {
                return `¿Seguro que quiere eliminar estas ${this.selected_sales.length} ventas?`
            }      
            return '¿Seguro que quiere eliminar esta venta?'
        },
        button_text() {
            if (this.selected_sales.length > 1) {
                return 'Eliminar ventas'
            } 
            return 'Eliminar venta'

        }
    },
	methods: {
        deleteSales() {
            this.$emit('deleteSales')
        }
	}
}
</script>