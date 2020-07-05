<template>
<b-modal id="delete-articles" :title="title">
	<b-container>
		<p>
			{{ message }}
		</p>
		<p>
			{{ confirmation_message }}
		</p>
	</b-container>
	<template v-slot:modal-footer>
		<b-button
		variant="danger"
		@click="deleteArticles">
			<i class="icon-trash-3" v-show="!deleting_articles"></i>
			<span class="spinner-border spinner-border-sm" v-show="deleting_articles"></span>
			Eliminar
		</b-button>
	</template>
</b-modal>

</template>
<script>
export default {
	props: ['selected_articles', 'deleting_articles'],	
	computed: {
		title() {
			if (this.selected_articles.selected_articles.length == 1) {
				return 'Eliminar 1 artículo'
			} else {
				return `Eliminar ${this.selected_articles.selected_articles.length} artículos`
			}
		},
		message() {
			if (this.selected_articles.selected_articles.length == 1) {
				return '¿Seguro que quiere eliminar este artículo?'
			} else {
				return `¿Seguro que quiere eliminar estos ${this.selected_articles.selected_articles.length} artículos?`
			}
		},
		confirmation_message() {
			if (this.selected_articles.selected_articles.length == 1) {
				return 'Se eliminara y no podrá volver a restaurarse'
			} else {
				return `'Se eliminaran y no podrán volver a restaurarse'`
			}
		}
	},
	methods: {
		deleteArticles() {
			this.$emit('deleteArticles')
		}
	}
}
</script>	