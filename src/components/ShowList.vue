<template>
    <tbody>
        <tr v-for="show in $root.filteredShows" :key="show.id">
            <td>
                <span class="show-title">
                    {{ show.title }}
                </span>
                <span class="show-year">
                    ({{ show.year }})
                </span>
            </td>
            <td>
                {{ show.precos }}
            </td>
            <td>
                {{ show.cos }}
            </td>
        </tr>
    </tbody>
</template>

<script>
    export default {
        name: 'ShowList',
    }
</script>

<style scoped>
    .show-title {
        font-weight: bold;
    }

    .show-year {
        color: hsl(210,9%,54%);
    }

    td {
        vertical-align: middle;
    }
</style>
