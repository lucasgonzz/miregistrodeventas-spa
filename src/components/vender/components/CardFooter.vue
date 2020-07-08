<template>
<div class="row">
	<div class="col justify-center" data-step="6" data-intro="Seleccione el cliente para la venta">
		<button class="btn btn-lg btn-success"
				@click="showClients">
			<i class="icon-user"></i>
			Clientes
		</button>
	</div>
	<!-- <div class="col">
		<form class="form-inline">
			<label class="my-1 mr-2" for="client">Cliente</label>
			<select class="custom-select my-1 mr-sm-2" 
						v-model="selected_client" 
						id="client">
				<option value="0">Elija un cliente</option>
				<option v-for="client in clients" 
						:value="client.id">
						{{ client.name }}
				</option>
			</select>
			<button class="btn btn-secondary btn-sm"
					@click.prevent="showClients">
				Agregar, eliminar clientes
			</button>
		</form>
	</div>
	<div class="col">
		<button @click="vender" 
				id="vender"
				v-show="!ventaRealizada"
				:class="selected_client == 0 ? 'disabled' : ''" class="btn btn-success btn-block btn-lg">
			<span v-show="vendiendo"
					class="spinner-border spinner-border-sm spinner-btn-vender" role="status" aria-hidden="true"></span>
			Vender
		</button>
		<button @click="nuevaVenta" 
				v-show="ventaRealizada"
				:class="selected_client == 0 ? 'disabled' : ''" class="btn btn-success btn-block btn-lg">
			Nueva venta
		</button>
	</div> -->
</div>
</template>
<script>
export default {
	props: [''],
	data() {
		return {

		}
	},
	methods: {
		showClients() {
			$('#clients').modal('show')
		},
	},
}
</script>
<style scoped>
	
</style>