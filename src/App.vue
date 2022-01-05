<template>
  <div id="app">

    <variform ref="variform" :form-element-data="form" :validators="validators" :converters="converters" :slot-names="['custom']">

      <!-- custom element with name custom -->
      <template v-slot:custom="slotProps">
        <custom-element :form-element-data="slotProps.formElementData" />
      </template>

    </variform>

    <div class="container">

      <div class="row">
        <button @click="generate">capture data</button>
        <div>{{outData}}</div>
      </div>

      <div class="row">
        <button @click="reset">reset</button>
      </div>

      <div class="row">
        <button @click="populate">populate form</button>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';
import Variform from './variform/Variform.vue';
import formTemplate from './form';
import validators from './validators';
import converters from './converters';
import CustomElement from './CustomElement.vue';

@Component({
    components: {
        CustomElement,
        Variform,
    },
})
export default class App extends Vue {

    form = _.cloneDeep(formTemplate)

    validators = validators

    converters = converters

    outData = {}

    async generate() {
        this.outData = await (this.$refs.variform as Variform).generateData(this.form);
    }

    async populate() {
        await (this.$refs.variform as Variform).populateForm(this.form, this.outData);
    }

    reset() {
        this.form = _.cloneDeep(formTemplate);
    }
}
</script>
