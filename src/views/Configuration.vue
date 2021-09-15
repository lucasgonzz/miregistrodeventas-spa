<template>
	<div id="configuration">
		<b-row>
			<b-col
			cols="12"
			lg="8">
				<account></account>
			</b-col>
			<b-col
			cols="12"
			lg="8">
				<password></password>
			</b-col>
			<b-col
			cols="12"
			lg="8">
				<online></online>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import Account from '@/components/configuration/components/Account'
import Password from '@/components/configuration/components/Password'
import Online from '@/components/configuration/components/Online'
export default {
	components: {
		Account,
		Password,
		Online,
	},
}
</script>