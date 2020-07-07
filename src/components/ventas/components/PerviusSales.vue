<template>
<nav aria-label="Page navigation" class="pagination-nav"
	data-step="1"
	data-intro="Aqui se mostraran los dias de la semana para poder ver sus ventas.">
	<ul class="pagination m-0" v-show="!loading_days_previus_sales">
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
			:class="((date(only_one_date) == date(day.date) && is_from_only_one_date) || (!is_from_only_one_date && date(day.date) == today)) ? 'active' : ''">
			<span class="pagination-mes">
				{{ getMonth(day.date) }}
			</span>
			<template v-if="date(day.date) != today">
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
			<span class="pagination-dia">
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
	<span v-show="loading_days_previus_sales"
		class="text-primary">
		<span class="spinner-border spinner-border-sm"></span>
	</span>
</nav>
</template>
<script>
import moment from 'moment'
export default {
	props: ['only_one_date', 'is_from_only_one_date'],
	data() {
		return {
			last_date: '',
			loading_previus: false,
			loading_next: false,
			days_previus_sales: [],
			days_previus_sales_index: 0,
			fecha_limite: '',
			loading_days_previus_sales: false,
			today: '',
		}
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
		getDaysPreviusSales() {
			var link = 'sales/prev/'+this.days_previus_sales_index
			this.loading_days_previus_sales = true
			this.$api.get(link)
			.then(res => {
				this.loading_days_previus_sales = false
				if (res.data.length > 0) {
					this.days_previus_sales = res.data
				} else {
					if (this.days_previus_sales_index > 1) {
						this.$toast.error('No hay ventas anteriores')
					}
				}
			})
			.catch(err => {
				console.log(err)
			})
		},
		getBeforeDaysPreviusSales() {
			this.days_previus_sales_index++
			this.getDaysPreviusSales()
		},
		getNextDaysPreviusSales() {
			this.days_previus_sales_index--
			this.getDaysPreviusSales()
		},
		changeFromDate(d) {
			if (this.date(d) == this.today) {
				this.$emit('getSales')
			} else {
				var date = moment(d).format('YYYY-MM-DD')
				this.$emit('onlyOneDate', date)
			}
			// this.onlyOneDate(date)
		},
	},
	created() {
		this.getDaysPreviusSales()
		this.today = moment().format('DD/MM/YY')
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
	background: #3490dc
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

</style>