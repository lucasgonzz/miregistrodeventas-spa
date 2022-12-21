<template>
<b-card
v-if="sub_view == routeString(plural(model_name))"
class="shadow b-r-1"
:title="plural(model_name)">
	<view-component
	:show_previus_days="false"
	:model_name="model_name">
		<template v-slot:modal_buttons="props">
    		<div
	    	v-if="props.model.payment_method_type_id && props.model.payment_method_type_id != 0">
	    		<keys
	    		:payment_method="props.model"></keys>
    		</div>
		</template>
	</view-component>
</b-card>
</template>
<script>
import ViewComponent from '@/components/common/view/Index'
import Keys from '@/components/configuration/components/online/payment-methods/Keys'
export default {
	components: {
		ViewComponent,
		Keys,
	},
	computed: {
		model_name() {
			return 'payment_method'
		},
	}
}
</script>