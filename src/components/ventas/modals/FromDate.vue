<template>
<b-modal id="from-date" title="Mostrar ventas por fecha" hide-footer>
    <b-card 
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
    </b-card>
    <b-card 
    v-show="from_ == '' && to_ == ''"
    header="Solo las de una fecha" no-body>
        <b-form-group
        label="Fecha"
        label-for="date">
            <b-form-datepicker
            placeholder="Seleccione una fecha"
            v-model="only_one_date_"
            id="date"></b-form-datepicker>
        </b-form-group>
    </b-card>
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
import sales_from_date from '@/mixins/sales_from_date'
export default {
    name: 'FromDate',
    mixins: [sales_from_date],
	data() {
		return {
			from_: '',
			to_: '',
            only_one_date_: '',
            last_day_inclusive_: 1,
		}
	},
	methods: {
		search() {
            this.$store.commit('sales/setSelectedClient', null)
            if (this.only_one_date_ != '') {
                this.$store.commit('sales/setOnlyOneDate', this.only_one_date_)
                this.$store.commit('sales/days_previus_sales/setDaySelected', this.only_one_date_)
                this.$store.commit('sales/setFrom', '')
                this.$store.commit('sales/setTo', '')
                this.$store.commit('sales/setLastDayInclusive', '')
                this.onlyOneDate()
            } else {
                this.$store.commit('sales/days_previus_sales/setDaySelected', null)
                this.$store.commit('sales/setFrom', this.from_)
                this.$store.commit('sales/setTo', this.to_)
                this.$store.commit('sales/setLastDayInclusive', this.last_day_inclusive_)
                this.$store.commit('sales/setOnlyOneDate', '')
                this.fromDate()
            }
            this.resetInputs()
            this.$bvModal.hide('from-date')
		},
        getDayTo() {
            return this.to_.split('-')[2]
        },
        resetInputs() {
            this.from_ = ''
            this.to_ = ''
            this.only_one_date_ = ''
        }
	}
}
</script>