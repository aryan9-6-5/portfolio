/**
 * Realistic Mechanical Ticket Punch Audio Synthesizer
 * Uses Web Audio API to generate a crisp, satisfying dual-metal "KA-CHUNK" snap
 * with anvil resonance, zero external audio assets required.
 */
let audioCtx = null

function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

export function playPunchSound() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    // 1. Initial High-Frequency Snap (Cutting pin piercing cardstock)
    const snapBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate)
    const snapData = snapBuffer.getChannelData(0)
    for (let i = 0; i < snapData.length; i++) {
      snapData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.008))
    }
    const snapSource = ctx.createBufferSource()
    snapSource.buffer = snapBuffer

    const snapFilter = ctx.createBiquadFilter()
    snapFilter.type = 'bandpass'
    snapFilter.frequency.setValueAtTime(3200, now)
    snapFilter.Q.setValueAtTime(3.5, now)

    const snapGain = ctx.createGain()
    snapGain.gain.setValueAtTime(0.7, now)
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.038)

    snapSource.connect(snapFilter)
    snapFilter.connect(snapGain)
    snapGain.connect(ctx.destination)
    snapSource.start(now)

    // 2. Heavy Steel Jaws Clamping (Low metallic thud)
    const thudOsc = ctx.createOscillator()
    thudOsc.type = 'triangle'
    thudOsc.frequency.setValueAtTime(180, now)
    thudOsc.frequency.exponentialRampToValueAtTime(45, now + 0.07)

    const thudGain = ctx.createGain()
    thudGain.gain.setValueAtTime(0.65, now)
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.065)

    thudOsc.connect(thudGain)
    thudGain.connect(ctx.destination)
    thudOsc.start(now)
    thudOsc.stop(now + 0.07)

    // 3. Steel Anvil Body Resonant Ring (Dual harmonic chime)
    const ringOsc1 = ctx.createOscillator()
    ringOsc1.type = 'sine'
    ringOsc1.frequency.setValueAtTime(940, now + 0.008)

    const ringOsc2 = ctx.createOscillator()
    ringOsc2.type = 'sine'
    ringOsc2.frequency.setValueAtTime(1420, now + 0.008)

    const ringGain = ctx.createGain()
    ringGain.gain.setValueAtTime(0.28, now + 0.008)
    ringGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16)

    ringOsc1.connect(ringGain)
    ringOsc2.connect(ringGain)
    ringGain.connect(ctx.destination)

    ringOsc1.start(now + 0.008)
    ringOsc2.start(now + 0.008)
    ringOsc1.stop(now + 0.16)
    ringOsc2.stop(now + 0.16)
  } catch {
    // Graceful fallback if audio context blocked by browser policy
  }

  // Trigger tactile mobile vibration if supported
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([28, 35, 20])
    }
  } catch {
    // ignore
  }
}
