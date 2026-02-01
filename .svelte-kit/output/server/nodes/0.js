

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CuRlFxT0.js","_app/immutable/chunks/DfLWIpsK.js","_app/immutable/chunks/LKjyfxEb.js"];
export const stylesheets = ["_app/immutable/assets/0.uxSIBIoG.css"];
export const fonts = [];
