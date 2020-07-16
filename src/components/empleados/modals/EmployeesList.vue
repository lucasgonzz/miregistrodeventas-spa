<template>
<b-modal id="employees-list" title="Mis empleados">
    <b-container fluid>
        <b-row>
            <b-col>
                <b-list-group v-show="employees.length">
                    <b-list-group-item
                    v-for="employee in employees"
                    :key="employee.id">
                        {{ employee.name }}
                        <b-button
                        class="float-right m-l-5"
                        variant="danger"
                        @click="deleteEmployee(employee)">
                            <i class="icon-trash-3" v-show="deleting_employee != employee.id"></i>
                            <span class="spinner-border spinner-border-sm" v-show="deleting_employee == employee.id"></span>
                        </b-button>
                        <span class="float-right">
                            Alta: {{ since(employee.created_at) }}
                        </span>
                    </b-list-group-item>
                </b-list-group>
                <p v-show="employees.length == 0">
                    No hay empleados registrados aún
                </p>
            </b-col>
        </b-row>
    </b-container>
</b-modal>

</template>
<script>
export default {
    name: 'EmployeesList',
    props: ['employees', 'deleting_employee'],
    methods: {
        deleteEmployee(employee) {
            this.$emit('deleteEmployee', employee)
        }
    }
}
</script>
