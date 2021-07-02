<template>
	<div class="send-message">
		<b-form-input
		v-model="text"
		@keyup.enter="sendMessage"
		placeholder="Escribe un mensaje"></b-form-input>
		<b-button
		@click="sendMessage"
		variant="primary"
		class="m-l-10">
			<btn-loader
			:loader="loading"
			icon="send"></btn-loader>
		</b-button>
	</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import online from '@/mixins/online'
export default {
	mixins: [online],
	components: {
		BtnLoader,
	},
	data() {
		return {
			text: '',
			loading: false,
		}
	},
	methods: {
		sendMessage() {
			this.loading = true
			this.$api.post('messages', {
				buyer_id: this.selected_buyer.id,
				text: this.text,
			})
			.then(res => {
				this.$store.commit('online/buyers/addBuyerMessage', res.data.message)
				this.scrollBottom('conversation-messages')
				this.loading = false
				this.clear()
			})
			.catch(err => {
				console.log(err)
				this.loading = false
			})
		},
		clear() {
			this.text = ''
		}
	}
}
</script>
<style lang="sass">
.send-message
	height: 15%
	display: flex
	align-items: center
</style>