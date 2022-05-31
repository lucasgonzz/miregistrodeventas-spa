<template>
	<b-card
	class="shadow-5 b-r-1">
		<b-form-group
		label="Razon social">
			<b-form-input
			placeholder="Ingrese su razon social"
			v-model="user.afip_information.razon_social"></b-form-input>
		</b-form-group>
        <b-form-group
        label="Condicion frente al IVA">
            <b-form-select
            :options="iva_condition_options"
            v-model="user.afip_information.iva_condition_id"></b-form-select>
        </b-form-group>
		<b-form-group
		label="CUIT">
			<b-form-input
			placeholder="Ingrese su CUIT"
			v-model="user.afip_information.cuit"></b-form-input>
		</b-form-group>
		<b-form-group
		label="Ingresos brutos">
			<b-form-input
			placeholder="Ingrese su Ingresos brutos"
			v-model="user.afip_information.ingresos_brutos"></b-form-input>
		</b-form-group>
		<b-form-group
		label="Inicio de actividades">
	        <b-form-datepicker
	        class="m-t-10"
	        placeholder="Seleccione la fecha de inicio de actividades"
	        v-model="user.afip_information.inicio_actividades">
	        </b-form-datepicker>
		</b-form-group>
		<b-form-group
		label="Punto de venta para factura electronica">
			<b-form-input
			type="number"
			placeholder="Ingrese su Punto de venta para factura electronica"
			v-model="user.afip_information.punto_venta"></b-form-input>
		</b-form-group>
		<save-btn></save-btn>
	</b-card>
</template>
<script>
import iva_conditions from '@/mixins/iva_conditions'
import SaveBtn from '@/components/configuration/components/facturacion/SaveBtn'
export default {
	mixins: [iva_conditions],
	components: {
		SaveBtn,
	},
}
</script>