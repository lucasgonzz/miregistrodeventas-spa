<template>
<b-modal id="collect" :title="`Cobrar a ${commerce.name}`">
	<b-container fluid>
		<b-row class="m-b-0">
			<b-col>
				<b-form-radio
				v-model="collected_months"
				:value="1">
					1 Mes $300
				</b-form-radio>
				<b-form-radio
				v-model="collected_months"
				:value="12">
					1 Año $2000
				</b-form-radio>
			</b-col>
		</b-row>
	</b-container>
	<template v-slot:modal-footer>
		<b-button
		variant="primary"
		@click="cobrar">
			<btn-loader :loading="cobrando"></btn-loader>
			Cobrar
		</b-button>
	</template>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	props: ['commerce'],
	components: {
		BtnLoader
	},
	data() {
		return {
			collected_months: 1,
			cobrando: false,
		}
	},
	methods: {
		cobrar() {
			this.cobrando = true
			var link = `admin/collect/${this.commerce.id}/${this.collected_months}`
			this.$api.get(link)
			.then(() => {
				this.$toast.success('Cobrado correctamente')
				this.cobrando = false
				this.$emit('getUsersInUse')
				this.$bvModal.hide('collect')
			})
			.catch(err => {
				console.log(err)
				this.cobrando = false
			})
		},
	},
}
</script>
<style scoped lang="sass">
.custom-control
	font-weight: bold
	display: flex
	justify-content: center
</style>