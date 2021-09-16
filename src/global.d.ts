/// <reference types="@sveltejs/kit" />

import type PeerJS from 'peerjs';

declare global {
	interface ImportMetaEnv {
		VITE_PEER_HOST: string;
		VITE_PEER_PORT: string;
	}

	interface Window {
		Peer: typeof PeerJS;
	}
}
