

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.z52Dzl8d.js","_app/immutable/chunks/DMqqpcII.js","_app/immutable/chunks/CQbsOhfa.js"];
export const stylesheets = [];
export const fonts = [];
