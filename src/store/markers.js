import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
// axios.defaults.baseURL = 'https://micovid.online'
// axios.defaults.baseURL = 'http://localhost:8000'
export default {
	namespaced: true,
	state: {
		markers: [],
		marker_groups: [],
		marker_groups_with_markers: [],
		markers_loaded: false
	},
	getters: {
	},
	mutations: {
		setMarkers(state, value) {
			state.markers = value
		},
		setMarkerGroups(state, value) {
			state.marker_groups = value
		},
		setMarkerGroupsWithMarkers(state, value) {
			state.marker_groups_with_markers = value
		},
		setMarkersLoaded(state, value) {
			state.markers_loaded = value
		}
	},
	actions: {
		getMarkers({commit}) {
			axios.get('/api/markers')
			.then(res => {
				console.log('se cargaron marcadores')
				commit('setMarkers', res.data)
				commit('setMarkersLoaded', true)
			})
			.catch(err => {
				console.log(err)
			})
		},
		// Se usa en vender
		getMarkerGroupsWithMarkers({commit}) {
			this.loading = true
			axios.get('/api/marker-groups/only-with-markers')
			.then(res => {
				commit('setMarkerGroupsWithMarkers', res.data)
				commit('setMarkersLoaded', true)
			})
			.catch(err => {
				console.log(err)
			})
		},
		// Se usa en listado
		getMarkerGroups({commit}) {
			this.loading = true
			axios.get('/api/marker-groups')
			.then(res => {
				console.log(res.data)
				commit('setMarkerGroups', res.data)
				commit('setMarkersLoaded', true)
			})
			.catch(err => {
				console.log(err)
			})
		},
	},
	modules: {
	}
}
