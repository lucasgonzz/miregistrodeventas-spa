<template>
	<div
	class="conversation">
		<messages
		v-if="!show_articles"></messages>
		<select-article
		v-else></select-article>
		<send-message></send-message>
	</div>
</template>
<script>
import Messages from '@/components/online/components/messages/conversation/Messages'
import SelectArticle from '@/components/online/components/messages/conversation/SelectArticle'
import SendMessage from '@/components/online/components/messages/conversation/SendMessage'
export default {
	components: {
		Messages,
		SelectArticle,
		SendMessage,
	},
	computed: {
		show_articles() {
			return this.$store.state.online.messages.show_articles
		}
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