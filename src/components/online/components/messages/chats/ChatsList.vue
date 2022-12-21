<template>
	<div
	class="m-t-15"
	id="chats-list">
		<div
		v-if="!loading">
			<b-list-group
			v-if="chats.length">
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
			<p
			class="text-with-icon"
			v-else>
				<i class="icon-not"></i>
				No hay chats recientes
			</p>
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
			return this.$store.state.message.selected_buyer
		},
		chats() {
			return this.$store.state.message.chats_to_show
		},
		loading() {
			return this.$store.state.buyer.loading
		},
	},
	mounted() {
		this.setSelectedBuyer(null)
	},
	// watch: {
	// 	$route(to, from) {
    //         let buyer = this.$store.state.buyer.models.find(b => {
    //         	return b.id == this.$route.params.chat_id
    //         })
	// 		this.$store.commit('message/setSelectedBuyer', buyer)
	// 	}
	// },
	methods: {
		setSelectedBuyer(buyer) {
			this.$store.commit('message/setSelectedBuyer', buyer)
			if (buyer) {
				if (this.$route.params.chat_id != buyer.id) {
					this.$router.push({name: 'Online', params: {chat_id: buyer.id}})
				} else {
					this.$store.dispatch('message/getModels')
				}
				this.$store.dispatch('message/setMessagesRead')
				this.$store.commit('buyer/setMessagesRead', buyer)
				this.$store.commit('buyer/setMessagesNotRead')
				this.$bvModal.hide('chats')
			}
		},
		activeChat(buyer) {
			return this.selected_buyer && buyer.id == this.selected_buyer.id ? 'active-chat' : ''
		},
	}
}
</script>