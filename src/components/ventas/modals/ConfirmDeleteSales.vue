<template>
<b-modal id="delete-sales" hide-footer hide-header size="sm">
    <b-container>
        <b-row>
            <b-col>
                <p
                class="text-center">¿Seguro que quiere eliminar las venta seleccionadas? Se repondran los articulos</p>
                <b-button
                block
                @click="deleteSales"
                variant="danger">
                    <btn-loader
                    text="Eliminar"
                    :loader="loading"></btn-loader>
                </b-button>
            </b-col>
        </b-row>
    </b-container>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
    name: 'DeleteSales',
    components: {
        BtnLoader
    },
    data() {
        return {
            loading: false
        }
    },
    computed: {
        selected_sales() {
            return this.$store.state.sales.selected_sales
        }
    },
    methods: {
        deleteSales() {
            this.loading = true
            let sales_id = []
            this.selected_sales.forEach(sale => {
                sales_id.push(sale.id)
            })
            this.$api.delete('sales/'+sales_id.join('-'))
            .then(() => {
                this.loading = false
                this.$bvModal.hide('delete-sales')
                console.log(this.selected_sales)
                this.$store.commit('articles/updateStock', this.selected_sales)
                this.$store.commit('sales/delete')
                this.$store.commit('sales/setTotal')
                this.$toast.success('Venta eliminada')
            })
            .catch((err) => {
                this.$toast.error('Error al eliminar la venta, intentelo mas tarde')
                this.loading = false
                console.log(err)
            })
        },
    }
}
</script>