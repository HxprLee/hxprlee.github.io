

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.y6PL5wQ0.js","_app/immutable/chunks/DfLWIpsK.js","_app/immutable/chunks/LKjyfxEb.js","_app/immutable/chunks/ClN2DmGw.js"];
export const stylesheets = [];
export const fonts = [];
