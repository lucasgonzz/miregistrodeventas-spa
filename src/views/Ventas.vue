<template>
<div id="ventas">	
<!-- MODALS -->
    <confirm
    text="las ventas seleccionadas"
    :actions="['sale/delete']"
    id="delete-sales"
    toast="Ventas eliminadas"
    @finished="checkClientsSaldos"></confirm>

    <confirm
    :text="text_afip"
    emit="checkAfipTicket"
    @checkAfipTicket="checkAfipTicket"
    id="afip-confirmation"
    btn_text="Confirmar"
    variant="primary"
    not_show_delete_text></confirm>

	<current-acounts></current-acounts>
	<sellers></sellers>
	<commissioners></commissioners>
	
	<sale-details></sale-details>
	<update-prices></update-prices>

	<print-sales></print-sales> 

<!-- COMPONENTS -->
	<previus-days></previus-days>

	<total-dropdown-print-info></total-dropdown-print-info>

	<address-nav></address-nav>
	<employee-nav></employee-nav>

	<table-sales 
	@selectAllSales="selectAllSales"></table-sales>
</div> 
</template>
<script>
// Librerias
import moment from 'moment'

// Modals
import CurrentAcounts from '@/components/common/current-acounts/Index' 

import SaleDetails from '../components/ventas/modals/details/Index'
import UpdatePrices from '../components/ventas/modals/update-prices/Index'
import Confirm from '@/components/common/Confirm.vue'
import PrintSales from '../components/ventas/modals/PrintSales.vue'
import Commissioners from '../components/ventas/modals/commissioners/Index.vue'
import Sellers from '../components/ventas/modals/Sellers'

import PreviusDays from '@/components/ventas/components/PreviusDays'
import TotalDropdownPrintInfo from '../components/ventas/components/total-dropdown-print-info/Index.vue' 
import AddressNav from '@/components/ventas/components/AddressNav'
import EmployeeNav from '@/components/ventas/components/EmployeeNav'
import TableSales from '../components/ventas/components/TableSales.vue'

import clients from '@/mixins/clients'
import print_sale from '@/mixins/print_sale'
import afip_ticket from '@/mixins/afip_ticket'
export default {
	mixins: [clients, print_sale, afip_ticket],
	components: {
		// Modals 
		CurrentAcounts,
		SaleDetails,
		UpdatePrices,
		Confirm,
		PrintSales,
		Commissioners,
		Sellers,

		// Components
		PreviusDays,
		TotalDropdownPrintInfo,
		AddressNav,
		EmployeeNav,
		TableSales,
	},
	computed: {
		selected_sales() {
			return this.$store.state.sale.selected
		},
		text_afip() {
			return '¿Seguro que quiere hacer una factura para esta venta?'
		}
	},
	beforeRouteLeave(to, from, next) {
		this.$store.commit('sale/setSelected', [])
		next()
	},
	methods: {
		// Header title
        checkClientsSaldos() {
            this.selected_sales.forEach(sale => {
                if (sale.client) {
                    this.updateClient(client)
                }
            })
        },
		// Ventas seleccionadas
		selectAllSales() {
			if (!this.selected_sales.is_all_selected) {
				console.log('no estan seleccionadas')
				this.sales.forEach(sale => {
					if (!this.selected_sales.selected_sales.includes(sale.id)) {
						this.selected_sales.selected_sales.push(sale.id)
					}
				})
			} else {
				console.log('estan seleccionadas')
				this.sales.forEach(sale => {
					var i = this.selected_sales.selected_sales.indexOf(sale.id)
					this.selected_sales.selected_sales.splice(i, 1)
				})
				// this.selected_sales.selected_pages.splice(index, 1)
			}
		},

		// Desde una fecha
		// fromDate(from = this.from, to = this.to, last_day_inclusive = this.last_day_inclusive) {
		// 	this.is_loading = true
		// 	this.$bvModal.hide('from-date')
		// 	this.from = from
		// 	this.to = to
		// 	if (last_day_inclusive == '0') {
		// 		this.last_day_inclusive = false
		// 	} else {
		// 		this.last_day_inclusive = true
		// 	}
		// 	this.$api.get('sales/from-date/'+this.from+'/'+this.to+'/'+last_day_inclusive)
		// 	.then(res => {
		// 		this.is_loading = false
		// 		if (res.data == false) {
		// 			this.$toast.error('No hay ventas entre estas fechas')
		// 			this.getSales()
		// 		} else {
		// 			this.sales = res.data
		// 			this.is_from_only_one_date = false
		// 			this.is_from_date = true
		// 		}
		// 	})
		// 	.catch(err => {
		// 		console.log(err)
		// 	})
		// },
		// onlyOneDate(date) {
		// 	this.only_one_date = date			
		// 	this.is_loading = true
		// 	// if (this.hasPermissionToShowAllSales()) {
		// 		this.$bvModal.hide('from-date')
		// 		this.$api.get('sales/only-one-date/'+date)
		// 		.then(res => {
		// 			this.is_loading = false
		// 			// Se falsea que se estan mostrando las ventas de un cliente
		// 			// para que no aparesca el nombre del cliente en el titulo
		// 			this.sales_from_client = false
		// 			this.selected_sales.is_all_selected = false
		// 			this.is_from_only_one_date = true
		// 			this.sale_time = 0
		// 			this.sales = res.data
		// 			if (!this.hasPermissionToShowAllSales()) {
		// 				this.changeSaleTimeAllowed()
		// 			}
		// 		})
		// 		.catch(err => {
		// 			console.log(err)
		// 		})
		// 	// } else {
		// 	// 	this.changeSaleTimeAllowed()
		// 	// }
		// },
		// changeSaleTimeAllowed() {
		// 	var permiso_encontrado = false
		// 	this.sales_times.forEach(sale_time => {
		// 		if (!permiso_encontrado) {
		// 			if (this.hasPermissionToShowSaleTime(sale_time)) {
		// 				this.changeSaleTime(sale_time)
		// 				permiso_encontrado = true
		// 			}
		// 		}
		// 	})
		// },
		// changeSaleTime(sale_time) {
		// 	console.log('changeSaleTime')
		// 	this.is_loading = true
		// 	var link = 'sales/from-sale-time/'
		// 	var horaInicio = moment(sale_time.from, 'h:mma')
		// 	var horaFin = moment(sale_time.to, 'h:mma')
		// 	if (!horaInicio.isBefore(horaFin)) {
		// 		this.show_date = true
		// 	} else {
		// 		this.show_date = false
		// 	}
		// 	if (sale_time.showInModal) {
		// 		link += sale_time.id + '/0'
		// 	} else {
		// 		link += sale_time.id_to_send + '/1' 
		// 	}
		// 	if (this.only_one_date != '') {
		// 		link += '/'+this.only_one_date
		// 	}
		// 	console.log(`link: ${link}`)
		// 	this.$api.get(link)
		// 	.then(res => {
		// 		this.is_loading = false
		// 		this.sales = res.data
		// 		if (this.sale_time != sale_time.id) {
		// 			this.sale_time = sale_time.id
		// 		}
		// 	})
		// 	.catch(() => {
		// 		this.changeSaleTime(sale_time)
		// 	})
		// },
	},
}
</script>
<style scoped>

.card-icon {
	font-size: 1.5rem
}
.spinner-border {
	margin-bottom: 3px;
}
.clients-results {
	position: absolute;
	top: 100%;
	width: 100%;
	z-index: 500;
}
</style>