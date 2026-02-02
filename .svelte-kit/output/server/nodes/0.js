import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.BY33GNvl.js","_app/immutable/chunks/BxHaezE8.js","_app/immutable/chunks/dnHAOuFN.js"];
export const stylesheets = ["_app/immutable/assets/0.1K7Ow4he.css"];
export const fonts = [];
