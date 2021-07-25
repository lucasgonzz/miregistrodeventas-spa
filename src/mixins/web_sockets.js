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
                this.checkIfIsMessagesView(notification)
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
		},
        checkIfIsMessagesView(noti) {
            if (this.$route.name == 'Online' && this.$route.params.chat_id == noti.message.buyer_id) {
                console.log('se marcaron mensajes como leidos')
                let selected_buyer = this.$store.state.online.messages.selected_buyer
                this.$store.dispatch('online/messages/setMessagesRead')
                this.$store.commit('online/buyers/setMessagesRead', selected_buyer)
                this.$store.commit('online/buyers/setMessagesNotRead')
                this.scrollBottom('conversation-messages')
            }
        }
	}
}