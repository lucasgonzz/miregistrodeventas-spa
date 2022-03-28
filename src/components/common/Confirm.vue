<template>
<b-modal :id="id" hide-footer hide-header size="sm">
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
	name: 'Confirm',
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading: false,
		}
	},
	props: {
		text: String,
		action: String,
		id: String,
		toast: String,
		btn_text: {
			type: String,
			default: 'Eliminar'
		},
		variant: {
			type: String,
			default: 'danger'
		},
	},
	methods: {
		confirm() {
			this.loading = true
			this.$store.dispatch(this.action)
			.then(() => {
				this.loading = false
				this.$toast.success(this.toast)
				this.$bvModal.hide(this.id)
			})
			.catch(err => {
				this.loading = false
				console.log('aca')
			})
		},
	}
}
</script>