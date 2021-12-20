# vue-variform

Vue.js component to create forms with various features. 

### Key features
- Form templates containing the input fields are defined using a JSON object. This is convenient for storing different form templates in a database and for rendering forms dynamically.
- It is possible to define a data mapping schema to capture only relevant information of the user input and not the entire JSON object defining the form.
- Captured data from a form can be used to populate the same or a different form at a later point in time. This feature makes it easy for users to edit the initial data afterwards.
- Input elements and groups can be configured to be dynamically extendable by users to enable the input of lists of the same type of input.
- The library offers the possibility to create custom input fields and groups of input fields for completely individual forms. 
- In terms of design, the variform library uses [simple-grid](https://simplegrid.io/) for positioning the form elements and a very short and simple style.css file that can be easily adapted to fit the design of every application. 

See [here](https://lwalisch.github.io) for a demo.
Documentation and example project will follow soon...

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
