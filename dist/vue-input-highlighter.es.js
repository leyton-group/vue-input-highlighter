import { toRefs as E, ref as p, onMounted as R, openBlock as $, createElementBlock as b, unref as T } from "vue";
const V = ["placeholder"], f = "strong", w = {
  __name: "input-highlighter",
  props: {
    modelValue: String,
    rules: {
      type: Array,
      default: []
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue", "highlight", "highlights"],
  setup(m, { emit: r }) {
    const _ = m, { modelValue: v, rules: x, placeholder: y } = E(_), s = p(""), c = p(v.value), g = [];
    let i = [];
    for (const e of x.value)
      e instanceof RegExp ? g.push({
        regex: e,
        class: "",
        style: "",
        tag: f
      }) : e instanceof Object && g.push({
        regex: e.regex,
        class: e.class ? e.class : "",
        style: e.style ? e.style : "",
        tag: e.tag ? e.tag : f
      });
    R(() => {
      a();
    });
    const H = (e) => e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"), u = (e, t, o, l) => {
      if (l.done)
        return l;
      let n = null;
      if (e.childNodes.length == 0)
        l.pos += e.textContent.length;
      else
        for (let h = 0; h < e.childNodes.length && !l.done; h++) {
          if (n = e.childNodes[h], n === t)
            return l.pos += o, l.done = !0, l;
          u(n, t, o, l);
        }
      return l;
    }, d = (e, t, o) => {
      if (o.done)
        return t;
      if (e.childNodes.length == 0)
        e.textContent.length >= o.pos ? (t.setStart(e, o.pos), o.done = !0) : o.pos = o.pos - e.textContent.length;
      else
        for (let l = 0; l < e.childNodes.length && !o.done; l++) {
          let n = e.childNodes[l];
          d(n, t, o);
        }
      return t;
    }, N = (e) => {
      for (const t of g)
        e = e.replaceAll(
          t.regex,
          `<${t.tag} class="${t.class}" style="${t.style}">$1</${t.tag}>`
        );
      return e;
    }, a = () => {
      const e = H(c.value), t = N(e);
      s.value.innerHTML = t;
    }, S = (e) => {
      const t = Array.from(e);
      return i.forEach((o) => {
        const l = t.indexOf(o);
        l > -1 && t.splice(l, 1);
      }), t;
    }, C = () => {
      const e = Array.from(s.value.children).map((t) => t.innerHTML);
      e.length > i.length && r("highlight", S(e)), i = e, r("highlights", i);
    }, A = () => {
      c.value = s.value.textContent;
      const e = window.getSelection(), t = e.focusNode, o = e.focusOffset, l = u(s.value, t, o, { pos: 0, done: !1 });
      o === 0 && (l.pos += 0.5), a(), e.removeAllRanges();
      const n = d(s.value, document.createRange(), {
        pos: l.pos,
        done: !1
      });
      n.collapse(!0), e.addRange(n), C(), r("update:modelValue", c.value);
    };
    return (e, t) => ($(), b("div", {
      contenteditable: "true",
      ref_key: "editableElmt",
      ref: s,
      class: "input-highlighter",
      placeholder: T(y),
      onInput: A
    }, null, 40, V));
  }
};
export {
  w as default
};
