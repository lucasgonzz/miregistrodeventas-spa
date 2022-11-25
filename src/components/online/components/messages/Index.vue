<template>
	<div>
		<chats-modal></chats-modal>	
		<b-row
		class="messages"
		v-show="view == 'mensajes'">
			<b-col
			class="col-chats"
			lg="3">
				<chats></chats>
			</b-col>
			<b-col
			class="col-messages"
			lg="9">
				<conversation></conversation>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import ChatsModal from '@/components/online/components/messages/chats/MobileModal'
import Chats from '@/components/online/components/messages/chats/Index'
import Conversation from '@/components/online/components/messages/conversation/Index'
import online from '@/mixins/online'
export default { 
	mixins: [online],
	components: {
		ChatsModal,
		Chats,
		Conversation,
	},
}
</script>
<style lang="sass">
$nav_height: 50px
$nav_margin: 1em
$online_nav_height: 42px
$online_nav_margin: 1em
.messages
	max-height: calc(100vh - 50px - 1em - 42px - 1em - 10px)
	margin-bottom: 0 !important
.col-messages
	height: calc(100vh - 45px - 15px - 42px - 15px - 50px)
	border-left: .1em solid rgba(51,51,51,.5)
	// border-bottom: .1em solid rgba(51,51,51,.5)
.col-chats
	// border-bottom: .1em solid rgba(51,51,51,.5)
	padding-bottom: 1em
	@media screen and (max-width: 992px)
		height: 50px
</style>