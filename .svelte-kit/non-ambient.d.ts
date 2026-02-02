
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
		Asset(): "/.nojekyll" | "/audios/bg-audio.mp3" | "/fonts/IosevkaNF-Bold.woff" | "/fonts/IosevkaNF-Bold.woff2" | "/fonts/IosevkaNF-BoldItalic.woff" | "/fonts/IosevkaNF-BoldItalic.woff2" | "/fonts/IosevkaNF-ExtraBold.woff" | "/fonts/IosevkaNF-ExtraBold.woff2" | "/fonts/IosevkaNF-ExtraBoldItalic.woff" | "/fonts/IosevkaNF-ExtraBoldItalic.woff2" | "/fonts/IosevkaNF-ExtraLight.woff" | "/fonts/IosevkaNF-ExtraLight.woff2" | "/fonts/IosevkaNF-ExtraLightItalic.woff" | "/fonts/IosevkaNF-ExtraLightItalic.woff2" | "/fonts/IosevkaNF-Heavy.woff" | "/fonts/IosevkaNF-Heavy.woff2" | "/fonts/IosevkaNF-HeavyItalic.woff" | "/fonts/IosevkaNF-HeavyItalic.woff2" | "/fonts/IosevkaNF-Italic.woff" | "/fonts/IosevkaNF-Italic.woff2" | "/fonts/IosevkaNF-Light.woff" | "/fonts/IosevkaNF-Light.woff2" | "/fonts/IosevkaNF-LightItalic.woff" | "/fonts/IosevkaNF-LightItalic.woff2" | "/fonts/IosevkaNF-Medium.woff" | "/fonts/IosevkaNF-Medium.woff2" | "/fonts/IosevkaNF-MediumItalic.woff" | "/fonts/IosevkaNF-MediumItalic.woff2" | "/fonts/IosevkaNF-SemiBold.woff" | "/fonts/IosevkaNF-SemiBold.woff2" | "/fonts/IosevkaNF-SemiBoldItalic.woff" | "/fonts/IosevkaNF-SemiBoldItalic.woff2" | "/fonts/IosevkaNF.woff" | "/fonts/IosevkaNF.woff2" | "/imgs/artwork.png" | "/imgs/banner.png" | "/imgs/pfp-icon.png" | "/svgs/0.svg" | "/svgs/1.svg" | "/svgs/2.svg" | "/svgs/3.svg" | string & {};
	}
}