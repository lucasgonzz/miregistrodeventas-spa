<template>
	<div
	class="conversation">
		<messages></messages>
		<send-message></send-message>
	</div>
</template>
<script>
import Messages from '@/components/online/components/messages/conversation/Messages'
import SendMessage from '@/components/online/components/messages/conversation/SendMessage'
export default {
	components: {
		Messages,
		SendMessage,
	}
}
</script>
<style lang="sass">
.conversation
	height: 100%
	display: flex
	justify-content: space-between
	flex-direction: column
</style>