<template>
    <div
        contenteditable="true"
        ref="editableElmt"
        class="input-highlighter"
        :placeholder="placeholder"
        @input="handleInputEvent"
    >
    </div>
</template>

<script setup>
// imports
import { ref, toRefs, onMounted } from 'vue';


// props
const props = defineProps({
    modelValue: String,
    rules: {
        type: Array,
        default: []
    },
    placeholder: {
        type: String,
        default: ''
    }
});
const { modelValue, rules, placeholder } = toRefs(props);


// Variables
const editableElmt = ref('');
const rawText = ref(modelValue.value);
const highlightRules = [];
const defaultHighlightTag = 'strong';
let highlightsSnapshot = [];


// Emits
const emits = defineEmits(['update:modelValue', 'highlight', 'highlights']);


// Created
for (const elmt of rules.value) {
    if(elmt instanceof RegExp) {
        highlightRules.push({
            regex: elmt,
            class: '',
            style: '',
            tag: defaultHighlightTag
        });
    } else if(elmt instanceof Object) {
        highlightRules.push({
            regex: elmt.regex,
            class: elmt.class ? elmt.class : '',
            style: elmt.style ? elmt.style : '',
            tag: elmt.tag ? elmt.tag : defaultHighlightTag,
        });
    }
}


// LifeCycle hooks
onMounted(() => {
    setHtmlContent();
})


// Methods
const escapeHtmlString = (htmlStr) => {
   return htmlStr.replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#39;");
}
const getCursorPosition = (parent, node, offset, stat) => {
  if (stat.done) return stat;

  let currentNode = null;
  if (parent.childNodes.length == 0) {
    stat.pos += parent.textContent.length;
  } else {
    for (let i = 0; i < parent.childNodes.length && !stat.done; i++) {
      currentNode = parent.childNodes[i];
      if (currentNode === node) {
        stat.pos += offset;
        stat.done = true;
        return stat;
      } else getCursorPosition(currentNode, node, offset, stat);
    }
  }
  return stat;
}
const setCursorPosition = (parent, range, stat) => {
  if (stat.done) return range;

  if (parent.childNodes.length == 0) {
    if (parent.textContent.length >= stat.pos) {
      range.setStart(parent, stat.pos);
      stat.done = true;
    } else {
      stat.pos = stat.pos - parent.textContent.length;
    }
  } else {
    for (let i = 0; i < parent.childNodes.length && !stat.done; i++) {
      let currentNode = parent.childNodes[i];
      setCursorPosition(currentNode, range, stat);
    }
  }
  return range;
}
const highlightString = (string) => {
    for (const rule of highlightRules) {
        string = string.replaceAll(rule.regex,
            `<${rule.tag} class="${rule.class}" style="${rule.style}">$1</${rule.tag}>`)
    }
    return string;
}
const setHtmlContent = () => {
    const escapedHtmlString = escapeHtmlString(rawText.value);
    const highlightedString = highlightString(escapedHtmlString);
    editableElmt.value.innerHTML = highlightedString;
}
const getAddedHighlights = (currentHighlights) => {

  const currentHighlightsBis = Array.from(currentHighlights);
  highlightsSnapshot.forEach(item => {
      const index = currentHighlightsBis.indexOf(item);
      if (index > -1) {
        currentHighlightsBis.splice(index, 1);
      }
  });

  return currentHighlightsBis;

}
const numerateHighlights = () => {
  const currentHighlights = Array.from(editableElmt.value.children).map(item => item.innerHTML);

  if(currentHighlights.length > highlightsSnapshot.length) {
    emits('highlight', getAddedHighlights(currentHighlights));
  }
  
  highlightsSnapshot = currentHighlights;

  emits('highlights', highlightsSnapshot);
}


// Event handler
const handleInputEvent = () => {
    rawText.value = editableElmt.value.textContent;

    const selection = window.getSelection();
    const node = selection.focusNode;
    const offset = selection.focusOffset;
    const pos = getCursorPosition(editableElmt.value, node, offset, { pos: 0, done: false });
    if (offset === 0) pos.pos += 0.5;

    setHtmlContent();

    selection.removeAllRanges();
    const range = setCursorPosition(editableElmt.value, document.createRange(), {
        pos: pos.pos,
        done: false,
    });
    range.collapse(true);
    selection.addRange(range);

    numerateHighlights();

    emits('update:modelValue', rawText.value);
}
</script>

<style scoped>

.input-highlighter {
    width: 200px;
    padding: 3px 5px;
    border: 1px solid black;
    overflow-x: auto;
    white-space: nowrap;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.input-highlighter::-webkit-scrollbar {
    display: none;
}

.input-highlighter:focus {
    outline: 0px solid transparent;
}

.input-highlighter[placeholder]:empty:before {
    content: attr(placeholder);
    color: #000;
    opacity: 0.6;
}

</style>
