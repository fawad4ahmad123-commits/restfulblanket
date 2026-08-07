export {};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];

    gtag: (
      command: string,
      target: string,
      config?: Record<string, unknown>,
    ) => void;
  }
}
