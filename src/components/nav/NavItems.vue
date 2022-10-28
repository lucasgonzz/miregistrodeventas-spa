<template>
<div
class="nav-items">
    <b-nav-item 
    v-for="route in routes" 
    @click="toRoute(route)"
    v-if="showRoute(route)"
    :class="activeLink(route)">
        {{ route.text }}
    </b-nav-item>
    <!-- <b-nav-item 
    @click="toOnline"
    v-if="has_online"
    :class="activeLink('Online')">
        Online
        <b-badge
        variant="danger"
        v-show="unconfirmed_orders_questions_calls_length > 0">
            {{ unconfirmed_orders_questions_calls_length }}
        </b-badge>
    </b-nav-item> -->
</div>
</template>
<script>
import mixin from '@/mixins/nav'
export default {
    name: 'NavItems',
    mixins: [mixin],
    components: {
    },
}
</script>
<style lang="sass">
.nav-items
	@media screen and (min-width: 768px)
		display: flex
</style>