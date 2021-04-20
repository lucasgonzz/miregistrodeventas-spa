export default {
	methods: {
		listenChannels() {
			// this.Echo.channel('orderChannel')
   //          .listen('OrderCreatedEvent', (res) => {
   //              console.log(res)
   //              this.$store.dispatch('online/orders/getUnconfirmedOrders')
   //              // this.$toast.success(`${res.order.buyer.name} quiere hacer un pedido`)
   //          }); 
            // this.Echo.channel('questionChannel')
            // .listen('QuestionCreatedEvent', (e) => {
            //     let question = e.question
            //     this.$store.dispatch('online/questions/getQuestions')
            //     // this.$store.commit('online/addQuestion', question)
            //     // this.$toast.success(`${question.buyer.name} te ha hecho una pregunta`)
            // }); 
            this.Echo.channel('payment.'+this.user.id)
            .notification((notification) => {
                console.log(notification)
                this.$store.dispatch('online/orders/getConfirmedFinishedOrders')
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
		}
	}
}