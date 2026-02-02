

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.B7TdWrcs.js","_app/immutable/chunks/BxHaezE8.js","_app/immutable/chunks/dnHAOuFN.js","_app/immutable/chunks/xf0zSHxw.js"];
export const stylesheets = [];
export const fonts = [];
