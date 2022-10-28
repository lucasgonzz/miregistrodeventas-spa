<template>
	<div>
		<b-form-checkbox
		v-for="(id, index) in model[prop.key+'_id']"
		:key="id"
		:value="id"
		v-model="model[prop.key+'_id']">
			{{ model[prop.key][index].name }}
		</b-form-checkbox>
	</div>
</template>
<script>
export default {
	props: {
		model: Object,
		prop: Object,
	}
}
</script>