<template>
<div class="buscador">
	<div class="input-group">
		<input type="search" 
			v-model="search_query"
			autocomplete="off" 
			id="result-name"
			:placeholder="placeholder" 
			@keyup="setPossibleResults(true)"
			@keyup.down="changePossibleResultDown(-1)"
			@keyup.up="changePossibleResultUp(-1)"
			@keyup.enter="setPossibleResults(false)"
			class="form-control">
		<div class="input-group-prepend">
			<span class="input-group-text" id="basic-addon1">
				<i v-show="!loading" class="icon-search"></i>
				<span class="spinner-border spinner-border-sm" v-show="loading"></span>
			</span>
		</div>
	</div>
	<ul class="list-group list" v-show="search_query.length >= 2">
		<li v-for="possible_result in possible_results"
			@click="selectPossibleResult(possible_result)"
			v-show="possible_results.length"
			class="list-group-item p-0">
			<input type="text" 
					class="form-control" 
					:class="possible_result_focus_id == possible_result.id ? 'buscador-active' : ''"
					v-model="possible_result.name"
					readonly
					@keyup.enter="selectPossibleResult(possible_result)"
					@keyup.down="changePossibleResultDown(possible_result)"
					@keyup.up="changePossibleResultUp(possible_result)"
					:id="'input-possible-result-'+possible_result.id">
			<p class="m-0 text-right p-r-10 p-b-5"
				:class="possible_result_focus_id == possible_result.id ? 'buscador-p-active' : ''">
				{{ price(possible_result.price) }}
			</p>
		</li>
		<li v-show="without_results && !loading"
			class="list-group-item p-15">
			<p class="text-center m-0">
				<strong>
					No se encontraron artículos
				</strong>
			</p>
		</li>
	</ul>
</div>
</template>
<script>
export default {
	props: ['model', 'placeholder'],
	data() {
		return {
			loading: false,
			search_query: '',
			possible_results: [],
			possible_result_focus_id: -1,
			without_results: false,
		}
	},
	methods: {
		setPossibleResults(only_desktop) {
			let ok = true
			var codigo = event.which || event.keyCode
			if (codigo == 40 || codigo == 38 || codigo == 37 || codigo == 39) {
				ok = false
			}
			if (this.search_query.length <= 1) {
				this.possible_results = []
				ok = false
			} else if (only_desktop && mobileAndTabletCheck()) {
				ok = false
			}
			if (ok) {
				this.loading = true
				let url = this.model + '/search/' + this.search_query
				axios.get(url)
				.then(res => {
					this.loading = false
					if (res.data.length) {
						this.without_results = false
						this.possible_results = res.data
					} else {
						this.possible_results = []
						this.without_results = true
					}
					this.possible_result_focus_id = -1
				})
				.catch(err => {
					this.loading = false
					console.log(err)
					toastr.error('Error, recargue la pagina por favor :)')
				})
			} 
		},
		changePossibleResultDown(result) {
			// Si es -1 es que se bajo desde el input search_query
			if (result == -1) {
				var result_down = this.possible_results[0]
				var input_id = '#input-possible-result-' + result_down.id
				this.possible_result_focus_id = result_down.id
				$(input_id).focus()
			} else {
				var index = this.possible_results.indexOf(result)
				var possible_results_length = this.possible_results.length - 1
				if (index < possible_results_length) {
					var result_down_index = index + 1
					var result_down = this.possible_results[index + 1]
					var input_id = '#input-possible-result-' + result_down.id
					this.possible_result_focus_id = result_down.id
					$(input_id).focus()
				} else {
					this.possible_result_focus_id = -1
					$('#result-name').focus()
				}
			}
		},
		changePossibleResultUp(result) {
			if (result == -1) {
				var result_up = this.possible_results[this.possible_results.length-1]
				var input_id = '#input-possible-result-' + result_up.id
				this.possible_result_focus_id = result_up.id
				$(input_id).focus()
			} else {
				var index = this.possible_results.indexOf(result)
				var possible_results_length = this.possible_results.length - 1
				if (index > 0) {
					var result_up_index = index - 1
					var result_up = this.possible_results[index - 1]
					var input_id = '#input-possible-result-' + result_up.id
					this.possible_result_focus_id = result_up.id
					$(input_id).focus()
				} else {
					this.possible_result_focus_id = -1
					$('#result-name').focus()
				}
			}
		},
		selectPossibleResult(result) {
			this.$emit('selectPossibleResult', result)
			this.possible_results = []
			this.search_query = ''
		},
	},
}
</script>
<style scoped>

</style>
