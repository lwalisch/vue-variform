import Vue from 'vue';
import Variform from './Variform.vue';
import FormElement from './FormElement.vue';
import '../plugins/fontawesome';
import './simple-grid.css';
import './style.css';

const Components = {
    Variform,
    FormElement,
};

Object.keys(Components).forEach((name) => Vue.component(name, Components[name]));

export default Components;
