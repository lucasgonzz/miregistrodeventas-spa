<template>
	<div>
		<b-form-group
		v-for="prop in props"
		:label="label(prop)">
			<b-form-input
			v-if="prop.type == 'text' || prop.type == 'number'"
			:placeholder="'Ingresar '+prop.text"
			:type="prop.type"
			v-model="model[prop.key]"></b-form-input>
			<b-form-textarea
			v-if="prop.type == 'textarea'"
			:placeholder="'Ingresar '+prop.text"
			:type="prop.type"
			v-model="model[prop.key]"></b-form-textarea>
			<b-form-select
			v-else-if="prop.type == 'select'"
			v-model="model[prop.key]"
			:options="getOptions(prop.options_store, prop.text)"></b-form-select>
			<b-form-checkbox
			v-else-if="prop.type == 'checkbox'"
			v-model="model[prop.key]"
			:value="prop.value"
			:unchecked-value="prop.unchecked_value">
				{{ prop.text }}
			</b-form-checkbox>
		</b-form-group>

		<b-button
		variant="primary"
		block
		@click="save">
			<btn-loader
			:loader="loading"
			text="Guardar"></btn-loader>
		</b-button>

		<btn-delete
		:model_name="model_name"
		:model="model"
		:modal="'delete-'+model_name"></btn-delete>
	</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import BtnDelete from '@/components/common/BtnDelete'
export default {
	props: ['model', 'props', 'model_name'],
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		label(prop) {
			if (prop.type == 'checkbox') {
				return ''
			}
			return prop.text
		},
		save() {
			if (this.check() && !this.loading) {
				this.loading = true 
				if (this.model.id) {
					this.$api.put(this.modelPlural(this.model_name)+'/'+this.model.id, this.model)
					.then(res => {
						this.loading = false 
						this.$toast.success('Actualizado')
						this.$store.commit(this.modelPlural(this.model_name)+'/update', res.data[this.model_name])
						this.$bvModal.hide(this.model_name)
					})
					.catch(err => {
						console.log(err)
						this.$toast.error('Hubo un Error')
						this.loading = false
					})
				} else {
					this.$api.post(this.modelPlural(this.model_name), this.model)
					.then(res => {
						this.loading = false 
						this.$toast.success('Guardado')
						this.$store.commit(this.modelPlural(this.model_name)+'/add', res.data[this.model_name])
						this.$bvModal.hide(this.model_name)
					})
					.catch(err => {
						console.log(err)
						this.$toast.error('Hubo un error')
						this.loading = false
					})
				}
			}
		},
		check() {
			let ok = true
			this.props.forEach(prop => {
				if (prop.required) {
					if (ok && prop.type == 'select' && this.model[prop.key] == 0) {
						this.$toast.error('Ingrese '+prop.text)
						ok = false
					} else if (ok && this.model[prop.key] == '') {
						this.$toast.error('Ingrese '+prop.text)
						ok = false
					}
				} 
			})
			return ok
		}
	},
	components: {
		BtnLoader,
		BtnDelete,
	}
}
</script>