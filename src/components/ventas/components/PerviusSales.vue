<template>
<nav aria-label="Page navigation" class="pagination-nav"
	v-intro-step="1"
	v-intro="'Selecciona el dia de la semana para ver sus ventas'">
	<ul class="pagination m-0" v-show="!loading">
		<li class="page-item">
			<a class="page-link" href="#"
				v-show="days_previus_sales.length == 7"
				@click.prevent="getBeforeDaysPreviusSales">
				<span aria-hidden="true">
					&laquo;
				</span>
			</a>
		</li>
		<li class="page-item" 
			v-for="(day, index) in days_previus_sales"
			:key="index"
			:class="date(day_selected) == date(day.date) ? 'active' : ''">
			<span class="pagination-mes">
				{{ getMonth(day.date) }}
			</span>
			<template v-if="date(day.date) != date(today)">
				<a v-if="day.sales.length"
					class="page-link" 
					href="#"
					@click.prevent="changeFromDate(day.date)">
					{{ dayFormat(day.date) }}
				</a>
				<a v-else
					href="#" 
					@click.prevent="showNotSales" 
					class="page-link text-muted day-not-sale">
					{{ dayFormat(day.date) }}
				</a>
			</template>
			<template v-else>
				<a class="page-link" 
					href="#"
					@click.prevent="changeFromDate(day.date)">
					Hoy
				</a>
			</template>
			<span class="pagination-dia bg-primary">
				{{ getDay(day.date) }}
			</span>
		</li>
		<li class="page-item"
			v-show="days_previus_sales_index >= 1">
			<a class="page-link" href="#"
				@click.prevent="getNextDaysPreviusSales">
				<span aria-hidden="true">
					&raquo;
				</span>
			</a>
		</li>
	</ul>
	<span v-show="loading"
		class="text-primary">
		<span class="spinner-border spinner-border-sm"></span>
	</span>
</nav>
</template>
<script>
import moment from 'moment'
import sales_from_date from '@/mixins/sales_from_date'
export default {
	name: 'PreviusSales',
    mixins: [sales_from_date],
	data() {
		return {
			today: '',
		}
	},
	computed: {
		day_selected() {
			return this.$store.state.sales.days_previus_sales.day_selected
		},
		days_previus_sales() {
			return this.$store.state.sales.days_previus_sales.days_previus_sales
		},
		days_previus_sales_index() {
			return this.$store.state.sales.days_previus_sales.index
		},
		loading() {
			return this.$store.state.sales.days_previus_sales.loading
		},
	},
	methods: {
		dayFormat(d) {
			return moment(d).format('DD')
		},
		dateLink(d) {
			return moment(d).format('YYYY-MM-DD')
		},
		showNotSales() {
			this.$toast.error('No hay ventas en este dia')
		},
		getBeforeDaysPreviusSales() {
			this.$store.commit('sales/days_previus_sales/incrementIndex')
			this.$store.dispatch('sales/days_previus_sales/getDaysPreviusSales')
		},
		getNextDaysPreviusSales() {
			this.$store.commit('sales/days_previus_sales/decrementIndex')
			this.$store.dispatch('sales/days_previus_sales/getDaysPreviusSales')
		},
		changeFromDate(d) { 
			this.$store.commit('sales/setSelectedSales', [])
			this.$store.commit('sales/setAllSalesSelected', false)
            this.$store.commit('sales/setSelectedClient', null)
			this.$store.commit('sales/days_previus_sales/setDaySelected', d)
			if (this.date(d) == this.date(this.today)) {
				let sales = this.$store.state.sales.sales
				this.$store.commit('sales/setOnlyOneDate', '')
				this.$store.commit('sales/setFrom', '')
				this.$store.commit('sales/setTo', '')
				this.$store.commit('sales/setSales', sales)
				this.$store.commit('sales/setSalesToShow')
				this.$store.commit('sales/setTotal')
			} else {
				var date = moment(d).format('YYYY-MM-DD')
				this.$store.commit('sales/setOnlyOneDate', date)
				this.onlyOneDate()
			}
		},
	},
	created() {
		// this.getDaysPreviusSales()
		this.today = moment().format('YYYY/MM/DD')
		// this.$store.commit('sales/days_previus_sales/setDaySelected', moment().format('YYYY/MM/DD'))
		// this.day_selected = moment().format('YYYY/MM/DD')
	}
}
</script>
<style scpoed lang="sass">
.col-12 
	display: flex
	justify-content: center
.pagination-nav
	@media screen and(max-width: 576px)
		font-size: .7em

.page-item 
	position: relative

.pagination-mes
	position: absolute
	background: #38c172
	text-align: center
	bottom: 100%
	color: #fff
	font-size: .5rem
	border-radius: .25rem .25rem 0 0
	width: 90%
	left: 4%

.pagination-dia
	position: absolute
	text-align: center
	top: 100%
	color: #fff
	font-size: .5rem
	border-radius: 0 0 .25rem .25rem
	width: 90%
	left: 4%

.pagination-nav 
	display: block

.day-not-sale 
	text-decoration: line-through
	font-weight: normal
	cursor: not-allowed

</style>