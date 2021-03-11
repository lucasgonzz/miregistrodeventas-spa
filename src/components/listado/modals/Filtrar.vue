<template>
<b-modal id="listado-filtrar" title="Filtrar" hide-footer>
    <div>
        <!-- <b-form-group
        label="Ordenar los artículos"
        label-for="articles-order">
            <b-form-select
            id="articles-order"
            v-model="filtro.ordenar"
            :options="order_options"></b-form-select>
        </b-form-group> -->
        <b-form-group
        label="Los que pertenescan a la categoría"
        label-for="categories">
            <b-form-select
            id="categories"
            v-model="filtro.category_id"
            :options="categories_options"></b-form-select>
        </b-form-group>
        <b-form-group
        label="Los que tengan un precio mayor a">
            <b-form-input
            @keydown.enter="filter"
            type="number"
            placeholder="Precio minimo"
            v-model="filtro.precio_min"></b-form-input>
        </b-form-group>
        <b-form-group
        label="Los que tengan un precio menor a">
            <b-form-input
            @keydown.enter="filter"
            type="number"
            placeholder="Precio maximo"
            v-model="filtro.precio_max"></b-form-input>
        </b-form-group>
        <b-form-group
        label="Los que hayan sido ingresados despues de">
            <b-form-datepicker
            placeholder="Fecha minima"
            type="number"
            v-model="filtro.fecha_min">
            </b-form-datepicker>
        </b-form-group>
        <b-form-group
        label="Los que hayan sido ingresados antes de">
            <b-form-datepicker
            placeholder="Fecha maxima"
            type="number"
            v-model="filtro.fecha_max">
            </b-form-datepicker>
        </b-form-group>
        <b-form-group>
            <b-form-checkbox
            v-model="filtro.mantener">
                Mantener filtro
            </b-form-checkbox>
        </b-form-group>
        <b-form-group>
            <b-button
            block
            variant="primary"
            @click="filter">
                Filtrar
            </b-button>
        </b-form-group>
    </div>
</b-modal>
</template>
<script>
import moment from 'moment'
export default {
    data() {
        return {
            filtro: {
                category_id: 0,
                precio_min: '',
                precio_max: '',
                fecha_min: '',
                fecha_max: '',
                mantener: false,
            },
            loading: false,
        }
    },
    computed: {
        providers() {
            return this.$store.state.providers.providers
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
        categories_options() {
            let options = []
            options.push({text: 'Seleccione una categoría', value: 0})
            this.categories.forEach(category => {
                options.push({text: category.name, value: category.id})
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
            return this.$store.state.articles.articles
        },
    },
    methods: {
        filter() {
            let filters = this.articles
            let fecha_min
            let fecha_max
            let category_id = this.filtro.category_id
            let precio_min = Number(this.filtro.precio_min)
            let precio_max = Number(this.filtro.precio_max)
            if (this.filtro.fecha_min != '') {
                fecha_min = moment(this.filtro.fecha_min)
            } else {
                fecha_min = ''
            }
            if (this.filtro.fecha_max != '') {
                fecha_max = moment(this.filtro.fecha_max)
            } else {
                fecha_max = ''
            }
            if (precio_min != 0) {
                filters = filters.filter(art => {
                    return art.price >= precio_min
                })
            }
            if (precio_max != 0) {
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
            if (category_id != 0) {
                filters = filters.filter(art => {
                    return art.category_id == category_id
                })
            }
            if (filters.length == this.articles.length) {
                this.$store.commit('articles/setArticlesToShow')
            } else {
                this.$store.commit('articles/setArticlesToShow', filters)
            }
            this.$bvModal.hide('listado-filtrar')
            if (!this.filtro.mantener) {
                this.clear()
            }
        },
        uncheckProviders() {
          this.$emit('uncheckProviders')
        },
        clear() {
            this.filtro.category_id = 0
            this.filtro.precio_min = ''
            this.filtro.precio_max = ''
            this.filtro.fecha_min = ''
            this.filtro.fecha_max = ''
        }
    }
}
</script>
<style scoped lang="sass">
.form-group
    // margin-bottom: 1.5em
</style>