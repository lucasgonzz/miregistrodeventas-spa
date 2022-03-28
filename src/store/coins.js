import axios from 'axios'
export default {
	namespaced: true,
	state: {
		dolar_blue: 0,
	},
	mutations: {
		setDolarBlue(state, value) {
			let dolar_blue = value.find(data => {
				return data.casa.nombre == "Dolar Blue"
			})
			let compra = Number(dolar_blue.casa.compra.replace(',', '.'))
			let venta = Number(dolar_blue.casa.venta.replace(',', '.'))
			state.dolar_blue = (compra + venta) / 2
			console.log('compra: '+compra)
			console.log('venta: '+venta)
			console.log('dolar blue: '+state.dolar_blue)
		},
	},
	actions: {
		getCoins({ commit }) {
			return fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
			.then(res => {
				res.json()
				.then(data => {
					commit('setDolarBlue', data)
				})
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}