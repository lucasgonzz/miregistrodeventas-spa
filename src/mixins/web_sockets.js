export default {
	methods: {
		listenChannels() {
            this.Echo.channel('payment.'+this.owner_id)
            .notification((notification) => {
                console.log(notification)
                this.$store.dispatch('online/orders/getConfirmedFinishedOrders')
            });
            this.Echo.channel('call.'+this.owner_id)
            .notification((notification) => {
                console.log(notification)
                this.$store.commit('online/calls/add', notification.call)
            });
            this.Echo.channel('created_article.'+this.owner_id)
            .notification((notification) => {
                console.log('articulo creado')
                console.log('llego por: '+'created_article.'+this.owner_id)
                console.log(notification)
                this.$api.get('article/'+notification.article_id)
                .then(res => {
                    if (res.data.model.status == 'active') {
                        this.$store.commit('article/add', res.data.model)
                    }
                })
            });
            console.log('escuchando updated_article.'+this.owner_id)
            this.Echo.channel('updated_article.'+this.owner_id)
            .notification((notification) => {
                console.log('articulo actualizado')
                console.log(notification)
                this.$api.get('article/'+notification.article_id)
                .then(res => {
                    if (res.data.model.status == 'active') {
                        this.$store.commit('article/add', res.data.model)
                    }
                })
            });
            this.Echo.channel('created_sale.'+this.owner_id)
            .notification((notification) => {
                console.log('venta creada')
                console.log(notification)
                this.$api.get('sale-show/'+notification.sale_id)
                .then(res => {
                    let sale = res.data.model
                    this.addModel('sale', sale)
                    if (sale.client_id) {
                        this.loadModel('client', sale.client_id)
                    } 
                })
            });
            this.Echo.channel('message.from_buyer.'+this.owner_id)
            .notification((notification) => {
                console.log(notification)
                this.$store.commit('buyer/addMessage', notification.message)
                this.$store.commit('buyer/setMessagesNotRead')
                this.$store.commit('message/setChatsToShow')
                this.checkIfIsMessagesView(notification)
            });
            this.Echo.channel('order.'+this.owner_id)
            .notification((notification) => {
                console.log(notification)
                this.$api.get('order-show/'+notification.order_id)
                .then(res => {
                    this.addModel('order', res.data.model)
                })
            });
            this.Echo.channel('question.'+this.owner_id)
            .notification((notification) => {
                console.log(notification)
                this.$store.dispatch('online/questions/getQuestions')
            });
            this.Echo.channel('payment.'+this.owner_id)
            .notification((notification) => {
                console.log(notification)
                this.$store.dispatch('online/orders/getConfirmedFinishedOrders')
            });
		},
        checkIfIsMessagesView(noti) {
            if (this.$route.name == 'Online' && this.view == 'mensajes' && this.$route.params.chat_id == noti.message.buyer_id) {
                console.log('view: '+this.view)
                console.log('se marcaron mensajes como leidos')
                let selected_buyer = this.$store.state.online.messages.selected_buyer
                this.$store.dispatch('online/messages/setMessagesRead')
                this.$store.commit('online/buyers/setMessagesRead', selected_buyer)
                this.$store.commit('online/buyers/setMessagesNotRead')
                this.scrollBottom('messages')
            }
        }
	}
}