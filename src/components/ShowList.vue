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
        <tr v-if="$root.filteredShows.length === 0 && $root.searchQuery !== ''" class="no-match">
            <td colspan="3">
                <em>
                    <svg class="has-text-grey-lighter" style="position:relative;width:1rem;top:.125rem;margin-left:.25rem;" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
                    </svg>
                    <span class="has-text-grey">
                        Aucun film ne correspond à votre recherche
                    </span>
                </em>
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
