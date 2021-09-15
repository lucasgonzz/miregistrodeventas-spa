<template>
<b-modal id="workdays-schedules" title="Horarios" hide-footer>
	<schedules></schedules>
	<!-- <workdays></workdays> -->
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import Schedules from '@/components/config/workdays-schedules/Schedules'
import Workdays from '@/components/config/workdays-schedules/Workdays'
export default {
	components: {
		BtnLoader,
		Schedules,
		Workdays,
	},
}
</script>