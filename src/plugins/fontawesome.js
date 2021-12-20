import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTimes);
library.add(faPlus);
library.add(faMinus);
Vue.component('font-awesome-icon', FontAwesomeIcon);
