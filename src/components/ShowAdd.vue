<template>
    <div>
        <button @click="toggleModal" class="button is-primary is-outlined is-fullwidth">
            <svg aria-hidden="true" style="width:1rem;" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path>
            </svg>
            &nbsp;
            Ajouter un film
        </button>
        <div class="modal" v-bind:class="{ 'is-active': activeModal }">
            <div @click="toggleModal" class="modal-background"></div>
            <div class="modal-content box">
                <button @click="toggleModal" class="modal-close is-large" aria-label="close"></button>
                <form @submit.prevent="addShow(selected, precos, cos)" ref="addShowForm">
                    <b-field label="Sélectionner un film">
                        <b-autocomplete
                                v-model="title"
                                :data="data"
                                :keep-first="true"
                                :open-on-focus="true"
                                placeholder="Barbara"
                                field="title"
                                :loading="isFetching"
                                @input="searchShows"
                                @select="option => selected = option"
                                autofocus>

                            <template slot-scope="props">
                                <div class="media">
                                    <div class="media-left">
                                        <img width="32" :src="`https://image.tmdb.org/t/p/w92/${props.option.poster_path}`">
                                    </div>
                                    <div class="media-content">
                                        <strong>
                                            {{ props.option.title }}
                                        </strong>
                                        <br>
                                        Sortie le <strong>{{ props.option.release_date_formatted }}</strong>
                                    </div>
                                </div>
                            </template>

                            <template slot="empty">
                                <div class="media">
                                    <div class="media-left">
                                        <div style="width:32px;height:48px;background-color:grey;">
                                        </div>
                                    </div>
                                    <div class="media-content" style="margin:auto 0;">
                                        Commencez à taper un titre...
                                    </div>
                                </div>
                            </template>

                            <template slot="header">
                                <div style="margin:-.375rem -.5rem;">
                                    <div style="text-align: center;margin-bottom:.2rem;">
                                        <small>
                                            Fourni par
                                            <a href="https://www.themoviedb.org/" target="_blank" rel="noopener">
                                                The Movie Database
                                            </a>
                                        </small>
                                    </div>
                                    <hr style="margin:0;">
                                </div>
                            </template>
                        </b-autocomplete>
                    </b-field>
                    <div class="field">
                        <label class="label">Credit Offset</label>
                        <div class="control cos">
                            <cleave
                                    v-model="cos"
                                    :options="cleaveOptions"
                                    class="input"
                                    type="text"
                                    placeholder="06:30"
                                    pattern="^([0-5][0-9]):[0-5][0-9]$"
                                    inputmode="numeric"
                                    minlenth="5"
                                    maxlength="5"
                                    required
                            ></cleave>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Pré Credit Offset <small>(optionnel)</small></label>
                        <div class="control cos">
                            <cleave
                                    v-model="precos"
                                    :options="cleaveOptions"
                                    class="input"
                                    type="text"
                                    placeholder="02:15"
                                    pattern="^([0-5][0-9]):[0-5][0-9]$"
                                    inputmode="numeric"
                                    minlength="5"
                                    maxlength="5"
                            ></cleave>
                        </div>
                    </div>

                    <button type="submit" class="button is-primary is-fullwidth" v-bind:class="{ 'is-disabled': submitDisabled }" v-bind:disabled="submitDisabled">
                        <svg aria-hidden="true" style="width:1rem;" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path>
                        </svg>
                        &nbsp;
                        Ajouter un Credit Offset
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import debounce from 'lodash/debounce'
    import Field from 'buefy/dist/components/field'
    import Autocomplete from 'buefy/dist/components/autocomplete'
    import slugify from 'underscore.string/slugify'
    import Cleave from 'vue-cleave-component';

    Vue.use(Field)
    Vue.use(Autocomplete)

    export default {
        name: "ShowAdd",
        components: {
            Cleave,
        },
        data () {
            return {
                title: '',
                precos: '',
                cos: '',
                activeModal: false,
                cleaveOptions: {
                    time: true,
                    timePattern: ['m', 's']
                },
                data: [],
                selected: null,
                isFetching: false
            }
        },
        computed: {
            submitDisabled () {
                if (this.selected === null) {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            addShow (show, precos, cos) {
                const slug = slugify(show.title)
                const modifiedAt = new Date()

                cos = cos.substr(0, 2) + ":" + cos.substr(2, 2)
                precos = precos.substr(0, 2) + ":" + precos.substr(2, 2)
                if (precos.length === 1) precos = ''

                this.$root.$db.collection('shows').add({
                    tmdbId: show.id,
                    title: show.title,
                    year: show.release_date.substring(0, 4),
                    poster: show.poster_path,
                    slug,
                    precos,
                    cos,
                    modifiedAt
                })
                    .then(function(docRef) {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });
                this.title = this.precos = this.cos = ''
                this.toggleModal()
            },
            toggleModal () {
                this.activeModal = !this.activeModal
                this.title = this.precos = this.cos = ''
            },
            searchShows: debounce(function () {
                if (!this.title.length) {
                    this.data = []
                    return
                }
                this.isFetching = true
                axios.get(`https://api.themoviedb.org/3/search/movie?api_key=6b81aee3d60e680d5dbe2199e9184ec8&language=fr-FR&region=FR&query=${this.title}`)
                    .then(({ data }) => {
                        this.data = []
                        data.results.forEach((item) => this.data.push(item))
                        this.data.forEach(function (item) {
                            const date = new Date(item.release_date)
                            const options = { weekday: undefined, year: 'numeric', month: 'long', day: '2-digit' };
                            item.release_date_formatted = date.toLocaleDateString('fr-FR', options)
                        })
                    })
                    .catch((error) => {
                        this.data = []
                        throw error
                    })
                    .finally(() => {
                        this.isFetching = false
                    })
            }, 500),
        },
    }
</script>

<style scoped>
    .control.cos {
        width: 4rem;
    }
</style>