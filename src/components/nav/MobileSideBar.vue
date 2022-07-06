<template>
	<b-sidebar id="mobile-nav" title="ComercioCity" shadow>
        <nav>
            <b-nav vertical>
                <nav-items></nav-items>
                <b-nav-item 
                class="nav-item-config"
                @click="logout">
                    <i class="icon-sign-out"></i>
                    Salir
                </b-nav-item>
            </b-nav>
        </nav>
    </b-sidebar>
</template>
<script>
import NavItems from '@/components/nav/NavItems'

import nav from '@/mixins/nav'
export default {
    mixins: [nav],
    components: {
        NavItems,
    },
}
</script>