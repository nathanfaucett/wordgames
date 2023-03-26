/// <reference types="@sveltejs/kit" />

import type SimplePeer from 'simple-peer';
import type io from 'socket.io-client';

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}
declare global {
	interface IQRiousOptions {
		background?: string;
		backgroundAlpha?: number;
		element: HTMLElement;
		foreground?: string;
		foregroundAlpha?: number;
		level?: 'L' | 'M' | 'Q' | 'H';
		mime?: string;
		padding?: number;
		size?: number;
		value?: string;
	}

	class QRious {
		background: string;
		backgroundAlpha: number;
		foreground: string;
		foregroundAlpha: number;
		level: 'L' | 'M' | 'Q' | 'H';
		mime: string;
		padding: number;
		size: number;
		value: string;

		constructor(options: IQRiousOptions);
	}

	interface Window {
		io: typeof io;
		SimplePeer: SimplePeer.SimplePeer;
		QRious: typeof QRious;
	}
}
