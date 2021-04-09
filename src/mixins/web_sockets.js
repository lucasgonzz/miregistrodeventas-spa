export default {
	methods: {
		listenChannels() {
			this.Echo.channel('orderChannel')
            .listen('OrderCreatedEvent', (res) => {
                console.log(res)
                this.$store.dispatch('online/orders/getUnconfirmedOrders')
                // this.$toast.success(`${res.order.buyer.name} quiere hacer un pedido`)
            }); 
            this.Echo.channel('questionChannel')
            .listen('QuestionCreatedEvent', (e) => {
                let question = e.question
                this.$store.dispatch('online/questions/getQuestions')
                // this.$store.commit('online/addQuestion', question)
                // this.$toast.success(`${question.buyer.name} te ha hecho una pregunta`)
            }); 
		}
	}
}