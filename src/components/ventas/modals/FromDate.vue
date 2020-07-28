<template>
<b-modal id="from-date" title="Mostrar ventas por fecha">
    <b-container fluid class="m-0">
        <b-row 
        class="m-b-15"
        v-show="only_one_date == ''">
            <b-col>
                <b-card header="Desde y hasta una fecha" no-body>
                    <b-card-body>
                        <b-form-group
                        label="Desde"
                        label-for="from">
                            <b-form-datepicker
                            v-model="from"
                            id="from"></b-form-datepicker>
                        </b-form-group>
                        <b-form-group
                        label="Hasta"
                        label-for="to">
                            <b-form-datepicker
                            v-model="to"
                            id="to"></b-form-datepicker>
                        </b-form-group>
                        <b-form-checkbox
                        v-show="from != '' && to != ''"
                        v-model="last_day_inclusive"
                        :value="1"
                        :unchecked-value="0">
                            El {{ getDayTo() }} inclusive
                        </b-form-checkbox>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
        <b-row v-show="from == '' && to == ''">
            <b-col>
                <b-card header="Solo las de una fecha" no-body>
                    <b-card-body>
                        <b-form-group
                        label="Fecha"
                        label-for="date">
                            <b-form-datepicker
                            v-model="only_one_date"
                            id="date"></b-form-datepicker>
                        </b-form-group>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
    <template v-slot:modal-footer>
        <b-button
        variant="primary"
        @click="fromDate">
            Buscar
        </b-button>
    </template>
</b-modal>
</template>
<script>
export default {
	data() {
		return {
			from: '',
			to: '',
            only_one_date: '',
            last_day_inclusive: 1,
		}
	},
	methods: {
		fromDate() {
            if (this.only_one_date != '') {
                this.$emit('onlyOneDate', this.only_one_date)
                this.resetInputs()
            } else {
                this.$emit('fromDate', this.from, this.to, this.last_day_inclusive)
                this.resetInputs()
            }
		},
        getDayTo() {
            return this.to.split('-')[2]
        },
        resetInputs() {
            this.from = ''
            this.to = ''
            this.only_one_date = ''
        }
	}
}
</script>