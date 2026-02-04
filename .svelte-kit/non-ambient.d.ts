
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>
		};
		Pathname(): "/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.nojekyll" | "/audios/bg-audio.mp3" | "/bgs/bg-high-bitrate.mp4" | "/bgs/bg-low-bitrate.webm" | "/imgs/artwork.png" | "/imgs/artwork.webp" | "/imgs/banner.png" | "/imgs/banner.webp" | "/imgs/pfp-icon.png" | "/imgs/pfp-icon.webp" | "/svgs/0.svg" | "/svgs/1.svg" | "/svgs/2.svg" | "/svgs/3.svg" | "/svgs/logo.svg" | string & {};
	}
}