export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","audios/bg-audio.mp3","bgs/selena_pianissimo_scene.mp4","imgs/artwork.webp","imgs/banner.webp","imgs/pfp-icon.webp","svgs/0.svg","svgs/1.svg","svgs/2.svg","svgs/3.svg"]),
	mimeTypes: {".mp3":"audio/mpeg",".mp4":"video/mp4",".webp":"image/webp",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.BysjE4j_.js",app:"_app/immutable/entry/app.DC81tE-8.js",imports:["_app/immutable/entry/start.BysjE4j_.js","_app/immutable/chunks/DgNllBfA.js","_app/immutable/chunks/BxHaezE8.js","_app/immutable/entry/app.DC81tE-8.js","_app/immutable/chunks/BxHaezE8.js","_app/immutable/chunks/dnHAOuFN.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
