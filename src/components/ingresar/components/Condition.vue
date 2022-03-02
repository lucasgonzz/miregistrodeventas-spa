<template>
	<b-form-row
	v-if="can('conditions')">
		<b-col>
			<p
			class="c-p"
			@click="show ? show = false : show = true">
				Condiciones
				<icon-show
				:show="show"></icon-show>
			</p>
			<div 
			v-show="show"
			class="j-start m-b-15">
				<b-form-radio
				class="m-r-30"
				v-for="condition in conditions"
				:key="condition.id"
				:value="condition.id"
				v-model="article.condition_id">
					{{ condition.name }}
				</b-form-radio>
			</div>
		</b-col>
	</b-form-row>
</template>
<script>
import IconShow from '@/components/common/IconShow'
export default {
	props: ['article'],
	components: {
		IconShow,
	},
	computed: {
		conditions() {
			return this.$store.state.conditions.conditions
		},
	},
	data() {
		return {
			show: false
		}
	}
}
</script>