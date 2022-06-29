<template>
<b-modal id="from-date" title="Mostrar ventas por fecha" hide-footer>
    <!-- <b-card 
    v-show="only_one_date_ == ''"
    header="Desde y hasta una fecha" no-body>
        <b-form-group
        label="Desde"
        label-for="from">
            <b-form-datepicker
            placeholder="Seleccione una fecha inicio"
            v-model="from_"
            id="from"></b-form-datepicker>
        </b-form-group>
        <b-form-group
        label="Hasta"
        label-for="to">
            <b-form-datepicker
            placeholder="Seleccione una fecha final"
            v-model="to_"
            id="to"></b-form-datepicker>
        </b-form-group>
        <b-form-checkbox
        v-show="from_ != '' && to_ != ''"
        v-model="last_day_inclusive_"
        :value="1"
        :unchecked-value="0">
            El {{ getDayTo() }} inclusive
        </b-form-checkbox>
    </b-card> -->
    <b-form-group
    label="Fecha">
        <b-form-datepicker
        placeholder="Seleccione una fecha"
        v-model="date_"></b-form-datepicker>
    </b-form-group>
    <b-form-group class="m-b-0">
        <b-button
        block
        variant="primary"
        @click="search">
            Buscar
        </b-button>
    </b-form-group>
</b-modal>
</template>
<script>
export default {
    name: 'FromDate',
    data() {
        return {
            date_: ''
        }
    },
	methods: {
		search() {
            this.$store.commit('sales/setDate', this.date_)
            this.$store.dispatch('sales/getFromDate')
            this.$bvModal.hide('from-date')
		},
	}
}
</script>