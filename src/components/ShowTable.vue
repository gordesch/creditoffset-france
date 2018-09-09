<template>
    <table class="table is-striped is-narrow is-hoverable is-fullwidth" id="showTable">
        <thead>
            <th>
                <ShowSearch />
            </th>
            <th>
                Pré-COS
            </th>
            <th>
                COS
            </th>
        </thead>
        <ShowList />
    </table>
</template>

<script>
    import ShowSearch from "./ShowSearch";
    import ShowList from "./ShowList";

    export default {
        name: "ShowTable",
        components: {
            ShowList,
            ShowSearch
        }
    }
</script>

<style scoped>
</style>