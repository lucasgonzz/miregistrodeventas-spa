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
		:text="button_text"
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
	computed: {
		text() {
			return this.$store.state.confirm.text
		},
		btn_text() {
			return this.$store.state.confirm.btn_text
		},
		variant() {
			return this.$store.state.confirm.variant
		},
	},
	data() {
		return {
			loading: false
		}
	},
	methods: {
		confirm() {
			this.$store.commit('confirm/confirm')
			this.$emit('confirm')
		},
	}
}
</script>