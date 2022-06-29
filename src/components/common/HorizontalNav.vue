<template>
	<div class="horizontal-nav">
		<div
		class="item"
		v-for="item in items"
		:key="item.id"
		@click="select(item)"
		:class="isActive(item)">
			{{ itemName(item) }}
		</div>
	</div>
</template>
<script>
export default {
	name: 'HorizontalNav',
	props: {
		items: Array,
		prop_name: {
			type: String,
			default: 'name',
		},
		set_view: {
			type: Boolean,
			default: false,
		},
		set_sub_view: {
			type: Boolean,
			default: false,
		},
	},
	filters: {
	},
	computed: {
		view() {
			return this.$route.params.view
		},
		sub_view() {
			return this.$route.params.sub_view
		},
		selected() { 
			if (this.set_view) {
				return this.view
			}
			if (this.set_sub_view) {
				return this.sub_view
			}
		},
	},
	created() {
		this.setActive()
	},
	methods: {
		itemName(item) {
			if (!item) return ''
			let value = this.value(item)
			value = value.toString()
			value = value.charAt(0).toUpperCase() + value.slice(1)
			value =  value.replaceAll('-', ' ')
			return value
		},
		select(item) {
			if (this.set_view && this.view != this.routeString(this.value(item))) {
				this.$router.push({name: this.route_name, params: {view: this.routeString(this.value(item))}})
			} 
			if (this.set_sub_view && this.sub_view != this.routeString(this.value(item))) {
				this.$router.push({params: {method: this.method, sub_view: this.routeString(this.value(item))}})
				console.log('set sub_view')
			} 
			this.$emit('setSelected', item)
			// this.setActive()
		},
		value(item) {
			if (this.prop_name) {
				return item[this.prop_name]
			}
			return item
		},
		isActive(item) {
			if (this.selected == this.routeString(this.value(item))) {
				return 'active'
			}
		},
		setActive() {
			this.items.forEach(item => {
				this.$set(item, 'class', null)
			})
			this.items.forEach(item => {
				if (this.value(item) == this.selected.name) {
					this.$set(item, 'class', 'active')
					console.log(item.name)
				} else {
					this.$set(item, 'class', 'asd')
				}
			})
		},
	}
}
</script>
<style scoped lang="sass">
@import '@/sass/_custom.scss'
.col-nav 
	justify-content: flex-start
.horizontal-nav
	width: 100%
	display: flex
	overflow-x: auto
	overflow-y: hidden
	-ms-overflow-style: none
	scrollbar-width: none
	&::-webkit-scrollbar 
		display: none
	.item
		border-bottom: 3px solid lighten($blue, 30)
		padding: 5px 8px
		cursor: pointer
		border-radius: 4px 4px 0 0
		transition: all .2s
		font-size: 1em
	.active 
		font-weight: bold
		// transform: scale(1.1)
		border-bottom: 3px solid $blue
		// box-shadow: 0px 3px 7px rgb(0 0 0 / 15%) !important
		// webkit-box-shadow: 0px -2px 4px -1px rgba(0,0,0,.7)
		// box-shadow: 0px -2px 4px -1px rgba(0,0,0,.7)
</style>