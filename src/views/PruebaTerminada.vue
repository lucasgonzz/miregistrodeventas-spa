<template>
<b-row >
	<b-col 
	md="6">
		<b-card 
		class="shadow-1 b-r-1"
		title="Prueba terminada">
			<p>
				Hola {{ user.name }}, tu prueba de ComercioCity ha caducado, si te sentiste cómodo en nuestra plataforma nos gustaría invitarte a que te invitamos a que te suscribas, presionando el botón de abajo vas a poder elegir el plan que mejor se adapte a tus necesidades.
			</p>
			<b-button
			block
			:to="{ name: 'Subscription', params: { view: 'plan' } }"
			variant="primary">
				<i class="icon-right"></i>
				Elegir Plan
			</b-button>
		</b-card>
	</b-col>
</b-row>
</template>