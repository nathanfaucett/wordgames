/// <reference types="@sveltejs/kit" />

import type PeerJS from 'peerjs';

declare global {
	interface ImportMetaEnv {
		VITE_PEER_HOST: string;
		VITE_PEER_PORT: string;
	}

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
		Peer: typeof PeerJS;
		QRious: typeof QRious;
	}
}
