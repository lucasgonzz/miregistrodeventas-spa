import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		employee_to_create: {
			name: '',
			password: '',
			permissions: [],
		},
		employee_to_show_permissions: {},
		employees: [],
	},
	mutations: {
		add(state, employee) {
			employee.permissions_id = []
			employee.permissions.forEach(permission => {
				employee.permissions_id.push(permission.id)
			})
			state.employees.unshift(employee)
		},
		delete(state, employee) {
			let index = state.employees.findIndex(emp => {
				return emp.id == employee.id
			})
			state.employees.splice(index, 1)
		},
		setEmployees(state, employees) {
			employees.forEach(employee => {
				employee.permissions_id = []
				employee.permissions.forEach(permission => {
					employee.permissions_id.push(permission.id)
				})
			})
			state.employees = employees
		},
		setEmployeeToCreate(state, value) {
			state.employee_to_create = value
		},
		setEmployeeToShowPermissions(state, value) {
			state.employee_to_show_permissions = value
		},
	},
	actions: {
		getEmployees({ commit }) {
			return axios.get('/api/employees')
			.then(res => {
				commit('setEmployees', res.data.employees)
			})
			.catch(err => {
				console.log(err)
			})
		}
	},
	modules: {
	}
}
