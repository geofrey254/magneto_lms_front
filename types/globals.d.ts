// globals.d.ts or any TypeScript declaration file
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "langflow-chat": HTMLElement;
    }
  }
}
