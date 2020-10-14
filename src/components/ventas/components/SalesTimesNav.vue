<template>
<div class="row m-b-10" v-show="sales_times.length && !is_from_date && !sales_from_client && !showing_statistics">
	<div class="col">
		<ul class="nav nav-tabs">
			<li 
			class="nav-item" v-show="hasPermissionToShowAllSales()"
			:class="sale_time == 0 ? 'active' : ''" >
				<a class="nav-link"
					@click.prevent="getAllSales"
					href="#">
					Todas
					<p class="m-0">
						&nbsp;
					</p>
				</a>
			</li>
			<li class="nav-item" 
			:class="sale_time == sale_time_.id ? 'active' : ''" 
			v-for="sale_time_ in sales_times"
			:key="sale_time_.id"
			v-show="hasPermissionToShowSaleTime(sale_time_)">
				<a class="nav-link"
					href="#"
					@click.prevent="changeSaleTime(sale_time_)">
					{{ sale_time_.name }}
					<p class="m-0 sale-time-hour">
						{{ sale_time_.from }} a {{ sale_time_.to }}
					</p>
				</a>
			</li>
		</ul>
	</div>
</div>
</template>
<script>
export default {
	props: ['sales_times', 'showing_statistics', 'sale_time', 'sales', 'is_from_date', 'user', 'sales_from_client'],
	methods: {
		getAllSales() {
			this.$emit('getAllSales')
		},
		changeSaleTime(sale_time) {
			this.$emit('changeSaleTime', sale_time)
		},
		hasPermissionToShowAllSales() {
			var has_permission = false
			if (this.user.roles) {
				this.user.roles.forEach(rol => {
					if (rol.slug == 'owner') {
						has_permission = true
					}
				})
				if (!has_permission) {
					this.user.permissions.forEach(permission => {
						if (permission.slug == 'sale.index.all') {
							has_permission = true
						}
					})
				}
			}
			return has_permission
		},
		hasPermissionToShowSaleTime(sale_time) {
			var has_permission = false
			if (this.user.roles) {
				this.user.roles.forEach(rol => {
					if (rol.slug == 'owner') {
						has_permission = true
					}
				})
			}
			if (!has_permission) {
				this.user.permissions.forEach(permission => {
					if (!has_permission) {
						if (permission.name === sale_time.name) {
							has_permission = true
						}
					}
				})
			}
			return has_permission
		},
	},
}
</script>
<style scoped lang="sass">
::-webkit-scrollbar 
	display: none
.col 
	overflow-x: scroll
.sale-time-hour
	font-size: .7em
.nav-tabs
	border-bottom: 2px solid rgba(0,0,0,.4)
.nav-item
	&:hover
		a
			color: #333
			font-weight: bold

.nav-item.active
	border-radius: .4em .4em 0 0
	border: 2px solid rgba(0,0,0,.4)
	border-bottom: none
	a
		font-weight: bold
		color: #333
ul
	min-width: 100%
	width: 800px
	white-space:nowrap
	display: flex
	flex-wrap: nowrap 
	li 
		display: inline
</style>