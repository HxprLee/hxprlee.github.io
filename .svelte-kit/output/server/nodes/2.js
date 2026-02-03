

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.jcgFCQfD.js","_app/immutable/chunks/BxHaezE8.js","_app/immutable/chunks/dnHAOuFN.js"];
export const stylesheets = ["_app/immutable/assets/2.DHiWP8f-.css"];
export const fonts = [];
