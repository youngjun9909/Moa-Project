// DOM fixtures required by modal and chart libraries during the opt-in visual audit.
const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);
URL.revokeObjectURL = jest.fn();
if (!window.ResizeObserver) {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
}
export {};
