<template>
<b-modal id="saldo-inicial-client" title="Saldo inicial" hide-footer>
	<b-form-group>
		<b-form-input
		type="number"
		v-model="saldo_inicial"
		:placeholder="'Ingrese el saldo inicial para '+client.name"
		@keydown.enter="saldoInicial"></b-form-input>
	</b-form-group>
	<b-form-group>
		<b-form-radio
		v-model="is_for_debe"
		:value="true">
			Ingresar en el debe
		</b-form-radio>
		<b-form-radio
		v-model="is_for_debe"
		:value="false">
			Ingresar en el haber
		</b-form-radio>
	</b-form-group>
	<b-form-group>
		<b-button
		@click="saldoInicial"
		block
		variant="primary">
			<btn-loader
			text="Agregar"
			:loader="loading"></btn-loader>
		</b-button>
	</b-form-group>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'SaldoInicialClient',
	components: {
		BtnLoader,
	},
	data() {
		return {
			saldo_inicial: '',
			is_for_debe: true,
			loading: false,
		}
	},
	computed: {
		client() {
			return this.$store.state.clients.saldo_inicial
		}
	},
	methods: {
		saldoInicial() {
			this.loading = true
			this.$api.post('/clients/saldo-inicial', {
				client_id	 : this.client.id,
				is_for_debe  : this.is_for_debe,
				saldo_inicial: this.saldo_inicial,
			})
			.then(res => {
				this.loading = false
				this.client.current_acounts_count = 1
				this.$store.commit('clients/update', this.client)
				this.$toast.success('Saldo inicial agregado')
				this.$bvModal.hide('saldo-inicial-client')
				this.clear()
			})
			.catch(err => {
				console.log(err)
				this.loading = false
			})
		},
		clear() {
			this.saldo_inicial = ''
			this.is_for_debe = true
		}
	}
}
</script>