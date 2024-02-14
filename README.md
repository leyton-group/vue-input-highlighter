<p align="center"><img src="https://github.com/GAliNor/assets/blob/main/vue-input-highlighter/banner.png" alt="vue input highlighter banner"></p>

# Vue Input Highlighter

Component that allows content highlighting within an input field based on specified regular expressions (regexes).

It enhances user experience by providing visual feedback about specified patterns recognized and improves the interaction the user have with the input.

<p align="center"><img src="https://github.com/GAliNor/assets/blob/main/vue-input-highlighter/animation.gif" alt="vue input highlighter animation"></p>


# Table of contents

- [Installation](#installation)
  

- [Imports](#imports)


- [Usage example](#usage-example)


- [How it works](#how-it-works)  


- [Use Cases](#use-cases)


- [Props](#props)


- [Events](#events)
  

- [Contribution](#contribution)


- [Acknowledgments](#acknowledgments)


# Installation

Using npm :

    $ npm i @leyton-techlab/vue-input-highlighter


Using yarn :

    $ yarn add @leyton-techlab/vue-input-highlighter


# Imports

Register the component globally :

#### inside main.(js/ts)
````typescript

    import InputHighlighter from '@leyton-techlab/vue-input-highlighter';
    import '@leyton-techlab/vue-input-highlighter/style.css';

    const app = createApp(App)

    app.component("InputHighlighter", InputHighlighter);

    app.mount('#app')

````
Import within the scope of a component

#### Script Setup
````typescript
  <script setup>

    import InputHighlighter from '@leyton-techlab/vue-input-highlighter';
    import '@leyton-techlab/vue-input-highlighter/style.css';

    import { ref } from 'vue';

    const inputValue = ref('');
  
  </script>

  <template>

      <input-highlighter
          v-model="inputValue"
      />
  
  </template>
````

#### Option Api
````typescript
  <script>
      import InputHighlighter from 'vue-input-highlighter';
      import 'vue-input-highlighter/style.css';

      export default {
          data() {
              return {
                  inputValue: ''
          },
          components: {
              InputHighlighter
          }
      }
  </script>

  <template>

      <input-highlighter
          v-model="inputValue"
      />

  </template>

````
# Usage example

Please refer to the following link content as usage example : [codesandbox](https://codesandbox.io/s/admiring-kilby-4h9swj?file=/src/App.vue)

<p align="center"><img src="https://github.com/GAliNor/assets/blob/main/vue-input-highlighter/demo.gif" alt="vue input highlighter demo"></p>


# How it works

The component is based on a 'content editable' div that replicates the behavior of an input tag.

As the user inputs content, the component evaluates the div's text and analyzes it using regular expressions (regex).

Any fragment that matches the regex is encapsulated within an HTML tag, with the default being \<strong\> (or as specified) for which the relevant styles are then applied.

# Use Cases

Use cases example :

- Highlight search operators (example : and, or, not, ") inside a search bar

- Highlight id like entries (ex: company number, salesforce id, random code)

- Highlight business specific keyword

    - Protocols : http/https

    - Language syntax : select, from, where

    - Auth methods : Basic, Bearer

# Props

List of component props :

| Props       | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| modelValue  | allow v-model behavior for the component                                    |
| rules       | array of rules as composed object defined in more details in the next table |
| placeholder | string value displayed when input is empty as a placeholder for explanation |


List of component "rules" props sub-elements :

| Sub-element | Description                                                                     |
|-------------|---------------------------------------------------------------------------------|
| regex       | pattern to be matched                                                           |
| style       | string value to be mapped inside the style attribute of the matched element tag |
| class       | string value to be mapped inside the class attribute of the matched element tag |
| tag         | tag used when wrapping the matched element                                      |

In the case of using `scoped` in `style`
```vue
<style lang='scss' scoped>
...
</style>
```
 the `class` rule will not work, instead use the `style` rule :
 ```vue
<script>
export default {
  data() {
    return {
      rules: [
        {
          regex: /(and|or|not|\(|\))/gim,
          style: `
            color: #87CEEB;
            background: none;
            font-weight: 700;
            font-family: roboto, sans-serif;
            box-sizing: border-box;
          `,
          tag: "span",
        },
      ],
    };
  },
}
</script>
```

# Events

List of component custom events

| Events      | Description                                                                               |
|------------|-------------------------------------------------------------------------------------------|
| highlight  | fires whenever one or multiple highlights are matched. return list of newly matched text. |
| highlights | fires at each input. return list of all matched text by the input.                        |

# Contribution

Every improvement of the package is welcome, just fork the project make the necessary changes and create a pull request.

If you want to contact me (@GAliNor) here is a [link](https://www.linkedin.com/in/ali-guedda/) to my linkedin profile

# Acknowledgments

Many thanks to :

 - [@karimerrahli](https://github.com/karimerrahli)
 - [@afaddoul](https://github.com/afaddoul)
 - [@AdnaneAm](https://github.com/adnaneam)
 - [@akiyamaSM](https://github.com/akiyamaSM)

for the reviews and advice
