<template>
	<div
	class="model-form">
		<images
		:model="model"
		:model_name="model_name"></images>	

		<b-form-row
		class="m-b-0">
			<b-col
			v-for="(prop, index) in properties"
			v-if="showProperty(prop, model, false, true)"
			:md="getCol(prop, 6)"
			:lg="getCol(prop, 4)"
			:xl="getCol(prop, 3)"
			:key="'model-prop-'+index">
				<b-form-group>
					<label
					class="form-label">
						<i 
						v-if="prop.has_many"
						class="icon-down"></i>
						<i 
						v-else
						class="icon-right"></i>
						{{ label(prop) }}
					</label>
					<div>
						<p
						v-if="prop.only_show"
						class="m-b-0 m-l-25">
							<strong 
							v-if="propText(model, prop) != ''">
								{{ propText(model, prop) }}
							</strong>
							<span
							v-else>
								No hay
							</span>
						</p>
						<div
						v-else>
							<div
							v-if="useSearch(prop)">
								<search-component
								class="m-b-15"
								:id="model_name+'-'+prop.key"
								@setSelected="setSelected"
								:model_name="prop.store"
								:model="model"
								:show_btn_create="prop.show_btn_create"
								clear_query
								:prop="prop"></search-component>
								
								<div
								v-if="saving_belongs_to_many && prop.belongs_to_many"
								class="align-center">
									<b-spinner small class="m-r-10" variant="primary"></b-spinner>
									Guardando
								</div>
							</div>


							<belongs-to-many-checkbox
							v-if="prop.belongs_to_many && prop.belongs_to_many.with_checkbox"
							:model="model"
							:prop="prop"></belongs-to-many-checkbox>

							<has-many
							v-if="prop.has_many"
							:parent_model="model"
							:parent_model_name="model_name"
							:prop="prop"></has-many>

					        <b-form-datepicker
							v-if="prop.type == 'date'"
					        placeholder="Fecha"
					        :disabled="isDisabled(prop)"
					        v-model="model[prop.key]"></b-form-datepicker>

							<div
							v-if="prop.type == 'radio'">
								<b-form-radio
								v-for="model_radio in modelsToSearch(prop, model)"
								:key="prop.key+'-'+model_radio.id"
								:value="model_radio.id"
								:name="model_name+'-'+prop.key"
								:id="prop.key+'-'+model_radio.id"
								v-model="model[prop.key]">
									<div
									v-if="prop.props_to_show_in_radio">
										<p
										v-for="prop_to_show in prop.props_to_show_in_radio">
											{{ model_radio[prop_to_show] }}
										</p>
									</div>
									<span
									v-else>
										{{ model_radio.name }}
									</span>
								</b-form-radio>
							</div>

							<b-form-input
							v-if="prop.type == 'text' || prop.type == 'number' || prop.type == 'password'"
					        :disabled="isDisabled(prop)"
							:placeholder="'Ingresar '+prop.text"
							:type="prop.type"
							@keyup.enter="save"
							v-model="model[prop.key]"></b-form-input>

							<b-form-textarea
							v-if="prop.type == 'textarea'"
					        :disabled="isDisabled(prop)"
							:placeholder="'Ingresar '+prop.text"
							:type="prop.type"
							v-model="model[prop.key]"></b-form-textarea>

							<b-form-select
							v-else-if="prop.type == 'select'"
							@change="setChange(prop)"
					        :disabled="isDisabled(prop)"
							v-model="model[prop.key]"
							:options="getOptions(prop)"></b-form-select>

							<b-form-checkbox
							v-else-if="prop.type == 'checkbox'"
					        :disabled="isDisabled(prop)"
							v-model="model[prop.key]"
							:value="prop.value"
							:unchecked-value="prop.unchecked_value">
								{{ prop.text }}
							</b-form-checkbox>

							<div
							v-else-if="prop.type == 'boolean'">
								<p
								v-if="model[prop.key]">
									Si
								</p>
								<p
								v-else>
									No
								</p>
							</div>

							<b-button
					    	v-if="prop.show_model"
					    	class="m-r-15"
					    	@click="setModel(prop)"
							variant="primary">
								<i class="icon-plus"></i>
								{{ btnText(prop) }}
							</b-button>

							<div
					    	v-if="prop.belongs_to_many && !prop.belongs_to_many.related_with_all && !prop.belongs_to_many.with_checkbox">
								<table-component
								:loading="false"
								:models="model[prop.key]"
								:properties="propsToShowInBelongsToMany(prop)"
								:model_name="prop.belongs_to_many.model_name"
								:pivot="prop.belongs_to_many"
								:pivot_model="model"
								:set_model_on_click="false"
								:show_btn_edit="false">
									<template v-slot:default="slotProps">
										<slot name="belongs" :model="slotProps.model"></slot>
										<b-button
										class="m-l-15"
										variant="danger"
										@click="removeModel(prop, slotProps.model)">
											<i class="icon-trash"></i>
										</b-button>
									</template>  
								</table-component>	
							</div>

							<p
							class="function-value"
							v-if="prop.function">
								{{ getFunctionValue(prop, model) }}
							</p>

							<b-button
							v-if="(prop.type == 'radio') && model[prop.key] != prop.value"
							variant="outline-primary"
							size="sm"
							@click="clear(prop)">
								Limpiar
							</b-button>
						</div>

						<!-- <hr> -->

					</div>

				</b-form-group>
			</b-col>
		</b-form-row>
		
		<b-form-row
		class="m-b-0"
		v-if="model.id && !from_has_many">
			<b-col
			md="6">
				<label
				class="form-label">
					<i class="icon-right"></i>
					Creado
				</label>
				<b-form-input
				disabled
				:value="date(model.created_at)+' '+since(model.created_at)"></b-form-input>
			</b-col>
			<b-col
			md="6">
				<label
				class="form-label">
					<i class="icon-right"></i>
					Actualizado
				</label>
				<b-form-input
				disabled
				:value="date(model.updated_at)+' '+since(model.updated_at)"></b-form-input>
			</b-col>
		</b-form-row>
		
		<slot :model="model"></slot>

		<slot 
		v-if="!from_has_many"
		name="buttons">
			<btn-loader
			@clicked="save"
			:loader="loading"
			text="Guardar"></btn-loader>

			<btn-delete
			v-if="_show_btn_delete"
			:model_name="model_name"
			:model="model"
			:modal="'delete-'+model_name"></btn-delete>
		</slot>
		
	</div>
