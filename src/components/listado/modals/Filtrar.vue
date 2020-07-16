<template>
<b-modal id="listado-filtrar" title="Filtrar" scrollable>
    <b-container>
        <b-form-row>
            <b-col>
                <b-form-group
                label="Ordenar los artículos"
                label-for="articles-order">
                    <b-form-select
                    id="articles-order"
                    v-model="filtro.ordenar"
                    :options="order_options"></b-form-select>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row v-show="!isProvider(user)">
            <b-col cols="12" class="m-b-10">
                <b-form-group
                label="Los que pertenecan al proveedor"
                label-for="providers">
                    <b-form-select
                    id="providers"
                    v-model="filtro.provider"
                    :options="providers_options"></b-form-select>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col cols="12" class="m-b-10">
                <b-form-group
                label="Los que pertenecan a la categoría"
                label-for="categories">
                    <b-form-select
                    id="categories"
                    v-model="filtro.category"
                    :options="categories_options"></b-form-select>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col>
                <label>Los que tengan un precio entre</label>
                <b-form-group>
                    <b-form-input
                    type="number"
                    placeholder="Precio minimo"
                    v-model="filtro.precio_entre.min"></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input
                    type="number"
                    placeholder="Precio maximo"
                    v-model="filtro.precio_entre.max"></b-form-input>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col>
                <label>Los que hayan sido ingresados entre</label>
                <b-form-datepicker class="m-b-10">
                    <b-form-input
                    type="number"
                    placeholder="Fecha inicio"
                    v-model="filtro.fecha_entre.min"></b-form-input>
                </b-form-datepicker>
                <b-form-datepicker>
                    <b-form-input
                    type="number"
                    placeholder="Fecha fin"
                    v-model="filtro.fecha_entre.max"></b-form-input>
                </b-form-datepicker>
            </b-col>
        </b-form-row>
    </b-container>
    <template v-slot:modal-footer>
        <b-button
        variant="primary"
        @click="filter">
            Filtrar
        </b-button>
    </template>
</b-modal>
</template>
<script>
export default {
    props: ['filtro', 'user', 'providers', 'categories'],
    computed: {
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
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filtro)
        },
        uncheckProviders() {
          this.$emit('uncheckProviders')
        },
    }
}
</script>