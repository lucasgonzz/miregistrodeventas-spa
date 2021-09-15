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
			state.dolar_blue = Number(dolar_blue.casa.venta.replace(',', '.'))
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