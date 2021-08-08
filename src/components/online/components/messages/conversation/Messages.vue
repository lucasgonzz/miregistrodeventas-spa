<template>
	<div
	class="container-messages">
		<div
		class="no-content m-t-50"
		v-if="!selected_buyer">
            <i class="icon-user"></i>
			<p>
				Seleccione un cliente para ver el chat
			</p>
		</div>
		<div
		v-else-if="selected_buyer.messages.length"
		id="messages">
			<div 
			v-for="message in selected_buyer.messages"
			class="message shadow-1"
			:class="getClassMessage(message)">
				<p class="text">
					{{ message.text }}
				</p>
				<article-card 
				class="m-t-10"
				v-if="hasArticle(message)"
				:article="message.article"></article-card>
				<p class="since">
					{{ since(message.created_at) }}
				</p>
			</div>
		</div>
		<div
		class="no-content m-t-50"
		v-else>
            <i class="icon-message"></i>
            <p>
				No hay mensajes
            </p>
		</div>
	</div>
</template>
<script>
import online from '@/mixins/online'
import ArticleCard from '@/components/common/ArticleCard'
export default {
	mixins: [online],
	components: {
		ArticleCard,
	},
	methods: {
		getClassMessage(message) {
			return message.from_buyer ? 'buyer-message bg-primary' : 'commerce-message'
		}
	},
	watch: {
		selected_buyer() {
			if (this.selected_buyer && this.selected_buyer.messages.length) {
				this.scrollBottom('messages')
				setTimeout(() => {
					document.getElementById('message-text').focus()
				}, 100)
			}
		}
	}
}
</script>
<style lang="sass">
.container-messages
	height: 85%
#messages
	display: flex
	flex-direction: column
	overflow-y: scroll
	padding: 1em
	height: 100%
.commerce-message
	align-self: flex-end
	color: #000 
	.since
		color: rgba(0,0,0,.7)
.buyer-message
	color: #FFF
	.since
		color: rgba(255,255,255,.7)
.message
	border-radius: .5em
	padding: .5em
	margin-bottom: 1em
	width: 300px
	.since
		font-size: .7em
		text-align: right
	p 
		margin: 0
</style>