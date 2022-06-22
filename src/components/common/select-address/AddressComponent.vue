<template>
	<div 
	@click="setSelected"
	class="address card-moderna m-b-15 c-p apretable">
		<div class="p-15">
			<p>
				<strong>
					{{ address.street }} {{ address.street_number }}
				</strong>
			</p>
			<p
			class="m-b-0">
				{{ address.city }}
			</p>
		</div>
	</div>
</template>
<script>
export default {
	props: ['address'],
	methods: {
		setSelected() {
			this.$emit('setSelected', this.address)
		}
	}
}
</script>