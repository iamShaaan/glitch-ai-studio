// Global Video & Audio Synchronization Manager
// Rule: If one video is unmuted and playing, all other videos on the website must be muted.
// Any other playing video with sound is stopped/muted so only one audio source can ever play at a time.

const AUDIO_CLAIM_EVENT = "glitch:video-audio-claim";

export interface AudioClaimDetail {
  activeSlotId?: number;
  activeElement?: HTMLVideoElement | null;
}

/**
 * Call when a video element becomes unmuted or starts playing with audio.
 * Mutes all other <video> elements on the page and dispatches an event
 * for React state synchronization.
 */
export function claimAudioFocus(slotId?: number, videoElement?: HTMLVideoElement | null) {
  if (typeof window === "undefined") return;

  // 1. Dispatch custom event for React components (to update UI states like button labels)
  window.dispatchEvent(
    new CustomEvent<AudioClaimDetail>(AUDIO_CLAIM_EVENT, {
      detail: { activeSlotId: slotId, activeElement: videoElement },
    })
  );

  // 2. Directly enforce DOM invariant on all <video> elements
  try {
    const allVideos = document.querySelectorAll<HTMLVideoElement>("video");
    allVideos.forEach((v) => {
      if (v !== videoElement) {
        // Guarantee silence
        v.muted = true;
        // If it was playing with sound, pause it so only the active video plays with audio
        if (!v.paused && v.volume > 0) {
          v.pause();
        }
      }
    });
  } catch {
    // Ignore DOM query errors in non-browser envs
  }
}

/**
 * React hook / listener helper to subscribe to audio claim events.
 */
export function subscribeToAudioClaims(
  onClaim: (detail: AudioClaimDetail) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<AudioClaimDetail>;
    if (customEvent.detail) {
      onClaim(customEvent.detail);
    }
  };

  window.addEventListener(AUDIO_CLAIM_EVENT, handler);
  return () => {
    window.removeEventListener(AUDIO_CLAIM_EVENT, handler);
  };
}

/**
 * Initialize global document-level listener as a safety net for any native
 * play / volumechange events on any video elements.
 */
if (typeof window !== "undefined") {
  document.addEventListener(
    "volumechange",
    (e) => {
      const target = e.target as HTMLVideoElement;
      if (target && target.tagName === "VIDEO" && !target.muted && target.volume > 0) {
        const allVideos = document.querySelectorAll<HTMLVideoElement>("video");
        allVideos.forEach((v) => {
          if (v !== target) {
            v.muted = true;
          }
        });
      }
    },
    true
  );

  document.addEventListener(
    "play",
    (e) => {
      const target = e.target as HTMLVideoElement;
      if (target && target.tagName === "VIDEO" && !target.muted && target.volume > 0) {
        const allVideos = document.querySelectorAll<HTMLVideoElement>("video");
        allVideos.forEach((v) => {
          if (v !== target) {
            v.muted = true;
            if (!v.paused) {
              v.pause();
            }
          }
        });
      }
    },
    true
  );
}