</template>
<script>
import HasMany from '@/components/common/model/HasMany'
import BelongsToManyCheckbox from '@/components/common/model/BelongsToManyCheckbox'
import Images from '@/components/common/model/Images'
export default {
	props: {
		model: Object,
		properties: Array,
		model_name: String,
		has_many_parent_model: Object,
		has_many_prop_name: String,
		check_can_delete: {
			type: Boolean,
			default: false,
		},
		show_btn_delete: {
			type: Boolean,
			default: true,
		},
		form_to_filter: {
			type: Boolean,
			default: false,
		},
		from_has_many: {
			type: Boolean,
			default: false,
		},
		parent_model: {
			type: Object,
			default: null,
		},
		actions_after_save: Array,
	},
	data() {
		return {
			loading: false,
			saving_belongs_to_many: false,
		}
	},
	computed: {
		_show_btn_delete() {
			if (this.check_can_delete) {
				return this.can(this.model_name+'.delete')
			}
			return this.show_btn_delete
		},
	},
	methods: {
		useSearch(prop) {
			return prop.type == 'search'
			return prop.type == 'search' || (prop.belongs_to_many && !prop.belongs_to_many.related_with_all && !prop.belongs_to_many.with_checkbox && !prop.belongs_to_many.can_not_modify)
		},
		getCol(prop, size) {
			if (this.useSearch(prop) || prop.has_many || (prop.belongs_to_many && prop.belongs_to_many.can_not_modify)) {
				return 12
			} 
			return size
		},
		removeModel(prop, model) {
			let index = this.model[prop.key].findIndex(_model => {
				return _model.id == model.id 
			})
			this.model[prop.key].splice(index, 1)
		},
		propsToShowInBelongsToMany(prop) {
			if (prop.belongs_to_many.props_to_show) {
				return prop.belongs_to_many.props_to_show 
			}
			return this.modelPropertiesFromName(prop.belongs_to_many.model_name)
		},
		isDisabled(prop) {
			if (prop.disabled && !this.form_to_filter) {
				return true 
			}
			return false
		},
		clear(prop) {
			this.model[prop.key] = prop.value 
			if (this.isRelationKey(prop)) {
				this.model[this.modelNameFromRelationKey(prop, false, false)] = null
			}
		},
		setChange(prop) {
			if (prop.on_change) {
				this[prop.on_change](prop)
			}
		},
		setPivotProps(prop) {
			if (this.model[prop.key] && this.model[prop.key] != 0) {
				prop.properties_to_set_on_change.forEach(prop_to_set => {
					if (prop_to_set.relation_to_set) {
						console.log(prop_to_set.relation_to_set)
						this.model[prop_to_set.relation_to_set].forEach(model => {
							let selected_relationship = model[prop_to_set.find_on].find(relationship => {
								return relationship.id == this.model[prop.key]
							})
							let array = prop_to_set.set.split('.')
							if (array[1]) {
								model[array[0]][array[1]] = selected_relationship[array[0]][array[1]]
							}
						})
					} else if (prop_to_set.search_on_models) {
						let models_to_search = this.modelsStoreFromName(prop_to_set.search_on_models)
						let finded = models_to_search.find(model_to_search => {
							return model_to_search.id == this.model[prop.key]
						})
						this.model[prop_to_set.set] = finded[prop_to_set.set]
					}
				})
				// this.model['packages'].forEach(model => {
				// 	let selected_relationship = model['locations'].find(relationship => {
				// 		return relationship.id == this.model['location_id']
				// 	})
				// 	model.pivot['price'] = selected_relationship.pivot['price']
				// })
			}
		},
		pivotModels(prop) {
			return this.model[this.modelPlural(prop.belongs_to_many.model_name)]
		},
		btnText(prop) {
			if (prop.btn_model_text) {
				return 'Agregar '+prop.btn_model_text
			}
			return 'Agregar '+prop.text
		},
		setModel(prop) {
			let properties = []
			prop.properties.forEach(_prop => {
				properties.push({
					key: _prop,
					value: this.model[_prop]
				})
			})
			console.log(properties)
			this.$store.commit(prop.store+'/setModel', {model: null, properties: properties})
			this.$bvModal.show(this.routeString(this.modelNameFromRelationKey(prop)))
		},
		label(prop) {
			if (prop.type == 'checkbox') {
				return ''
			}
			return prop.text
		},
		setSelected(result) {
			console.log(result)
			let prop = result.prop
			if (prop.belongs_to_many) {
				let model_to_add = result.model 
				if (!model_to_add && prop.belongs_to_many.create_if_not_exist) {
					this.saving_belongs_to_many = true
					this.$api.post(prop.store, {
						name: result.query,
						status: 'inactive',
					})
					.then(res => {
						model_to_add = res.data.model
						this.saving_belongs_to_many = false 
						this.setBelongsToManyPivotProps(prop, model_to_add, result)
						this.$store.commit(prop.store+'/addInactiveModel', model_to_add)
					})
					.catch(err => {
						this.saving_belongs_to_many = false 
						console.log(err)
					})
				} else if (model_to_add) {
					this.setBelongsToManyPivotProps(prop, model_to_add, result)
				}
			} else {
				this.$set(this.model, result.prop.key, result.model.id)
				this.$set(this.model, this.modelNameFromRelationKey(result.prop), result.model)
			}
		},
		setBelongsToManyPivotProps(prop, model_to_add, result) {
			if (prop.belongs_to_many.properties_to_set) {
				model_to_add.pivot = {}
				prop.belongs_to_many.properties_to_set.forEach(prop_to_set => {
					if (prop_to_set.from_store) {
						let models = this.modelsStoreFromName(prop_to_set.store)
						models.forEach(model => {
							model_to_add.pivot[prop_to_set.store+'_'+model.id] = ''
						})
					} else if (typeof prop_to_set.value === 'object') {
						if (model_to_add[prop_to_set.value.key]) {
							model_to_add.pivot[prop_to_set.key] = model_to_add[prop_to_set.value.key] 
						} else {
							model_to_add.pivot[prop_to_set.key] = prop_to_set.value.value_if_undefined
						}
					} else {
						model_to_add.pivot[prop_to_set.key] = prop_to_set.value 
					}
				})
			}
			this.model[result.prop.key].unshift(model_to_add)
		},
		save() {
			if (this.check() && !this.loading) {
				this.loading = true 
				let route = this.routeString(this.model_name)
				let model_to_send = this.getModelToSend()
				if (this.model.id) {
					this.$api.put(route+'/'+this.model.id, model_to_send)
					.then(res => {
						this.loading = false 
						this.$toast.success('Actualizado')
						if (this.has_many_parent_model) {
							let index = this.has_many_parent_model[this.has_many_prop_name].findIndex(model => {
								return model.id == this.model.id 
							})
							if (index != -1) {
								this.has_many_parent_model[this.has_many_prop_name].splice(index, 1, res.data.model)
							}
						} else {
							this.$store.commit(this.replaceGuion(this.model_name)+'/add', res.data.model)
						}
						this.$bvModal.hide(this.model_name)
						this.callActions()
					})
					.catch(err => {
						console.log(err)
						this.$toast.error('Hubo un Error')
						this.loading = false
					})
				} else {
					this.$api.post(route, model_to_send)
					.then(res => {
						this.loading = false 
						this.$toast.success('Guardado')
						if (this.has_many_parent_model) {
							this.$set(this.has_many_parent_model, this.has_many_prop_name, this.has_many_parent_model[this.has_many_prop_name].concat([res.data.model]))
						} else {
							this.$store.commit(this.replaceGuion(this.model_name)+'/add', res.data.model)
						}
						this.$bvModal.hide(this.model_name)
						this.callActions()
					})
					.catch(err => {
						console.log(err)
						this.$toast.error('Hubo un error')
						this.loading = false
					})
				}
			}
		},
		getModelToSend() {
			let model_to_send = {
				...this.model
			}
			let selected_model = this.$store.state[this.model_name].selected_model 
			if (typeof selected_model != 'undefined') {
				model_to_send.model_id = selected_model.id 
			}
			console.log('model_to_send')
			console.log(model_to_send)
			return model_to_send
		},
		check() {
			let ok = true
			this.properties.forEach(prop => {
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
		},
		callActions() {
			this.actions_after_save.forEach(action => {
				this.$store.dispatch(action)
			})
			this.$emit('modelSaved', this.model)
		}
	},
	components: {
		ModelComponent: () => import('@/components/common/model/Index'),
		SearchComponent: () => import('@/components/common/search/Index'),
		HasMany,
		BelongsToManyCheckbox,
		TableComponent: () => import('@/components/common/display/TableComponent'),
		Images,
		BtnLoader: () => import('@/components/common/BtnLoader2'),
		BtnDelete: () => import('@/components/common/BtnDelete'),
	}
}
</script>
<style lang="sass">
.model-form 
	[class^='col-']
		padding-bottom: 15px
		margin-bottom: 15px
		border-bottom: 1px solid rgba(0,0,0,.1)
	.custom-radio 
		margin-bottom: 1em 
		p 
			margin-bottom: 0
			text-align: left
	.form-group
		margin-bottom: 0 !important
	hr 
		width: 100%
	.function-value
		font-size: 1.5em
		font-weight: bold
</style>