export default {
	methods: {
		listenChannels() {
            console.log('listenChannels')
            this.Echo.channel('payment.'+this.user.id)
            .notification((notification) => {
                console.log(notification)
                this.$store.dispatch('online/orders/getConfirmedFinishedOrders')
            });
            this.Echo.channel('message.from_buyer.'+this.user.id)
            .notification((notification) => {
                console.log(notification)
                this.$store.commit('online/buyers/addMessage', notification.message)
                this.$store.commit('online/buyers/setMessagesNotRead')
                this.$store.commit('online/messages/setChatsToShow')
                this.scrollBottom('conversation-messages')
            });
            this.Echo.channel('order.'+this.user.id)
            .notification((notification) => {
                console.log(notification)
                this.$store.dispatch('online/orders/getUnconfirmedOrders')
            });
            this.Echo.channel('question.'+this.user.id)
            .notification((notification) => {
                console.log(notification)
                this.$store.dispatch('online/questions/getQuestions')
            });
            this.Echo.channel('payment.'+this.user.id)
            .notification((notification) => {
                console.log(notification)
                this.$store.dispatch('online/orders/getConfirmedFinishedOrders')
            });
		}
	}
}