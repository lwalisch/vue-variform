<template>
    <div>
        <template v-if="formElementData.type === 'custom'">
            <div class="col-3">
                {{formElementData.label}}
            </div>
            <div class="col-8">
                <input type="date" v-model="formElementData.content.value" class="variform-input" />
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'CustomElement',
    props: ['formElementData'],
});
</script>
