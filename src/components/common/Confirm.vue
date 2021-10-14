<template>
<b-modal id="confirm" hide-footer hide-header size="sm">
	<p
	class="text-center">
		{{ text }}
	</p>
	<b-button
	block
	class="m-b-0"
	@click="confirm"
	:variant="variant">
		<btn-loader
		:text="btn_text"
		:loader="loading"></btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'ConfirmDelete',
	components: {
		BtnLoader,
	},
	props: ['text', 'btn_text', 'variant', 'loading'],
	methods: {
		confirm() {
			this.$emit('confirm')
		},
	}
}
</script>