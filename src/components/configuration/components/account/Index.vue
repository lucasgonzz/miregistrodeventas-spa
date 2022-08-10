<template>
<b-row
v-if="view == 'cuenta'">
	<b-col
	lg="8">
		<general></general>	
		<advanced></advanced>	
		<password></password>	
	</b-col>
</b-row>
</template>
<script>
import General from '@/components/configuration/components/account/General'
import Advanced from '@/components/configuration/components/account/Advanced'
import Password from '@/components/configuration/components/account/Password'
import configuration from '@/mixins/configuration'
export default {
	mixins: [configuration],
	components: {	
		General,
		Advanced,
		Password,
	},
}
</script>