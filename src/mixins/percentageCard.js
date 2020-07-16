export default {
	methods: {
		percentageCardFormated(p) {
			let percentage_card = Number(p)
			if (percentage_card < 10) {
				return Number('1.0'+percentage_card)
			} 
			return Number('1.'+percentage_card)
		}
	},
}