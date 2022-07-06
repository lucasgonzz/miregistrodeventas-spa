import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true
export default {
	namespaced: true,
	state: {
		budget: null,
		client: null,
		products: [],
		observations: [],
		start_at: '',
		finish_at: '',
		delivery_and_placement: false,
		can_edit: false,
		show_btn_production: false,
		show_btn_make_order_production: false,
	},
	mutations: {
		setBudget(state, value) {
			state.budget = value
		},
		setClient(state, value) {
			state.client = value
		},
		setProducts(state, value) {
			state.products = value
		},
		addProduct(state, value) {
			state.products.push(value)
		},
		deleteProduct(state, product) {
			let index = state.products.findIndex(item => {
				return item.id == product.id
			})
			if (index != -1) {
				state.products.splice(index, 1)
			}
		},
		setObservations(state, value) {
			if (value.length) {
				state.observations = value
			} else {
				state.observations = [
					{text: ''}
				]
			}
		},
		setStartAt(state, value) {
			state.start_at = value
		},
		setFinishAt(state, value) {
			state.finish_at = value
		},
		setDeliveryAndPlacement(state, value) {
			state.delivery_and_placement = value
		},
		setCanEdit(state, value) {
			state.can_edit = value
		},
		setShowBtnProduction(state, value) {
			state.show_btn_production = value
		},
		setShowBtnMakeOrderProduction(state, value) {
			state.show_btn_make_order_production = value
		},
	},
}