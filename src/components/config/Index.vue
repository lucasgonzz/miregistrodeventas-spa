<template>
<b-modal id="config" hide-header hide-footer size="sm" body-class="p-0">
	<b-list-group>
		<b-list-group-item
		v-b-modal="'update-user'">
			Actualizar usuario
		</b-list-group-item>
		<b-list-group-item
		v-b-modal="'update-password'">
			Actualizar contraseña
		</b-list-group-item>
		<b-list-group-item
		v-if="hasOnline()"
		v-b-modal="'update-deliver-amount'">
			Actualizar precio de envio
		</b-list-group-item>
	</b-list-group>
</b-modal>
</template>