<template>
	<div
	class="conversation">
		<messages
		v-if="!show_articles"></messages>
		<select-article
		v-else
		:selected_article="selected_article"
		text="Busque un articulo para enviar por mensaje"
		@articleSelected="articleSelected"></select-article>
		<send-message></send-message>
	</div>
</template>
<script>
import Messages from '@/components/online/components/messages/conversation/Messages'
import SelectArticle from '@/components/common/SelectArticle'
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
		},
		selected_article() {
			return this.$store.state.online.messages.selected_article
		},
	},
	methods: {
		isSelectedArticle(article) {
			return this.selected_article && this.selected_article.id == article.id
		},
		articleSelected(article) {
			if (this.isSelectedArticle(article)) {
				this.$store.commit('online/messages/setSelectedArticle', null)
			} else {
				this.$store.commit('online/messages/setSelectedArticle', article)
			}
			this.$store.commit('online/messages/setShowArticles', false)
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