<template>
	<b-sidebar id="mobile-home-nav" title="ComercioCity" shadow>
        <nav>
            <b-nav vertical>
                <b-nav-item 
                :to="{name: 'Login'}">
                    <b-button
                    variant="primary">
                        <i class="icon-user"></i>
                        Iniciar sesión
                    </b-button>
                </b-nav-item>
            </b-nav>
        </nav>
    </b-sidebar>
</template>