# vue-variform

Vue.js component to create forms with various possibilities. 

### Key features
- Form templates containing the input fields are defined using a JSON object. This is convenient for storing different form templates in a database and for rendering forms dynamically.
- It is possible to define a data mapping schema to capture only relevant information of the user input and not the entire JSON object defining the form.
- Captured data from a form can be used to populate the same or a different form at a later point in time. This feature makes it easy for users to edit the initial data afterwards.
- Individual validation functions can be registered for every input field of the form. Unsuccessful validation triggers an error message.
- Input elements and groups can be configured to be dynamically extendable by users to enable the input of lists of the same type of input.
- The library offers the possibility to create custom input fields and groups of input fields for completely individual forms. 
- In terms of design, the variform library uses [simple-grid](https://simplegrid.io/) for positioning the form elements and a very short and simple style.css file that can be easily adapted to fit the design of every application. 

### Demo
See [here](https://lwalisch.github.io/) for a demo.

### Documentation

The documentation is available [here](https://lwalisch.github.io/variform). 

<b>A more detailed documentation including all functionalities of the library will follow soon.</b>

## Installation
```
npm install --save vue-variform
```

## Usage

To use the variform component, simply add two import to the `main.js` file. 
```js
import Vue from 'vue'
import App from './App.vue'
import 'vue-variform'
import 'vue-variform/dist/variform.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```
This registers the `variform` component in the `Vue` instance and makes it usable in every component of the project.

After that, a simple form template can be defined in a seperate `form.js` file. For instance:
```js
export default {
    type: 'group',
    content: {
        label: 'form',
        items: [
            {
                type: 'input',
                content: {
                    label: 'input1',
                    value: '',
                },
            },
            {
                type: 'input',
                content: {
                    label: 'input2',
                    value: '',
                },
            },
        ],
    },
}
```
In the `App.vue` component, the form can be rendered as follows:
```vue
<template>
  <div id="app">
    <variform :form-element-data="form"></variform>
  </div>
</template>

<script>
import form from './form'

export default {
  name: 'App',
  data: () => ({
    form
  }),
}
</script>
```

## Project setup for developing the variform library
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

## Contributing
There is still a lot of work to do. Feel free to contact me for suggestions or make a pull request to propose improvements to the library.