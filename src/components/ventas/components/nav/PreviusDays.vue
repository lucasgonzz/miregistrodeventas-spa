<template>
<nav 
class="pagination-nav">
	<ul class="pagination m-0" v-show="!loading">
		<li class="page-item">
			<a class="page-link"
			v-show="days.length == 7"
			@click.prevent="getDaysBefore">
				<span>
					&laquo;
				</span>
			</a>
		</li>
		<li class="page-item" 
			v-for="(day, index) in days"
			:key="index"
			:class="date(selected_day) == date(day.date) ? 'active' : ''">
			<span class="pagination-mes">
				{{ getMonth(day.date) }}
			</span>
			<template 
			v-if="date(day.date) != date(today)">
				<a 
				v-if="day.sales.length"
				class="page-link" 
				@click.prevent="changeFromDate(day.date)">
					{{ dayFormat(day.date) }}
				</a>
				<a 
				v-else
				@click.prevent="showNotSales" 
				class="page-link text-muted day-not-sale">
					{{ dayFormat(day.date) }}
				</a>
			</template>
			<template v-else>
				<a 
				class="page-link" 
				@click.prevent="changeFromDate(day.date)">
					Hoy
				</a>
			</template>
			<span class="pagination-dia bg-primary">
				{{ getDay(day.date) }}
			</span>
		</li>
		<li 
		class="page-item"
		v-show="index >= 1">
			<a 
			class="page-link"
			@click.prevent="getDaysNext">
				<span>
					&raquo;
				</span>
			</a>
		</li>
	</ul>
	<span 
	v-show="loading"
	class="text-primary">
		<span class="spinner-border spinner-border-sm"></span>
	</span>
</nav>
</template>
<script>
import moment from 'moment'
import sales_from_date from '@/mixins/sales_from_date'
export default {
	name: 'PreviusDays',
    mixins: [sales_from_date],
	data() {
		return {
			today: '',
		}
	},
	computed: {
		sales_models() {
			return this.$store.state.sales.models
		},
		selected_day() {
			return this.$store.state.sales.previus_days.selected_day
		},
		days() {
			return this.$store.state.sales.previus_days.days
		},
		index() {
			return this.$store.state.sales.previus_days.index
		},
		loading() {
			return this.$store.state.sales.previus_days.loading
		},
	},
	methods: {
		dayFormat(d) {
			return moment(d).format('DD')
		},
		showNotSales() {
			this.$toast.error('No hay ventas en este dia')
		},
		getDaysBefore() {
			this.$store.commit('sales/previus_days/incrementIndex')
			this.$store.dispatch('sales/previus_days/getDays')
		},
		getDaysNext() {
			this.$store.commit('sales/previus_days/decrementIndex')
			this.$store.dispatch('sales/previus_days/getDays')
		},
		changeFromDate(day) { 
			this.$store.commit('sales/setSelected', [])
            // this.$store.commit('sales/setSelectedClient', null)
			this.$store.commit('sales/previus_days/setSelectedDay', day)
			if (this.date(day) == this.date(this.today)) {
				let sales = this.sales_models
				// this.$store.commit('sales/setOnlyOneDate', '')
				// this.$store.commit('sales/setFrom', '')
				// this.$store.commit('sales/setTo', '')
				this.$store.commit('sales/setDate', '')
				this.$store.commit('sales/setModels', sales)
				this.$store.commit('sales/setToShow')
				this.$store.commit('sales/setTotal')
			} else {
				var date = moment(day).format('YYYY-MM-DD')
				this.$store.commit('sales/setDate', date)
				this.$store.dispatch('sales/getFromDate')
				// this.onlyOneDate()
			}
		},
	},
	created() {
		this.today = moment().format('YYYY/MM/DD')
		// this.getDaysPreviusSales()
		// this.$store.commit('sales/previus_days/setDaySelected', moment().format('YYYY/MM/DD'))
		// this.selected_day = moment().format('YYYY/MM/DD')
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
	cursor: pointer

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