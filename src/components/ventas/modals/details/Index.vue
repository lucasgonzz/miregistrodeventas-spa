<template>
<b-modal 
v-if="sale_details"
id="sale-details" 
:title="'Remito N° '+sale_details.num_sale" 
size="lg" 
hide-footer 
body-class="p-0">
    <sale-info></sale-info>
    <b-table
    responsive
    head-variant="dark"
    :fields="fields"
    :items="items"></b-table>
</b-modal>
</template>
<script>
import SaleInfo from '@/components/ventas/modals/details/SaleInfo'
import sales from '@/mixins/sales'
export default {
    name: 'SaleDetails',
    components: {
        SaleInfo,
    },
    mixins: [sales],
    computed: {
        fields() {
            return [
                {key: 'name', label: 'Nombre', class: 'text-center'},
                {key: 'amount', label: 'Cantidad', class: 'text-center', sortable: true},
                {key: 'price', label: 'Precio', class: 'text-center', sortable: true},
                {key: 'sub_total', label: 'Sub Total', class: 'text-center', sortable: true},
            ]
        },
        items() {
            let items = []
            this.sale_details.articles.forEach(article => {
                items.push({
                    name: article.name,
                    amount: article.pivot.amount,
                    price: this.price(article.pivot.price),
                    sub_total: this.price(article.pivot.price * article.pivot.amount),
                })
            })
            this.sale_details.combos.forEach(combo => {
                items.push({
                    name: 'combo '+combo.name,
                    amount: combo.pivot.amount,
                    price: this.price(combo.pivot.price),
                    sub_total: this.price(combo.pivot.price * combo.pivot.amount),
                })
            })
            console.log(items)
            return items
        },
    },
}
</script>
<style scoped lang="sass">
.col 
    padding: 0

.text-header 
    font-size: 1.2rem
.header-class 
    display: flex !important
    align-items: center !important
</style>
