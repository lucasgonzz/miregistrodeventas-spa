<template>
	<b-row
	class="messages"
	v-show="view == 'mensajes'">
		<b-col
		class="col-chats"
		cols="3">
			<chats></chats>
		</b-col>
		<b-col
		class="col-messages"
		cols="9">
			<conversation></conversation>
		</b-col>
	</b-row>
</template>
<script>
import Chats from '@/components/online/components/messages/chats/Index'
import Conversation from '@/components/online/components/messages/conversation/Index'
import online from '@/mixins/online'
export default { 
	mixins: [online],
	components: {
		Chats,
		Conversation,
	},
}
</script>
<style lang="sass">
// $nav_height: 45px
// $nav_margin: 15px
// $online_nav_height: 42px
// $online_nav_margin: 15px
.messages
	max-height: calc(100vh - 45px - 15px - 42px - 15px - 10px)
	margin-bottom: 0 !important
.col-messages
	height: calc(100vh - 45px - 15px - 42px - 15px)
	border-left: .1em solid rgba(51,51,51,.5)
	// border-bottom: .1em solid rgba(51,51,51,.5)
.col-chats
	// border-bottom: .1em solid rgba(51,51,51,.5)
	padding-bottom: 1em
</style>