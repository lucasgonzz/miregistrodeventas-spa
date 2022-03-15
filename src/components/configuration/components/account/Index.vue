<template>
<b-row
v-if="view == 'cuenta'">
	<b-col
	lg="8">
		<general></general>	
		<password></password>	
	</b-col>
</b-row>
</template>
<script>
import General from '@/components/configuration/components/account/General'
import Password from '@/components/configuration/components/account/Password'
import configuration from '@/mixins/configuration'
export default {
	mixins: [configuration],
	components: {
		General,
		Password,
	},
}
</script>