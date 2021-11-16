<template>
	<div
	class="chats-container">
		<b-button
		block
		variant="primary"
		v-if="is_mobile"
		v-b-modal="'chats'">
			Buscar chat
		</b-button>
		<div
		v-else>
			<chat-search></chat-search>
			<chats-list></chats-list>
		</div>
	</div>
</template>
<script>
import online from '@/mixins/online'
import ChatSearch from '@/components/online/components/messages/chats/ChatSearch'
import ChatsList from '@/components/online/components/messages/chats/ChatsList'
export default {
	mixins: [online],
	components: {
		ChatSearch,
		ChatsList,
	},
}
</script>
<style lang="sass">
</style>