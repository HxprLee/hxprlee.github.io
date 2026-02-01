

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CBC17zKo.js","_app/immutable/chunks/DfLWIpsK.js","_app/immutable/chunks/LKjyfxEb.js"];
export const stylesheets = [];
export const fonts = [];
