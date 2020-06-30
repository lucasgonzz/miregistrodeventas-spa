<template>
	<b-form-row>
		<b-col md="4">
			<b-form-group>
				<b-form-checkbox 
				class="j-between"
				id="uncontable"
				v-model="article.uncontable"
				:value="1"
				:unchecked-value="0"
				>
					Incontable
				</b-form-checkbox>
			</b-form-group>
		</b-col>
	</b-form-row>
</template>
<script>
export default {
	props: ['article'], 
}
</script>
<style scoped>
	
</style>
