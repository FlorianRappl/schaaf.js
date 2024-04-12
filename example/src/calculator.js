import { renderDom } from "ß";

function Calculator(ß) {
  const a = ß(1);
  const b = ß(1);
  return (
    <>
      <input
        placeholder="First!"
        value={a()}
        onkeyup={(ev) => {
          a(+ev.target.value);
        }}
      />
      {" + "}
      <input
        placeholder="Second!"
        value={b()}
        onkeyup={(ev) => {
          b(+ev.target.value);
        }}
      />
      {" = "}
      <output>{a() + b()}</output>
    </>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderDom(Calculator, document.body);
});
