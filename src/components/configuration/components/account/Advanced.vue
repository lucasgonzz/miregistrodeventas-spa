<template>
<b-card 
class="shadow-5 b-r-1"
title="Avansado	">
	<b-form-group
	label="Limite de ventas por pagina de remito">
		<b-form-input
		placeholder="Ingrese el limite de ventas por pagina de remito"
		v-model="user_configuration.limit_items_in_sale_per_page"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Iva incluido en los precios"
	description="Si no tilda esta opcion, se sumara el procentaje del IVA a los precios de los articulos.">
		<b-form-checkbox
		:value="1"
		:unchecked-value="0"
		v-model="user_configuration.iva_included">
			Iva incluido en los precios
		</b-form-checkbox>
	</b-form-group>
	<b-form-group 
	label="Setear fecha de actualizacion en los articulos sea cual sea la infomacion que modifique"
	description="Si no tilda esta opcion, la seteara la fecha de actualizacion de un articulo  solo cuando se actualiza su precio.">
		<b-form-checkbox
		:value="1"
		:unchecked-value="0"
		v-model="user_configuration.set_articles_updated_at_always">
			Setear fecha de actualizacion en los articulos solo cuando se actualiza su precio
		</b-form-checkbox>
	</b-form-group>
	<b-form-group>
		<b-button
		block
		variant="primary"
		@click="update">
			<btn-loader
			text="Actualizar"
			:loader="loading"></btn-loader>
		</b-button>
	</b-form-group>
</b-card>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		update() {
			if (!this.loading) {
				this.loading = true
				this.$api.put('user', this.user)
				.then(res => {
					this.loading = false
					this.$toast.success('Datos actualizados')
				})
				.catch(err => {
					this.loading = false
					console.log(err)
					this.$toast.error('Error al actualizar datos')
				})
			}
		},
	}
}
</script>