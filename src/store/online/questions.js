import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		questions: [],
		loading: false,
	},
	mutations: {
		setQuestions(state, questions) {
			state.questions = questions
		},
		addQuestion(state, question) {
			state.questions.push(question)
		},
		setLoading(state, value) {
			state.loading = value
		},
	},
	actions: {
		getQuestions({ commit }) {
			commit('setLoading', true)
			return axios.get('/api/questions')
			.then(res => {
				commit('setLoading', false)
				commit('setQuestions', res.data.questions)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
	},
	modules: {
	}
}
