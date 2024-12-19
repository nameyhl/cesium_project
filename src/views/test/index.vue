<template>
    <myTable :columns="columns" :tableData="tableData" :height="height" />
</template>

<script lang="ts" setup>
import myTable from '../../components/myTable.vue';

let columns = [
    {
        label: 'Name',
        prop: 'name',
        width: 100,
        fixed: 'left',
    },
    {
        label: 'Age',
        prop: 'age',
        width: 100,
    },
    {
        label: 'Address',
        prop: 'address',
    },
    {
        label: 'Date',
        prop: 'date',
    },
    {
        label: 'Action',
        prop: 'action',
        width: 200,
        fixed: 'right',
    },
];
let tableData = [
    {
        name: 'John',
        age: 18,
        address: 'New York No. 1 Lake Park',
        date: '2016-10-03',
        action: '',
    },
    {
        name: 'John',
        age: 18,
        address: 'New York No. 1 Lake Park',
        date: '2016-10-03',
        action: '',
    },
    {
        name: 'John',
        age: 18,
        address: 'New York No. 1 Lake Park',
        date: '2016-10-03',
        action: '',
    },
]
let height = 1000;

</script>