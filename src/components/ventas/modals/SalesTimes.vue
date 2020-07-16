<template>
<b-modal id="sales-times" title="Horarios de ventas" scrollable hide-footer>
    <b-container fluid>
        <b-row>
            <b-col>
                <b-card header="Crear un nuevo horario de ventas">
                    <div>
                        <b-form-group>
                            <b-form-input
                            type="text"
                            placeholder="Nombre para el horario de ventas"
                            v-model="name"></b-form-input>
                        </b-form-group>
                        <b-form-group
                        label="Desde"
                        label-for="desde">
                            <b-form-input
                            id="desde"
                            type="time"
                            v-model="from"></b-form-input>
                        </b-form-group>
                        <b-form-group
                        label="Hasta"
                        label-for="hasta">
                            <b-form-input
                            id="hasta"
                            type="time"
                            v-model="to"></b-form-input>
                        </b-form-group>
                    </div>
                    <template v-slot:footer>
                        <b-button href=""
                            :class="name.length == 0 ? 'disabled' : ''" 
                            variant="primary"
                            @click="saveSaleTime">
                            <i v-show="!saving_sale_time"
                                class="icon-check"></i>
                            <span v-show="saving_sale_time"
                                    class="spinner-border spinner-border-sm"></span>
                            Guardar
                        </b-button>
                    </template>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card header="Mis horarios">
                    <b-list-group v-if="sales_times.length">
                        <b-list-group-item
                        v-for="sale_time in sales_times"
                        :key="sale_time.id">
                            <p>
                                {{ sale_time.name }}
                                <b-button 
                                variant="danger"
                                class="float-right"
                                size="sm"
                                @click="deleteSaleTime(sale_time)">
                                    <i v-show="!deleting_sale_time.includes(sale_time.id)"
                                        class="icon-trash-3"></i>
                                    <span v-show="deleting_sale_time.includes(sale_time.id)"
                                            class="spinner-border spinner-border-sm"></span>
                                </b-button>
                            </p>
                            <p>
                                Desde las {{ hour(sale_time.from) }} hasta las {{ hour(sale_time.to) }}
                            </p>
                        </b-list-group-item>
                    </b-list-group>
                    <p class="text-center m-0" v-else>
                        No hay horarios de ventas ingresados aún
                    </p>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</b-modal>
</template>
<script>
export default {
    props: [],
    data() {
        return {
            name: '',
            from: '00:00',
            to: '09:00',
            sales_times: [],
            saving_sale_time: false,
            deleting_sale_time: [],
        }
    },
    methods: {
        hour(d) {
            return d.substring(0, 5)
        },
        deleteSaleTime(sale_time) {
            this.deleting_sale_time.push(sale_time.id)
            this.$api.get('sale-time/'+sale_time.id)
            .then(() => {
                let i = this.deleting_sale_time.indexOf(sale_time.id)
                this.deleting_sale_time.splice(i, 1)
                this.$toast.success('Horario de venta eliminado correctamente')
                this.$emit('getSalesTimes')
                this.getSalesTimes()
            })
            .catch(err => {
                let i = this.deleting_sale_time.indexOf(sale_time.id)
                this.deleting_sale_time.splice(i, 1)
                this.$toast.error('No se pudo eliminar, recargue la página y pruebe nuevamente, por favor')
                console.log(err)
            })
        },
        saveSaleTime() {
            this.saving_sale_time = true
            this.$api.post('sale-time', {
                name: this.name,
                from: this.from,
                to: this.to,
            })
            .then(res => {
                this.saving_sale_time = false
                if (res.data.ok) {
                    this.$toast.success('Horario guardado correctamente')
                    this.getSalesTimes()
                    this.name = ''
                    this.from = '00:00'
                    this.to = '00:00'
                    this.$emit('getSalesTimes')
                } else {
                    this.$toast.error('Ya hay un horario de ventas con la hora inicio mas alta que la final')
                }
            })
            .catch(err => {
                this.saving_sale_time = false
                this.$toast.error('Error al guardar horario, intentelo denuevo, por favor')
                console.log(err)
            })
        },
        getSalesTimes() {
            this.$api.get('sale-time')
            .then(res => {
                this.sales_times = res.data
                // this.sales_times.forEach(sale_time => {
                //     this.deleting_sale_time.push(sale_time.id)
                // })
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.getSalesTimes()
    }
}
</script>
<style scoped>

</style>
