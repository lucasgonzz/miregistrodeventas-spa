<template>
	<b-form-row
	v-if="has_online">
		<b-col>
			<b-form-group
			v-if="has_online"
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
		</b-col>
	</b-form-row>
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