<template>
	<b-form-row>
		<b-col>
			<b-form-group
			class="col-autocomplete"
			label="Etiquetas">
				<autocomplete 
				auto-select
				ref="tagName"
				id="tag-name"
				:search="search" 
				:get-result-value="getResultValue"
				placeholder="Buscar un artículo"
				@submit="setTag"></autocomplete>
			</b-form-group>
			<div
			class="j-start">
				<div
				class="tag bg-primary"
				v-for="tag in article.tags">
					{{ tag.name }}
					<span 
					@click="removeTag(tag)"
					class="btn-remove">
						<i class="icon-cancel"></i>
					</span>
				</div>
			</div>
		</b-col>
	</b-form-row>
</template>
<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import edit_articles from '@/mixins/edit_articles'
export default {
	props: ['article'],
	components: {
		Autocomplete
	},
	mixins: [edit_articles],
	computed: {
		tags() {
			return this.$store.state.tags.tags
		},
	},
	methods: {
		search(input) {
			if (input.length < 2) { return [] }
			return this.tags.filter(tag => {
				return tag.name.toLowerCase().includes(input.toLowerCase())
			})
		},
		getResultValue(tag) {
			return tag.name
		},
		setTag(tag) {
			if (tag) {
				this.article.tags.push(tag)
				this.$refs.tagName.value = ''
			} else {
				console.log('nueva')
				this.saveTag()
			}
		},
		saveTag() {
			this.$api.post('tags', {
				name: this.$refs.tagName.value
			})
			.then(res => {
				let tag = res.data.tag
				this.setTag(tag)
				this.$store.commit('tags/add', tag)
			})
			.catch(err => {
				console.log(err)
			})
		},
		removeTag(tag) {
			let index = this.article.tags.findIndex(t => {
				return t.id == tag.id
			})
			this.article.tags.splice(index, 1)
		}
	},
}
</script>
<style lang="sass">
.tag 
	color: #FFF
	border-radius: 50px
	padding: .3em 1em
	margin: 0 .5em
	.btn-remove
		padding-left: .5em
		cursor: pointer
</style>
