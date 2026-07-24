// src/types/global.d.ts
export {};

declare global {
  interface Window {
    Cal: {
      init: (config: { debug: boolean }) => void;
      ui: (config: any) => void;
      inline: (config: any) => void;
      popup: (config: any) => void;
      embed: (config: any) => void;
      setConfig: (config: any) => void;
    };
  }
}