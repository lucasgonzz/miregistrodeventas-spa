<template>
<div>
	<modal-from-dates
	:model_name="model_name"></modal-from-dates>
	<b-row>
		<b-col
		cols="12"
		md="3">
			<title-component
			:model_name="model_name"
			:clear_selected="clear_selected"
			v-if="show_title"></title-component>
		</b-col>
		<b-col
		cols="12"
		md="6">
			<week-days-nav
			:model_name="model_name"></week-days-nav>
		</b-col>
		<b-col
		class="col-btn"
		v-if="show_modal"
		cols="12"
		md="3">
			<b-button
			variant="primary"
			v-b-modal="'from-date'">
				Por fecha
			</b-button>
		</b-col>
	</b-row>
</div>
</template>
<script>
import TitleComponent from '@/components/common/previus-days/Title'
import WeekDaysNav from '@/components/common/previus-days/WeekDaysNav'
import ModalFromDates from '@/components/common/previus-days/ModalFromDates'

import moment from 'moment'
export default {
	name: 'PreviusDays',
	components: {
		TitleComponent,
		WeekDaysNav,
		ModalFromDates,
	},
    props: {
    	model_name: String,
    	clear_selected: {
    		type: Boolean,
    		default: false
    	},
    	show_modal: {
    		type: Boolean,
    		default: true,
    	},
    	show_title: {
    		type: Boolean,
    		default: true,
    	},
    },
}
</script>
<style scoped lang="sass">
.row
	margin-bottom: 15px
.col-btn
	display: flex
	@media screen and (max-width: 768px)
		align-items: center
	@media screen and (min-width: 768px)
		align-items: flex-end
</style>