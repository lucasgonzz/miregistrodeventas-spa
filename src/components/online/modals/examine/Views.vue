<template>
	<b-modal
	:title="`Vistas de ${this.article.name}`"
	id="views">
		<b-container>
			<b-row>
				<b-col
				cols="12">
					<b-card
					no-body
					v-for="view in article.views"
					:key="view.id">
						<div>
							{{ date(view.created_at) }}
							{{ hour(view.created_at) }}
							{{ buyerName(view) }}
						</div>
					</b-card>
				</b-col>
			</b-row>
		</b-container>
	</b-modal>
</template>
<script>
import mixin from '@/mixins/online'
export default {
	mixins: [mixin],
	computed: {
		article() {
			return this.$store.state.articles.article_views
		}
	}
}
</script>