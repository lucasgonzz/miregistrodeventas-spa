<template>
	<b-form-row
	v-if="has_online">
		<b-col>
			<p
			class="c-p"
			@click="show ? show = false : show = true">
				Descripciones
				<icon-show
				:show="show"></icon-show>
			</p>
			<div
			v-show="show">
				<b-form-group
				v-for="(description, index) in article.descriptions"
				:key="index"
				class="m-b-15"
				label="Descripcion">
					<b-form-input
					class="m-b-15"
					v-model="description.title"
					placeholder="Titulo">
					</b-form-input>
					<b-form-textarea
					v-model="description.content"
					placeholder="Descripcion para el articulo">
					</b-form-textarea>
				</b-form-group>
				<b-form-group
				v-if="check()"
				class="j-start m-b-15">
					<b-button
					size="sm"
					variant="primary"
					@click="addDescription">
						<i class="icon-plus"></i>
						Agregar descripcion
					</b-button>
				</b-form-group>
			</div>
		</b-col>
	</b-form-row>
</template>
<script>
import edit_articles from '@/mixins/edit_articles'
import IconShow from '@/components/common/IconShow'
export default {
	props: ['article'],
	components: {
		IconShow,
	},
	mixins: [edit_articles],
	data() {
		return {
			show: false
		}
	},
	methods: {
		addDescription() {
			if (this.check()) {
				this.article.descriptions.push({
					title: '',
					content: '',
				})
			}
		},
		check() {
			return this.article.descriptions[this.article.descriptions.length-1].content && this.article.descriptions[this.article.descriptions.length-1].content.length
		}
	},
}
</script>
