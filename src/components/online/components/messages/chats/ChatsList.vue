<template>
	<div
	class="m-t-15"
	id="chats-list">
		<div
		v-if="!loading">
			<b-list-group>
				<b-list-group-item
				:class="activeChat(chat)"
				v-for="chat in chats"
				:key="chat.id"
				class="chat"
				@click="setSelectedBuyer(chat)">
					<p class="name">
						{{ chat.name }} {{ chat.surname }}
					</p>
					<b-badge
					variant="danger"
					v-show="messagesNotRead(chat) > 0">
						{{ messagesNotRead(chat) }}
					</b-badge>
				</b-list-group-item>
			</b-list-group>
		</div>
		<div
		v-else>
			<p
			class="text-center">
				Cargando chats...
			</p>
		</div>
	</div>
</template>
<script>
import online from '@/mixins/online'
import ChatSearch from '@/components/online/components/messages/chats/ChatSearch'
export default {
	mixins: [online],
	components: {
		ChatSearch,
	},
	computed: {
		selected_buyer() {
			return this.$store.state.online.messages.selected_buyer
		},
		chats() {
			return this.$store.state.online.messages.chats_to_show
		},
		loading() {
			return this.$store.state.online.buyers.loading
		},
	},
	watch: {
		$route(to, from) {
            let buyer = this.$store.state.online.buyers.buyers.find(b => {
            	return b.id == this.$route.params.chat_id
            })
			this.$store.commit('online/messages/setSelectedBuyer', buyer)
		}
	},
	methods: {
		setSelectedBuyer(buyer) {
			this.$store.commit('online/messages/setSelectedBuyer', buyer)
			this.$router.push({name: 'Online', params: {chat_id: buyer.id}})
			this.$store.dispatch('online/messages/setMessagesRead')
			this.$store.commit('online/buyers/setMessagesRead', buyer)
			this.$store.commit('online/buyers/setMessagesNotRead')
		},
		activeChat(buyer) {
			return this.selected_buyer && buyer.id == this.selected_buyer.id ? 'active-chat' : ''
		},
	}
}
</script>
<style lang="sass">
#chats-list
	max-height: 70vh
	overflow-y: scroll
.chat 
	border-bottom: .15em solid rgba(51,51,51,.2)
	padding: .5em
	cursor: pointer
	display: flex
	justify-content: space-between
	align-items: center
	.name
		margin: 0
.active-chat
	border-left: .3em solid #4a2c82
	color: #4a2c82
	font-weight: bold
</style>