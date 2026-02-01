export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["audios/bg-audio.mp3","fonts/IosevkaNF-Bold.woff","fonts/IosevkaNF-Bold.woff2","fonts/IosevkaNF-BoldItalic.woff","fonts/IosevkaNF-BoldItalic.woff2","fonts/IosevkaNF-ExtraBold.woff","fonts/IosevkaNF-ExtraBold.woff2","fonts/IosevkaNF-ExtraBoldItalic.woff","fonts/IosevkaNF-ExtraBoldItalic.woff2","fonts/IosevkaNF-ExtraLight.woff","fonts/IosevkaNF-ExtraLight.woff2","fonts/IosevkaNF-ExtraLightItalic.woff","fonts/IosevkaNF-ExtraLightItalic.woff2","fonts/IosevkaNF-Heavy.woff","fonts/IosevkaNF-Heavy.woff2","fonts/IosevkaNF-HeavyItalic.woff","fonts/IosevkaNF-HeavyItalic.woff2","fonts/IosevkaNF-Italic.woff","fonts/IosevkaNF-Italic.woff2","fonts/IosevkaNF-Light.woff","fonts/IosevkaNF-Light.woff2","fonts/IosevkaNF-LightItalic.woff","fonts/IosevkaNF-LightItalic.woff2","fonts/IosevkaNF-Medium.woff","fonts/IosevkaNF-Medium.woff2","fonts/IosevkaNF-MediumItalic.woff","fonts/IosevkaNF-MediumItalic.woff2","fonts/IosevkaNF-SemiBold.woff","fonts/IosevkaNF-SemiBold.woff2","fonts/IosevkaNF-SemiBoldItalic.woff","fonts/IosevkaNF-SemiBoldItalic.woff2","fonts/IosevkaNF.woff","fonts/IosevkaNF.woff2","imgs/pfp-icon.png"]),
	mimeTypes: {".mp3":"audio/mpeg",".woff":"font/woff",".woff2":"font/woff2",".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.Cxgd44qP.js",app:"_app/immutable/entry/app.DC4JyG1-.js",imports:["_app/immutable/entry/start.Cxgd44qP.js","_app/immutable/chunks/ClN2DmGw.js","_app/immutable/chunks/DfLWIpsK.js","_app/immutable/entry/app.DC4JyG1-.js","_app/immutable/chunks/DfLWIpsK.js","_app/immutable/chunks/LKjyfxEb.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
