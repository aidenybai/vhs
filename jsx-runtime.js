let prev = {};
export const effect = (callback) => {
  prev = callback(prev);
};
export const insert = (el, value, ref) => {
  const ret = typeof value === 'function' ? value() : value;
  const insertNode = (el, value, ref) => {
    if (typeof ret === 'string') {
      el.textContent = value;
    } else {
      el.insertBefore(value, ref);
    }
  };
  if (Array.isArray(ret)) {
    ret.forEach((v) => insertNode(el, v, ref));
  } else {
    insertNode(el, ret, ref);
  }
};
export const createComponent = (Component, props) => Component(props);
export const template = (html) => {
  const el = document.createElement('template');
  el.innerHTML = html;
  return el.content.firstChild;
};
export const setAttribute = (el, name, value) => el.setAttribute(name, value);
export const delegateEvents = () => {};
export const className = (el, classString) => {
  el.className = classString;
};
