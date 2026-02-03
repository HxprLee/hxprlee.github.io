
import root from '../root.svelte';
import { set_building, set_prerendering } from '__sveltekit/environment';
import { set_assets } from '$app/paths/internal/server';
import { set_manifest, set_read_implementation } from '__sveltekit/server';
import { set_private_env, set_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	async: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	csrf_trusted_origins: [],
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hash_routing: false,
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	service_worker_options: undefined,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"utf-8\" />\n\t<link rel=\"icon\" href=\"/svgs/logo.svg\" />\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t<title>Profile: HxprLee</title>\n\n\t<!-- Tailwind CSS CDN -->\n\t<script src=\"https://cdn.tailwindcss.com?plugins=forms,typography\"></script>\n\t<!-- Fonts -->\n\t<link href=\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap\"\n\t\trel=\"stylesheet\" />\n\t<link href=\"https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.1.0/css/all.min.css\" rel=\"stylesheet\" />\n\n\t<!-- Tailwind Configuration Script -->\n\t<script>\n\t\ttailwind.config = {\n\t\t\tdarkMode: \"class\",\n\t\t\ttheme: {\n\t\t\t\textend: {\n\t\t\t\t\tcolors: {\n\t\t\t\t\t\tprimary: \"#FFEFAF\",\n\t\t\t\t\t\t\"background-light\": \"#1a1a1a\",\n\t\t\t\t\t\t\"background-dark\": \"#11171C\",\n\t\t\t\t\t\t\"glass-dark\": \"rgba(18, 20, 24, 0.75)\",\n\t\t\t\t\t\t\"glass-border\": \"rgba(255, 255, 255, 0.08)\",\n\t\t\t\t\t\t\"tag-bg\": \"#191F24\",\n\t\t\t\t\t},\n\t\t\t\t\tfontFamily: {\n\t\t\t\t\t\tdisplay: [\"Iosevka\"],\n\t\t\t\t\t},\n\t\t\t\t\tborderRadius: {\n\t\t\t\t\t\tDEFAULT: \"8px\",\n\t\t\t\t\t},\n\t\t\t\t\tbackdropBlur: {\n\t\t\t\t\t\txs: '8px',\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t},\n\t\t};\n\t</script>\n\n\t" + head + "\n</head>\n\n<body data-sveltekit-preload-data=\"hover\"\n\tclass=\"bg-background-light dark:bg-background-dark font-display text-primary antialiased min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-black\">\n\t<div style=\"display: contents\">" + body + "</div>\n</body>\n\n</html>",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family:\n\t\t\t\t\tsystem-ui,\n\t\t\t\t\t-apple-system,\n\t\t\t\t\tBlinkMacSystemFont,\n\t\t\t\t\t'Segoe UI',\n\t\t\t\t\tRoboto,\n\t\t\t\t\tOxygen,\n\t\t\t\t\tUbuntu,\n\t\t\t\t\tCantarell,\n\t\t\t\t\t'Open Sans',\n\t\t\t\t\t'Helvetica Neue',\n\t\t\t\t\tsans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "xc9533"
};

export async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let handleValidationError;
	let init;
	

	let reroute;
	let transport;
	

	return {
		handle,
		handleFetch,
		handleError,
		handleValidationError,
		init,
		reroute,
		transport
	};
}

export { set_assets, set_building, set_manifest, set_prerendering, set_private_env, set_public_env, set_read_implementation };
