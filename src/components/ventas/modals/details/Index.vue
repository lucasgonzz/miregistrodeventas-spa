<template>
<b-modal 
v-if="sale_details"
id="sale-details" 
:title="'Remito N° '+sale_details.num_sale" 
size="xl" 
hide-footer 
body-class="p-0">
    <budget-info></budget-info>
    <sale-info></sale-info>
    <div
    class="p-15">
        <b-table
        class="shadow-2 b-r-1"
        v-if="!sale_details.budget"
        responsive
        head-variant="dark"
        :fields="fields"
        :items="items"></b-table>
    </div>
</b-modal>
</template>
<script>
import BudgetInfo from '@/components/ventas/modals/details/BudgetInfo'
import SaleInfo from '@/components/ventas/modals/details/SaleInfo'
import sales from '@/mixins/sales'
export default {
    name: 'SaleDetails',
    components: {
        BudgetInfo,
        SaleInfo,
    },
    mixins: [sales],
    computed: {
        fields() {
            let fields = [
                {key: 'name', label: 'Nombre', class: 'text-center'},
                {key: 'price', label: 'Precio', class: 'text-center', sortable: true},
                {key: 'discount', label: 'Descuento', class: 'text-center', sortable: true},
                {key: 'amount', label: 'Cantidad', class: 'text-center', sortable: true},
                {key: 'returned_amount', label: 'U. Devueltas', class: 'text-center', sortable: true},
            ]
            if (this.hasExtencion('acopios')) {
                fields.push(
                    {key: 'delivered_amount', label: 'U. Entregadas', class: 'text-center', sortable: true},
                    {key: 'acopio', label: 'En acopio', class: 'text-center', sortable: true},
                )
            }
            fields.push(
                {key: 'sub_total', label: 'Total', class: 'text-center', sortable: true},
            )
            return fields
        },
        items() {
            let items = []
            this.sale_details.articles.forEach(article => {
                items.push({
                    name: article.name,
                    amount: article.pivot.amount,
                    returned_amount: article.pivot.returned_amount,
                    delivered_amount: article.pivot.delivered_amount,
                    acopio: article.pivot.amount - article.pivot.delivered_amount,
                    discount: article.pivot.discount,
                    price: this.price(article.pivot.price),
                    sub_total: this.price(this.getTotalArticle(article, true)),
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
            this.sale_details.services.forEach(service => {
                items.push({
                    name: 'servicio '+service.name,
                    amount: service.pivot.amount,
                    discount: service.pivot.discount,
                    price: this.price(service.price),
                    sub_total: this.price(this.getTotalArticle(service, true)),
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
