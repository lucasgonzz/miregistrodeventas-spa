<template>
	<div 
	@click="clicked"
	:class="_class"
	class="card-component c-p s b-r-5 animate__animated animate__fadeIn">
		<img 
		v-if="hasImage(properties)"
		:src="imageUrl(getImageProp(properties, model), true)"></img>
		<div 
		v-else-if="title"
		class="title">
			{{ title.title_prefix }}
			{{ propText(model, title) }}
		</div>
		<p
		v-for="prop in propertiesToShow(properties)"
		v-if="showProperty(prop, model, true)">
			{{ prop.text }}
			<strong>
				{{ propText(model, prop) }}
			</strong>
		</p>
		<div
		v-if="pivot && pivot.properties_to_set">
			<b-form-group
			v-for="(prop, index) in pivot.properties_to_set"
			:key="'pivot-prop-'+index"
			:label="prop.text">
				<b-form-input
				:type="prop.type"
				:placeholder="'Ingrese '+prop.text"
				v-model="model.pivot[prop.key]"></b-form-input>
				<hr>
			</b-form-group>
		</div>
		<slot v-bind:model="model"></slot>
	</div>
</template>
<script>
import display from '@/mixins/display'
export default {
	mixins: [display],
	props: {
		model: Object,
		model_name: String,
		properties: Array,
		set_model_on_click: Boolean,
		on_click_set_property: String,
		pivot: Object,
		pivot_model: Object,
	},
	computed: {
		_class() {
			if (this.set_model_on_click) {
				return 'apretable'
			}
			return ''
		},
		title() {
			if (!this.hasImage(this.properties)) {
				let titles = this.properties.filter(prop => {
					return prop.is_title 
				})

				if (titles.length) {
					if (titles.length == 1) {
						return titles[0]
					} 
					let title
					titles.forEach(_title => {
						console.log(_title)
						console.log(this.propText(this.model, _title))
						if (this.propText(this.model, _title)) {
							title = _title
						} 
					})
					return title 
				}
			}
			return null
		}
	},
	watch: {
		pivot_model() {
			console.log('cambio pivot')
			this.setPivotValues()
		},
	},
	methods: {
		clicked() {
			if (this.set_model_on_click) {
				if (this.on_click_set_property) {
					this.setModel(this.model[this.on_click_set_property], this.model_name, this.properties)
				} else {
					this.setModel(this.model, this.model_name, this.properties)
				}
			} else {
				this.$emit('clicked', this.model)
			}
		},
		getReferencedModel() {
			console.log(this.model)
			let model_relation = this.model[this.pivot.relations_with].find(relationship => {
				return relationship.id == this.pivot_model[this.pivot.related_by]
			})
			console.log(model_relation)
			return model_relation
		},
		setPivotValues() {
			console.log(this.model)
			let model_relation = this.model[this.pivot.relations_with].find(relationship => {
				return relationship.id == this.pivot_model[this.pivot.related_by]
			})
			console.log(model_relation)
		}
	}
}
</script>
<style lang="sass">
.card-component
	@media screen and (max-width: 576px)
		width: 98%
	@media screen and (min-width: 576px) and (max-width: 768px)
		width: 48%
	@media screen and (min-width: 768px) and (max-width: 992px)
		width: 31%
	@media screen and (min-width: 992px)
		width: 300px
	// width: 300px
	display: flex
	flex-direction: column 
	margin: 1em 1%
	padding: 1em
	background: #FFF
	.title 
		font-size: 40px 
		font-weight: bold
		height: 300px
		display: flex
		flex-direction: row
		justify-content: center
		align-items: center
	p 
		text-align: left
		&:last-child
			margin-bottom: 0
</style>