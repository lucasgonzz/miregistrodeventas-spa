<template>
	<b-card
	class="shadow b-r-1">
		<b-form-group
		label="Facturacion en modo Produccion, o en modo de prueba">
			<b-form-checkbox
			:value="1"
			:unchecked-value="0"
			v-model="user.afip_information.afip_ticket_production">
				Facturacion modo Produccion
			</b-form-checkbox>
		</b-form-group>
		<b-form-group
		label="Razon social">
			<b-form-input
			placeholder="Ingrese su razon social"
			v-model="user.afip_information.razon_social"></b-form-input>
		</b-form-group>
        <b-form-group
        label="Condicion frente al IVA">
            <b-form-select
            :options="getOptions('iva_condition_id', 'Condicion frente al IVA')"
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
import SaveBtn from '@/components/configuration/components/facturacion/SaveBtn'
export default {
	components: {
		SaveBtn,
	},
}
</script>