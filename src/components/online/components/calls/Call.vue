<template>
	<div class="call shadow-2 b-r-1">
		<p class="name">
			<i class="icon-user"></i>
			{{ call.buyer.name }} {{ call.buyer.surname }}
		</p>
		<p class="phone">
			<i class="icon-phone"></i>
			{{ phone(call.buyer.phone) }}
		</p>
        <b-button 
        size="sm"
		class="m-b-10"
        variant="success"
        target="_blank"
        block
        :href="'https://api.whatsapp.com/send?phone='+call.buyer.phone">
            <i class="icon-whatsapp"></i>
            WhatsApp
        </b-button>
		<b-button
		size="sm"
		class="m-b-10"
		variant="primary"
		@click="realized"
		block>
			<btn-loader
			text="Relizada"
			:loader="loading"></btn-loader>
		</b-button>
		<p class="since">
			<i class="icon-clock"></i>
			{{ since(call.created_at) }}
		</p>
	</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	props: ['call'],
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		realized() {
			this.loading = true
			this.$api.put('calls', this.call)
			.then(res => {
				this.loading = false
				this.$toast.success('Llamada realizada')
				this.$store.commit('online/calls/remove', this.call)
			})
			.catch(err => {
				this.$toast.error('Error al guardar')
				this.loading = false
				console.log(err)
			})
		}
	}
}
</script>
<style lang="sass">
.call 
	padding: 1em
</style>