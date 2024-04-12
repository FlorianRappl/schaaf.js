// Our framework:
export function renderDom(Component, container) {
  const state = {
    values: [],
    startIndex: 0,
    nodes: [],
  };

  const ß = (defaultValue) => {
    const currentIndex = state.startIndex++;
    const { values } = state;

    if (currentIndex === values.length) {
      let currentValue = defaultValue;
      console.log(
        `Setting default value "${defaultValue}" at index ${currentIndex}.`
      );

      const instance = (newValue) => {
        if (newValue !== undefined) {
          currentValue = newValue;
          console.log(
            `Setting new value "${newValue}" at index ${currentIndex}.`
          );
          setTimeout(render, 0);
        }

        return currentValue;
      };
      values.push(instance);
      return instance;
    }

    return values[currentIndex];
  };

  ß.fragment = {};

  ß.x = (type, props, ...children) => {
    console.log("JSX Factory:", type, props, children);

    if (type === ß.fragment) {
      return children;
    }

    return {
      type,
      props,
      children,
    };
  };

  function render() {
    state.startIndex = 0;
    const oldNodes = state.nodes;
    const newNodes = Component(ß);
    state.nodes = newNodes;
    renderNodes(oldNodes, newNodes, container);
  }

  render();
}

function renderNodes(oldNodes, nodes, container) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const previous = oldNodes[i];

    if (previous === undefined) {
      switch (typeof node) {
        case "string":
        case "number":
          const tn = document.createTextNode(node.toString());
          fragment.appendChild(tn);
          break;
        case "boolean":
          break;
        case "object":
          const el = document.createElement(node.type);
          Object.entries(node.props || {}).forEach(([name, value]) => {
            el[name] = value;
          });

          if (Array.isArray(node.children)) {
            renderNodes([], node.children, el);
          }

          fragment.appendChild(el);
          break;
        default:
          console.error("Autsch! Fräulein, daß mögen wir so nicht!", node);
          break;
      }
    } else {
      switch (typeof node) {
        case "string":
        case "number":
          if (node !== previous) {
            container.childNodes[i].data = node.toString();
          }
          break;
        case "object":
          const el = container.childNodes[i];

          Object.entries(node.props || {}).forEach(([name, value]) => {
            if (previous.props[name] !== value) {
              el[name] = value;
            }
          });

          if (Array.isArray(node.children)) {
            renderNodes(previous.children, node.children, el);
          }
          break;
      }
    }
  }

  container.appendChild(fragment);
}
