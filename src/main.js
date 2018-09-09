import Vue from 'vue'
import VueFire from 'vuefire'
import slugify from 'underscore.string/slugify'

import App from './App.vue'
import db from './firebase'
//import './registerServiceWorker'

Vue.use(VueFire)
Vue.prototype.$db = db

Vue.config.productionTip = false

document.body.classList.remove('no-js')

new Vue({
    render: h => h(App),
    data () {
        return {
            shows: [],
            searchQuery: '',
        }
    },
    firestore: {
        shows: db.collection('shows').orderBy('modifiedAt', 'desc'),
    },
    computed: {
        filteredShows: function () {
            let vm = this
            return this.shows.filter(function (item) {
                return item.slug.indexOf(slugify(vm.searchQuery)) !== -1
            })
        }
    },
}).$mount('#app')
