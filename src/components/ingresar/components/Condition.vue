<template>
	<b-form-group
	v-if="hasOnline"
	label="Condicion">
		<div class="j-start">
			<b-form-radio
			class="m-r-30"
			v-for="condition in conditions"
			:key="condition.id"
			:value="condition.id"
			v-model="article.condition_id">
				{{ condition.name }}
			</b-form-radio>
		</div>
	</b-form-group>
</template>
<script>
import Vue from 'vue'
export default {
	props: ['article'],
	computed: {
		conditions() {
			return this.$store.state.conditions.conditions
		}
	},
	methods: {
	}
}
</script>