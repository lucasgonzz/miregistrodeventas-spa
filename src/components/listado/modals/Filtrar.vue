<template>
<b-modal id="listado-filtrar" title="Filtrar" hide-footer>
    <div>
        <b-form-group
        label="Los que pertenescan a la categoría"
        label-for="categories">
            <b-form-select
            id="categories"
            v-model="filter.category_id"
            :options="categories_options"></b-form-select>
        </b-form-group>
        <b-form-group
        label="Los que pertenescan a la subcategoría"
        label-for="sub-categories">
            <b-form-select
            id="sub-categories"
            v-model="filter.sub_category_id"
            :options="sub_categories_options(filter)"></b-form-select>
        </b-form-group>
        <b-form-group
        label="Los que pertenescan al proveedor">
            <b-form-select
            id="providers"
            v-model="filter.provider_id"
            :options="providers_options"></b-form-select>
        </b-form-group>
        <b-form-group
        label="Los que tengan un precio mayor a">
            <b-form-input
            @keydown.enter="filter"
            type="number"
            placeholder="Precio minimo"
            v-model="filter.precio_min"></b-form-input>
        </b-form-group>
        <b-form-group
        label="Los que tengan un precio menor a">
            <b-form-input
            @keydown.enter="filter"
            type="number"
            placeholder="Precio maximo"
            v-model="filter.precio_max"></b-form-input>
        </b-form-group>
        <b-form-group
        label="Los que hayan sido ingresados despues de">
            <b-form-datepicker
            placeholder="Fecha minima"
            type="number"
            v-model="filter.fecha_min">
            </b-form-datepicker>
        </b-form-group>
        <b-form-group
        label="Los que hayan sido ingresados antes de">
            <b-form-datepicker
            placeholder="Fecha maxima"
            type="number"
            v-model="filter.fecha_max">
            </b-form-datepicker>
        </b-form-group>
        <b-form-group>
            <b-form-checkbox
            v-model="filter.with_images">
                Que tengan foto
            </b-form-checkbox>
        </b-form-group>
        <b-form-group>
            <b-form-checkbox
            v-model="filter.featured">
                Que sean destacados
            </b-form-checkbox>
        </b-form-group>
        <b-form-group>
            <b-form-checkbox
            v-model="filter.mantener">
                Mantener filter
            </b-form-checkbox>
        </b-form-group>
        <b-form-group>
            <b-button
            block
            variant="primary"
            @click="filtrar">
                Filtrar
            </b-button>
        </b-form-group>
    </div>
</b-modal>
</template>
<script>
import moment from 'moment'
import categories from '@/mixins/categories'
export default {
    mixins: [categories],
    data() {
        return {
            loading: false,
        }
    },
    computed: {
        filter: {
            get() {
                return this.$store.state.article.filter
            },
            set(value) {
                this.$store.commit('article/setFilter', value)
            }
        },
        providers() {
            return this.$store.state.provider.models
        },
        categories() {
            return this.$store.state.categories.categories
        },
        providers_options() {
            let options = []
            options.push({text: 'Seleccione un proveedor', value: 0})
            this.providers.forEach(provider => {
                options.push({text: provider.name, value: provider.id})
            })
            return options
        },
        order_options() {
            let options = []
            options.push({text: 'De mas nuevos a mas viejos', value: 'nuevos-viejos'})
            options.push({text: 'De mas viejos a mas nuevos', value: 'viejos-nuevos'})
            options.push({text: 'De mayor a menor precio', value: 'caros-baratos'})
            options.push({text: 'De menor a mayor precio', value: 'baratos-caros'})
            return options
        },
        type_options() {
            let options = []
            options.push({text: 'Seleccione el tipo de articulo', value: 0})
            options.push({text: 'Marcadores', value: 'markers'})
            if (this.user.online) {
                options.push({text: 'Destacados', value: 'featured'})
            }
            return options
        },
        articles() {
            return this.$store.state.article.models
        },
    },
    methods: {
        filtrar() {
            let filters = this.articles
            let fecha_min
            let fecha_max
            let category_id = this.filter.category_id
            let sub_category_id = this.filter.sub_category_id
            let provider_id = this.filter.provider_id
            let with_images = this.filter.with_images
            let featured = this.filter.featured
            let precio_min = Number(this.filter.precio_min)
            let precio_max = Number(this.filter.precio_max)
            if (this.filter.fecha_min != '') {
                fecha_min = moment(this.filter.fecha_min)
            } else {
                fecha_min = ''
            }
            if (this.filter.fecha_max != '') {
                fecha_max = moment(this.filter.fecha_max)
            } else {
                fecha_max = ''
            }
            if (precio_min != '') {
                filters = filters.filter(art => {
                    return art.price >= precio_min
                })
            }
            if (precio_max != '') {
                filters = filters.filter(art => {
                    return art.price <= precio_max
                })
            }
            if (fecha_min != '') {
                filters = filters.filter(art => {
                    return moment(art.created_at).isAfter(fecha_min)
                })
            }
            if (fecha_max != '') {
                filters = filters.filter(art => {
                    return moment(art.created_at).isBefore(fecha_max)
                })
            }
            if (provider_id != 0) {
                filters = filters.filter(art => {
                    return this.isFromProvider(art)
                })
            }
            if (sub_category_id != 0) {
                filters = filters.filter(art => {
                    return art.sub_category_id == sub_category_id
                })
            } else if (category_id != 0) {
                filters = filters.filter(art => {
                    return art.sub_category ? art.sub_category.category_id == category_id : false
                })
            }
            if (with_images) {
                filters = filters.filter(art => {
                    return art.images.length
                })
            }
            if (featured) {
                filters = filters.filter(art => {
                    return art.featured
                })
            }
            console.log(filters)
            this.$store.commit('article/setToShow', filters)
            this.$store.commit('article/setFiltered', filters)
            this.$bvModal.hide('listado-filtrar')
            if (!this.filter.mantener) {
                this.clear()
            }
        },
        isFromProvider(article) {
            let is_from_provider = false
            article.providers.forEach(pro => {
                if (pro.id == this.filter.provider_id) {
                    is_from_provider = true
                }
            })
            return is_from_provider
        },
        uncheckProviders() {
          this.$emit('uncheckProviders')
        },
        clear() {
            this.filter.category_id = 0
            this.filter.sub_category_id = 0
            this.filter.provider_id = 0
            this.filter.precio_min = ''
            this.filter.precio_max = ''
            this.filter.fecha_min = ''
            this.filter.fecha_max = ''
            this.filter.with_images = false
            this.filter.featured = false
        }
    }
}
</script>