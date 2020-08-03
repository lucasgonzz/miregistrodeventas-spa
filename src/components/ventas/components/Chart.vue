<template>
    <div id="chart">
        <div class="row m-b-20">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="m-0">
                            <strong>
                                <i class="icon-chart"></i>
                                Total recaudado por mes
                            </strong>
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="row">                            
                            <div class="col-12 col-md-8">
                                <bar-chart :chart-data="statistics.first" :options="options" :height="300"></bar-chart>
                            </div>
                            <div class="col-12 col-md-4 p-t-30">
                                <ul class="list-group">
                                    <!-- <li class="list-group-item">
                                        <button class="btn btn-primary"
                                                @click="ordenar">
                                            <span v-show="old_data.length > 0">
                                                Volver
                                            </span>
                                            <span v-show="old_data.length == 0">
                                                Ordenar
                                            </span>
                                        </button>
                                    </li> -->
                                    <li class="list-group-item" 
                                    v-for="(label, index) in statistics.first.labels"
                                    :key="index">
                                        {{ label }}
                                        <strong class="float-right">
                                            {{ price(statistics.first.datasets[0].data[index]) }}
                                        </strong>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <hr> -->
        <div class="row" v-if="canUse('sale_time', user) && sales_times_length > 0">
            <div class="col">
                <div class="card">
                    <div class="card-header">
                        <h5 class="m-0">
                            <strong>
                                Porcentajes de ventas segun el mes y horario
                            </strong>
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div 
                            class="col-12 col-md-3 col-pie-chart" 
                            v-for="(pie, index) in statistics.second.pie"
                            :key="index">
                                <strong>
                                    {{ statistics.first.labels[index] }}
                                </strong>
                                <hr>
                                <pie-chart :chart-data="pie"></pie-chart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BarChart from './BarChart.js'
import PieChart from './PieChart.js'

export default {
    components: {
        BarChart,
        PieChart,
    },
    props: ['statistics', 'user', 'sales_times_length'],
    data () {
        return {
            datacollection: null,
            old_labels: [],
            old_data: [],
            old_pie_data: [],
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            },
        }
    },
    mounted () {
      this.fillData()
    },
    methods: {
        otro() {
            // this.statistics.first.labels = 
        },
        fillData () {
            this.datacollection = {
                labels: [this.getRandomInt(), this.getRandomInt()],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [this.getRandomInt(), this.getRandomInt()]
                    }, 
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [this.getRandomInt(), this.getRandomInt()]
                    }
                ]
            }
        },
        ordenar() {
            if (this.old_labels.length == 0) {
                var items = []
                for (var i = this.statistics.first.labels.length - 1; i >= 0; i--) {
                    let obj = {
                        label: this.statistics.first.labels[i],
                        data: this.statistics.first.datasets[0].data[i],
                        // pie_data: this.statistics.second.pie[i]
                    }     
                    items.push(obj)
                }
                this.old_labels = this.statistics.first.labels
                this.old_data = this.statistics.first.datasets[0].data
                // this.old_pie_data = this.statistics.second.pie
                items.sort(this.comparar)
                let new_labels = []
                let new_data = []
                // let new_pie_data = []
                items.forEach(item => {
                    new_labels.push(item.label)
                    new_data.push(item.data)
                    // new_pie_data.push(item.pie_data)
                })

                this.statistics.first = {
                    labels: new_labels,
                    datasets: [
                        {
                            label: 'Ventas ordenadas',
                            backgroundColor: '#38c172',
                            data: new_data,
                        }
                    ],
                }
            } else {
                this.statistics.first = {
                    labels: this.old_labels,
                    datasets: [
                        {
                            label: 'Ventas',
                            backgroundColor: '#38c172',
                            data: this.old_data,
                        }
                    ],
                }
                this.statistics.second.pie = this.old_pie_data
                this.old_labels = []
                this.old_data = []
            }
        },
        comparar(a, b) {
            if (a.data > b.data) {
                return 1;
            }
            if (a.data < b.data) {
                return -1;
            }
            // a must be equal to b
                return 0;
        },
        cambia() {
            this.statistics.first = {
                labels: ['dasd', 'ads', 'adas', 'asdas', 'asdas', 'asdasd'],
                datasets: [
                    {
                        label: 'Hola',
                        backgroundColor: ['#38c172','#3490','#38c172','#38c172', '#38c172', '#38c172'],
                        data: [12312, 234324, 242332, 12321, 23434, 234344],
                    },
                ],
            }
        },
        getRandomInt () {
            this.statistics.first.datasets[0].backgroundColor = ['#38c172','#3490','#38c172','#38c172', '#38c172', '#38c172']
            // return Math.floor(Math.random() * (50 - 5 + 1)) + 5
        }
    }
    } 
</script>
<style scpoder>
.list-group {
    max-height: 300px;
    overflow-y: auto;
}
</style>