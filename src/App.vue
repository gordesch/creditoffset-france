<template>
    <div id="app">

        <div class="columns">
            <div class="column is-6 is-offset-3">
                <ShowAdd />
            </div>
        </div>

        <ShowTable />

    </div>
</template>

<script>
import ShowAdd from './components/ShowAdd'
import ShowTable from './components/ShowTable'

export default {
    name: 'app',
    components: {
        ShowAdd,
        ShowTable,
    }
}
</script>

<style>
</style>
