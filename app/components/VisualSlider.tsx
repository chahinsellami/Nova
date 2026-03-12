"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";

/* ════════════════════════════════════════════
   SHADER EFFECTS SLIDER
   Adapted for React / Next.js / NOVA
   ════════════════════════════════════════════ */

/* ── Slides data ─────────────────────────────── */
const SLIDES = [
  {
    title: "Cathedral Shadows",
    media: "https://images.pexels.com/photos/458497/pexels-photo-458497.jpeg",
  },
  {
    title: "Dark Passage",
    media:
      "https://images.pexels.com/photos/31510266/pexels-photo-31510266.jpeg",
  },
  {
    title: "Eternal Night",
    media:
      "https://images.pexels.com/photos/11771935/pexels-photo-11771935.jpeg",
  },
  {
    title: "Iron & Stone",
    media: "https://images.pexels.com/photos/3828195/pexels-photo-3828195.jpeg",
  },
  {
    title: "Obsidian Light",
    media:
      "https://images.pexels.com/photos/30936146/pexels-photo-30936146.jpeg",
  },
  {
    title: "Abyssal Throne",
    media: "https://images.pexels.com/photos/7342418/pexels-photo-7342418.jpeg",
  },
];

/* ── Settings ────────────────────────────────── */
const CONFIG = {
  transitionDuration: 1,
  autoSlideSpeed: 3000,
  currentEffect: "glass",
  // Global
  globalIntensity: 1.0,
  speedMultiplier: 1.0,
  distortionStrength: 1.0,
  colorEnhancement: 1.0,
  // Glass
  glassRefractionStrength: 1.0,
  glassChromaticAberration: 1.0,
  glassBubbleClarity: 1.0,
  glassEdgeGlow: 1.0,
  glassLiquidFlow: 1.0,
  // Frost
  frostIntensity: 1.5,
  frostCrystalSize: 1.0,
  frostIceCoverage: 1.0,
  frostTemperature: 1.0,
  frostTexture: 1.0,
  // Ripple
  rippleFrequency: 25.0,
  rippleAmplitude: 0.08,
  rippleWaveSpeed: 1.0,
  rippleRippleCount: 1.0,
  rippleDecay: 1.0,
  // Plasma
  plasmaIntensity: 1.2,
  plasmaSpeed: 0.8,
  plasmaEnergyIntensity: 0.4,
  plasmaContrastBoost: 0.3,
  plasmaTurbulence: 1.0,
  // Timeshift
  timeshiftDistortion: 1.6,
  timeshiftBlur: 1.5,
  timeshiftFlow: 1.4,
  timeshiftChromatic: 1.5,
  timeshiftTurbulence: 1.4,
};

const EFFECTS = ["glass", "frost", "ripple", "plasma", "timeshift"] as const;

const getEffectIndex = (name: string) => {
  const map: Record<string, number> = {
    glass: 0,
    frost: 1,
    ripple: 2,
    plasma: 3,
    timeshift: 4,
  };
  return map[name] ?? 0;
};

/* ── Vertex shader ───────────────────────────── */
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

/* ── Fragment shader ─────────────────────────── */
const fragmentShader = `
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uTexture1Size;
uniform vec2 uTexture2Size;
uniform int uEffectType;

uniform float uGlobalIntensity;
uniform float uSpeedMultiplier;
uniform float uDistortionStrength;
uniform float uColorEnhancement;

uniform float uGlassRefractionStrength;
uniform float uGlassChromaticAberration;
uniform float uGlassBubbleClarity;
uniform float uGlassEdgeGlow;
uniform float uGlassLiquidFlow;

uniform float uFrostIntensity;
uniform float uFrostCrystalSize;
uniform float uFrostIceCoverage;
uniform float uFrostTemperature;
uniform float uFrostTexture;

uniform float uRippleFrequency;
uniform float uRippleAmplitude;
uniform float uRippleWaveSpeed;
uniform float uRippleRippleCount;
uniform float uRippleDecay;

uniform float uPlasmaIntensity;
uniform float uPlasmaSpeed;
uniform float uPlasmaEnergyIntensity;
uniform float uPlasmaContrastBoost;
uniform float uPlasmaTurbulence;

uniform float uTimeshiftDistortion;
uniform float uTimeshiftBlur;
uniform float uTimeshiftFlow;
uniform float uTimeshiftChromatic;
uniform float uTimeshiftTurbulence;

varying vec2 vUv;

vec2 getCoverUV(vec2 uv, vec2 textureSize) {
  vec2 s = uResolution / textureSize;
  float scale = max(s.x, s.y);
  vec2 scaledSize = textureSize * scale;
  vec2 offset = (uResolution - scaledSize) * 0.5;
  return (uv * uResolution - offset) / scaledSize;
}

float noise(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float smoothNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(noise(i), noise(i + vec2(1.0, 0.0)), f.x),
    mix(noise(i + vec2(0.0, 1.0)), noise(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float rand(vec2 uv) {
  float a = dot(uv, vec2(92., 80.));
  float b = dot(uv, vec2(41., 62.));
  float x = sin(a) + cos(b) * 51.;
  return fract(x);
}

float easeInOutSine(float t) {
  return -(cos(3.14159265 * t) - 1.0) / 2.0;
}

// ── Glass ──
vec4 glassEffect(vec2 uv, float progress) {
  float glassStrength = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity;
  float chromaticAberration = 0.02 * uGlassChromaticAberration * uGlobalIntensity;
  float waveDistortion = 0.025 * uDistortionStrength;
  float clearCenterSize = 0.3 * uGlassBubbleClarity;
  float surfaceRipples = 0.004 * uDistortionStrength;
  float liquidFlow = 0.015 * uGlassLiquidFlow * uSpeedMultiplier;
  float rimLightWidth = 0.05;
  float glassEdgeWidth = 0.025;

  float brightnessPhase = smoothstep(0.8, 1.0, progress);
  float rimLightIntensity = 0.08 * (1.0 - brightnessPhase) * uGlassEdgeGlow * uGlobalIntensity;
  float glassEdgeOpacity = 0.06 * (1.0 - brightnessPhase) * uGlassEdgeGlow;

  vec2 center = vec2(0.5, 0.5);
  vec2 p = uv * uResolution;
  vec2 uv1 = getCoverUV(uv, uTexture1Size);
  vec2 uv2_base = getCoverUV(uv, uTexture2Size);

  float maxRadius = length(uResolution) * 0.85;
  float bubbleRadius = progress * maxRadius;
  vec2 sphereCenter = center * uResolution;

  float dist = length(p - sphereCenter);
  float normalizedDist = dist / max(bubbleRadius, 0.001);
  vec2 direction = (dist > 0.0) ? (p - sphereCenter) / dist : vec2(0.0);
  float inside = smoothstep(bubbleRadius + 3.0, bubbleRadius - 3.0, dist);

  float distanceFactor = smoothstep(clearCenterSize, 1.0, normalizedDist);
  float time = progress * 5.0 * uSpeedMultiplier;

  vec2 liquidSurface = vec2(
    smoothNoise(uv * 100.0 + time * 0.3),
    smoothNoise(uv * 100.0 + time * 0.2 + 50.0)
  ) - 0.5;
  liquidSurface *= surfaceRipples * distanceFactor;

  vec2 distortedUV = uv2_base;
  if (inside > 0.0) {
    float refractionOffset = glassStrength * pow(distanceFactor, 1.5);
    vec2 flowDirection = normalize(direction + vec2(sin(time), cos(time * 0.7)) * 0.3);
    distortedUV -= flowDirection * refractionOffset;
    float wave1 = sin(normalizedDist * 22.0 - time * 3.5);
    float wave2 = sin(normalizedDist * 35.0 + time * 2.8) * 0.7;
    float wave3 = sin(normalizedDist * 50.0 - time * 4.2) * 0.5;
    float combinedWave = (wave1 + wave2 + wave3) / 3.0;
    float waveOffset = combinedWave * waveDistortion * distanceFactor;
    distortedUV -= direction * waveOffset + liquidSurface;
    vec2 flowOffset = vec2(
      sin(time + normalizedDist * 10.0),
      cos(time * 0.8 + normalizedDist * 8.0)
    ) * liquidFlow * distanceFactor * inside;
    distortedUV += flowOffset;
  }

  vec4 newImg;
  if (inside > 0.0) {
    float aberrationOffset = chromaticAberration * pow(distanceFactor, 1.2);
    vec2 uv_r = distortedUV + direction * aberrationOffset * 1.2;
    vec2 uv_g = distortedUV + direction * aberrationOffset * 0.2;
    vec2 uv_b = distortedUV - direction * aberrationOffset * 0.8;
    float r = texture2D(uTexture2, uv_r).r;
    float g = texture2D(uTexture2, uv_g).g;
    float b = texture2D(uTexture2, uv_b).b;
    newImg = vec4(r, g, b, 1.0);
  } else {
    newImg = texture2D(uTexture2, uv2_base);
  }

  if (inside > 0.0 && rimLightIntensity > 0.0) {
    float rim = smoothstep(1.0 - rimLightWidth, 1.0, normalizedDist) *
                (1.0 - smoothstep(1.0, 1.01, normalizedDist));
    newImg.rgb += rim * rimLightIntensity;
    float edge = smoothstep(1.0 - glassEdgeWidth, 1.0, normalizedDist) *
                 (1.0 - smoothstep(1.0, 1.01, normalizedDist));
    newImg.rgb = mix(newImg.rgb, vec3(1.0), edge * glassEdgeOpacity);
  }

  newImg.rgb = mix(newImg.rgb, newImg.rgb * 1.2, (uColorEnhancement - 1.0) * 0.5);
  vec4 currentImg = texture2D(uTexture1, uv1);

  if (progress > 0.95) {
    vec4 pureNewImg = texture2D(uTexture2, uv2_base);
    float endTransition = (progress - 0.95) / 0.05;
    newImg = mix(newImg, pureNewImg, endTransition);
  }

  return mix(currentImg, newImg, inside);
}

// ── Frost ──
vec4 frostEffect(vec2 uv, float progress) {
  vec4 currentImg = texture2D(uTexture1, getCoverUV(uv, uTexture1Size));
  vec4 newImg = texture2D(uTexture2, getCoverUV(uv, uTexture2Size));

  float effectiveIntensity = uFrostIntensity * uGlobalIntensity;
  float crystalScale = 80.0 / uFrostCrystalSize;
  float iceScale = 40.0 / uFrostCrystalSize;

  float frost1 = smoothNoise(uv * crystalScale * uFrostTexture);
  float frost2 = smoothNoise(uv * iceScale + 50.0) * 0.7;
  float frost3 = smoothNoise(uv * (crystalScale * 2.0) + 100.0) * 0.3;
  float frost = (frost1 + frost2 + frost3) / 2.0;

  float icespread = smoothNoise(uv * 25.0 / uFrostCrystalSize + 200.0);

  vec2 rnd = vec2(
    rand(uv + frost * 0.1),
    rand(uv + frost * 0.1 + 0.5)
  );

  float clampedIceCoverage = clamp(uFrostIceCoverage, 0.1, 2.5);
  float size = mix(progress, sqrt(progress), 0.5) * 1.12 * clampedIceCoverage + 0.0000001;
  float lensY = clamp(pow(size, clamp(4.0, 1.5, 6.0)) / 2.0, size * 0.1, size * 8.0);
  vec2 lens = vec2(size, lensY);

  float dist = distance(uv, vec2(0.5, 0.5));
  float vignette = pow(1.0 - smoothstep(lens.x, lens.y, dist), 2.0);

  float frostyness = 0.8 * effectiveIntensity * uDistortionStrength;
  rnd *= frost * vignette * frostyness * (1.0 - floor(vignette));

  vec4 frozen = texture2D(uTexture2, getCoverUV(uv + rnd * 0.06, uTexture2Size));

  float tempShift = clamp(uFrostTemperature * 0.15, 0.0, 0.3);
  frozen *= vec4(
    clamp(0.85 + tempShift, 0.7, 1.2),
    clamp(0.9, 0.8, 1.0),
    clamp(1.2 - tempShift, 0.8, 1.3),
    1.0
  );
  float tempMixStrength = clamp(0.1 * uFrostTemperature, 0.0, 0.25);
  frozen = mix(frozen, vec4(0.9, 0.95, 1.1, 1.0), tempMixStrength);

  float frostMask = smoothstep(icespread * 0.8, 1.0, pow(vignette, 1.5));
  vec4 frostResult = mix(frozen, newImg, frostMask);

  float transitionStart = mix(0.85, 0.7, clamp(effectiveIntensity - 1.0, 0.0, 1.0));
  float colorTransition = smoothstep(transitionStart, 1.0, progress);
  vec4 finalFrost = mix(frostResult, newImg, colorTransition);

  finalFrost.rgb = mix(finalFrost.rgb, finalFrost.rgb * 1.2, (uColorEnhancement - 1.0) * 0.5);

  float overallBlend = smoothstep(0.0, 1.0, progress);
  if (progress > 0.95) {
    float endTransition = (progress - 0.95) / 0.05;
    finalFrost = mix(finalFrost, newImg, endTransition * 0.5);
  }

  return mix(currentImg, finalFrost, overallBlend);
}

// ── Ripple ──
vec4 rippleEffect(vec2 uv, float progress) {
  vec4 currentImg = texture2D(uTexture1, getCoverUV(uv, uTexture1Size));
  vec4 newImg = texture2D(uTexture2, getCoverUV(uv, uTexture2Size));

  vec2 center = vec2(0.5, 0.5);
  float dist = distance(uv, center);
  float maxDist = 0.8;

  float effectiveSpeed = uRippleWaveSpeed * uSpeedMultiplier;
  float effectiveAmplitude = uRippleAmplitude * uDistortionStrength * uGlobalIntensity;
  float effectiveDecay = uRippleDecay;

  float waveRadius = progress * maxDist * 1.5 * effectiveSpeed;

  float ripple1 = sin((dist - waveRadius) * uRippleFrequency) * exp(-abs(dist - waveRadius) * 8.0 * effectiveDecay);
  float ripple2 = sin((dist - waveRadius * 0.7) * uRippleFrequency * 1.3) *
                 exp(-abs(dist - waveRadius * 0.7) * 6.0 * effectiveDecay) * 0.6 * uRippleRippleCount;
  float ripple3 = sin((dist - waveRadius * 0.4) * uRippleFrequency * 1.8) *
                 exp(-abs(dist - waveRadius * 0.4) * 4.0 * effectiveDecay) * 0.3 * uRippleRippleCount;

  float combinedRipple = (ripple1 + ripple2 + ripple3) * effectiveAmplitude;

  vec2 normal = normalize(uv - center);
  vec2 distortedUV = getCoverUV(uv + normal * combinedRipple, uTexture2Size);

  vec4 distortedImg = texture2D(uTexture2, distortedUV);

  float fadeEdge = smoothstep(maxDist, maxDist * 0.9, dist);
  vec4 rippleResult = mix(newImg, distortedImg, fadeEdge);

  float mask = smoothstep(0.0, 0.3, progress) * (1.0 - smoothstep(0.7, 1.0, progress));
  rippleResult = mix(newImg, rippleResult, mask);

  rippleResult.rgb = mix(rippleResult.rgb, rippleResult.rgb * 1.2, (uColorEnhancement - 1.0) * 0.5);

  float transition = smoothstep(0.0, 1.0, progress);
  return mix(currentImg, rippleResult, transition);
}

// ── Plasma ──
vec4 plasmaEffect(vec2 uv, float progress) {
  vec4 currentImg = texture2D(uTexture1, getCoverUV(uv, uTexture1Size));
  vec4 newImg = texture2D(uTexture2, getCoverUV(uv, uTexture2Size));

  float effectiveSpeed = uPlasmaSpeed * uSpeedMultiplier;
  float effectiveIntensity = uPlasmaIntensity * uGlobalIntensity;
  float time = progress * 8.0 * effectiveSpeed;

  float plasma1 = sin(uv.x * 10.0 + time) * cos(uv.y * 8.0 + time * 0.7);
  float plasma2 = sin((uv.x + uv.y) * 12.0 + time * 1.3) * cos((uv.x - uv.y) * 15.0 + time * 0.9);
  float plasma3 = sin(length(uv - vec2(0.5)) * 20.0 + time * 1.8);

  float turbulence1 = smoothNoise(uv * 15.0 * uPlasmaTurbulence + vec2(time * 0.5, time * 0.3));
  float turbulence2 = smoothNoise(uv * 25.0 * uPlasmaTurbulence + vec2(time * 0.8, -time * 0.4)) * 0.7;
  float turbulence3 = smoothNoise(uv * 40.0 * uPlasmaTurbulence + vec2(-time * 0.6, time * 0.9)) * 0.4;

  float combinedTurbulence = (turbulence1 + turbulence2 + turbulence3) / 2.1;

  float plasma = (plasma1 + plasma2 + plasma3) * 0.333 + combinedTurbulence * 0.5;
  plasma = sin(plasma * 3.14159);

  float plasmaPhase = smoothstep(0.0, 0.3, progress) * (1.0 - smoothstep(0.7, 1.0, progress));

  vec2 electricField = vec2(
    sin(plasma * 6.28 + time) * 0.02,
    cos(plasma * 4.71 + time * 1.1) * 0.02
  ) * effectiveIntensity * plasmaPhase * uDistortionStrength;

  vec2 flowField1 = vec2(
    smoothNoise(uv * 8.0 + time * 0.4),
    smoothNoise(uv * 8.0 + time * 0.4 + 100.0)
  ) - 0.5;
  vec2 flowField2 = vec2(
    smoothNoise(uv * 16.0 + time * 0.6 + 200.0),
    smoothNoise(uv * 16.0 + time * 0.6 + 300.0)
  ) - 0.5;

  flowField1 *= 0.015 * effectiveIntensity * plasmaPhase * uDistortionStrength;
  flowField2 *= 0.008 * effectiveIntensity * plasmaPhase * uDistortionStrength;

  vec2 totalDistortion = electricField + flowField1 + flowField2;

  vec2 distortedUV1 = getCoverUV(uv + totalDistortion, uTexture1Size);
  vec2 distortedUV2 = getCoverUV(uv + totalDistortion, uTexture2Size);

  vec4 distortedCurrentImg = texture2D(uTexture1, distortedUV1);
  vec4 distortedNewImg = texture2D(uTexture2, distortedUV2);

  float energyMask = abs(plasma) * plasmaPhase * effectiveIntensity;
  vec4 blendedDistorted = mix(distortedCurrentImg, distortedNewImg, progress);

  vec3 energyColor = vec3(0.9, 0.95, 1.0);
  float energyPulse = sin(time * 4.0) * 0.5 + 0.5;
  float finalEnergyIntensity = energyMask * uPlasmaEnergyIntensity * (0.7 + energyPulse * 0.3);

  float contrast = 1.0 + energyMask * uPlasmaContrastBoost;
  vec3 contrastedColor = (blendedDistorted.rgb - 0.5) * contrast + 0.5;

  float saturationBoost = 1.0 + energyMask * 0.4;
  float luminance = dot(contrastedColor, vec3(0.299, 0.587, 0.114));
  vec3 saturatedColor = mix(vec3(luminance), contrastedColor, saturationBoost);

  vec3 glowColor = saturatedColor + energyColor * finalEnergyIntensity;

  float crackle = smoothNoise(uv * 50.0 + time * 2.0);
  crackle = smoothstep(0.85, 1.0, crackle) * energyMask;
  glowColor += vec3(1.0) * crackle * uPlasmaEnergyIntensity * 0.5;

  float brightnessPulse = sin(time * 6.0 + plasma * 10.0) * 0.5 + 0.5;
  glowColor += energyMask * brightnessPulse * uPlasmaEnergyIntensity * 0.2;

  glowColor = mix(glowColor, glowColor * 1.2, (uColorEnhancement - 1.0) * 0.5);

  vec4 plasmaResult = vec4(glowColor, 1.0);
  if (progress > 0.85) {
    float endFade = (progress - 0.85) / 0.15;
    plasmaResult = mix(plasmaResult, newImg, endFade);
  }

  float overallTransition = smoothstep(0.0, 1.0, progress);
  return mix(currentImg, plasmaResult, overallTransition);
}

// ── Timeshift ──
vec4 timeshiftEffect(vec2 uv, float progress) {
  vec2 uv1 = getCoverUV(uv, uTexture1Size);
  vec2 uv2_base = getCoverUV(uv, uTexture2Size);
  vec4 currentImg = texture2D(uTexture1, uv1);
  vec4 newImg = texture2D(uTexture2, uv2_base);

  float effectiveDistortion = uTimeshiftDistortion * uDistortionStrength * uGlobalIntensity;
  float effectiveBlur = uTimeshiftBlur * uGlobalIntensity;
  float effectiveFlow = uTimeshiftFlow * uSpeedMultiplier;
  float effectiveChromatic = uTimeshiftChromatic * uGlobalIntensity;
  float effectiveTurbulence = uTimeshiftTurbulence;

  vec2 center = vec2(0.5, 0.5);
  vec2 p = uv * uResolution;
  vec2 sphereCenter = center * uResolution;

  float maxRadius = length(uResolution) * 0.85;
  float circleRadius = progress * maxRadius;
  float dist = length(p - sphereCenter);
  float normalizedDist = dist / max(circleRadius, 0.001);

  float boundaryWidth = 0.2 * effectiveBlur;
  float inside = smoothstep(circleRadius + circleRadius * boundaryWidth,
                           circleRadius - circleRadius * boundaryWidth, dist);

  vec4 finalColor = newImg;

  if (inside > 0.01 && inside < 0.99) {
    vec2 fromCenter = uv - center;
    float radius = length(fromCenter);
    vec2 direction = radius > 0.0 ? fromCenter / radius : vec2(0.0);
    float boundaryStrength = smoothstep(0.0, 0.3, inside) * smoothstep(1.0, 0.7, inside);
    float time = progress * 6.28 * effectiveFlow;

    float turb1 = smoothNoise(uv * 12.0 * effectiveTurbulence + time * 0.4);
    float turb2 = smoothNoise(uv * 20.0 * effectiveTurbulence - time * 0.5);
    float turb3 = smoothNoise(uv * 35.0 * effectiveTurbulence + time * 0.7);
    float turb4 = smoothNoise(uv * 55.0 * effectiveTurbulence - time * 0.4);

    vec2 turbulence = vec2(
      (turb1 - 0.5) * 1.2 + (turb2 - 0.5) * 0.8 + (turb3 - 0.5) * 0.4,
      (turb2 - 0.5) * 1.2 + (turb3 - 0.5) * 0.8 + (turb4 - 0.5) * 0.4
    );

    float displacementStrength = 0.18 * effectiveDistortion * boundaryStrength;
    vec2 displacement = turbulence * displacementStrength;

    float radialPull = sin(normalizedDist * 12.0 - time * 2.5) * 0.05 * effectiveDistortion;
    displacement += direction * radialPull * boundaryStrength;

    vec2 perpendicular = vec2(-direction.y, direction.x);
    float swirl = sin(time * 2.5 + normalizedDist * 10.0) * 0.06 * effectiveFlow;
    displacement += perpendicular * swirl * boundaryStrength;

    vec2 distortedUV1 = getCoverUV(uv + displacement, uTexture1Size);
    vec2 distortedUV2 = getCoverUV(uv + displacement, uTexture2Size);

    vec4 distortedOld = texture2D(uTexture1, distortedUV1);
    vec4 distortedNew = texture2D(uTexture2, distortedUV2);

    if (effectiveChromatic > 0.01) {
      float chromaticStr = boundaryStrength * 0.03 * effectiveChromatic;
      vec2 uv1_r = getCoverUV(uv + displacement + direction * chromaticStr * 2.0, uTexture1Size);
      vec2 uv1_b = getCoverUV(uv + displacement - direction * chromaticStr * 1.2, uTexture1Size);
      distortedOld = vec4(texture2D(uTexture1, uv1_r).r, distortedOld.g, texture2D(uTexture1, uv1_b).b, 1.0);
      vec2 uv2_r = getCoverUV(uv + displacement + direction * chromaticStr * 2.0, uTexture2Size);
      vec2 uv2_b = getCoverUV(uv + displacement - direction * chromaticStr * 1.2, uTexture2Size);
      distortedNew = vec4(texture2D(uTexture2, uv2_r).r, distortedNew.g, texture2D(uTexture2, uv2_b).b, 1.0);
    }

    finalColor = mix(distortedOld, distortedNew, inside);

    if (effectiveBlur > 0.5) {
      vec4 blurSample1 = texture2D(uTexture2, getCoverUV(uv + displacement + turbulence * 0.015, uTexture2Size));
      vec4 blurSample2 = texture2D(uTexture2, getCoverUV(uv + displacement - turbulence * 0.015, uTexture2Size));
      vec4 blurSample3 = texture2D(uTexture1, getCoverUV(uv + displacement + vec2(turbulence.y, -turbulence.x) * 0.015, uTexture1Size));
      float blurAmount = boundaryStrength * effectiveBlur * 0.6;
      finalColor = mix(finalColor, (finalColor + blurSample1 + blurSample2 + blurSample3) * 0.25, blurAmount);
    }
  } else if (inside >= 0.99) {
    finalColor = newImg;
  } else {
    finalColor = currentImg;
  }

  finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * 1.2, (uColorEnhancement - 1.0) * 0.5);
  if (progress > 0.95) {
    float endTransition = (progress - 0.95) / 0.05;
    finalColor = mix(finalColor, newImg, endTransition);
  }

  return mix(currentImg, finalColor, smoothstep(0.0, 1.0, progress));
}

void main() {
  if (uEffectType == 0) {
    gl_FragColor = glassEffect(vUv, uProgress);
  } else if (uEffectType == 1) {
    gl_FragColor = frostEffect(vUv, uProgress);
  } else if (uEffectType == 2) {
    gl_FragColor = rippleEffect(vUv, uProgress);
  } else if (uEffectType == 3) {
    gl_FragColor = plasmaEffect(vUv, uProgress);
  } else {
    gl_FragColor = timeshiftEffect(vUv, uProgress);
  }
}
`;

/* ════════════════════════════════════════════
   REACT COMPONENT
   ════════════════════════════════════════════ */

export default function VisualSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);

  // Mutable state kept outside React for perf
  const sliderState = useRef({
    currentSlideIndex: 0,
    isTransitioning: false,
    texturesLoaded: false,
    sliderEnabled: false,
    slideTextures: [] as THREE.Texture[],
    progressTimer: null as ReturnType<typeof setInterval> | null,
    autoTimer: null as ReturnType<typeof setTimeout> | null,
    material: null as THREE.ShaderMaterial | null,
    renderer: null as THREE.WebGLRenderer | null,
    scene: null as THREE.Scene | null,
    camera: null as THREE.OrthographicCamera | null,
    animFrameId: 0,
    effectIndex: 0,
    touchStartX: 0,
  });

  /* ── helpers ─────────────────────────────── */
  const stopTimer = useCallback(() => {
    const s = sliderState.current;
    if (s.progressTimer) {
      clearInterval(s.progressTimer);
      s.progressTimer = null;
    }
    if (s.autoTimer) {
      clearTimeout(s.autoTimer);
      s.autoTimer = null;
    }
  }, []);

  const updateProgress = useCallback((slideIndex: number, pct: number) => {
    const items = navRef.current?.querySelectorAll(".vs-nav-item");
    if (!items?.[slideIndex]) return;
    const fill =
      items[slideIndex].querySelector<HTMLElement>(".vs-progress-fill");
    if (fill) {
      fill.style.width = `${pct}%`;
      fill.style.opacity = "1";
    }
  }, []);

  const fadeProgress = useCallback((slideIndex: number) => {
    const items = navRef.current?.querySelectorAll(".vs-nav-item");
    if (!items?.[slideIndex]) return;
    const fill =
      items[slideIndex].querySelector<HTMLElement>(".vs-progress-fill");
    if (fill) {
      fill.style.opacity = "0";
      setTimeout(() => {
        fill.style.width = "0%";
      }, 300);
    }
  }, []);

  const quickResetProgress = useCallback((slideIndex: number) => {
    const items = navRef.current?.querySelectorAll(".vs-nav-item");
    if (!items?.[slideIndex]) return;
    const fill =
      items[slideIndex].querySelector<HTMLElement>(".vs-progress-fill");
    if (fill) {
      fill.style.transition = "width 0.2s ease-out";
      fill.style.width = "0%";
      setTimeout(() => {
        fill.style.transition = "width 0.1s ease, opacity 0.3s ease";
      }, 200);
    }
  }, []);

  const updateNavState = useCallback((activeIndex: number) => {
    const items = navRef.current?.querySelectorAll(".vs-nav-item");
    items?.forEach((item, i) => {
      item.classList.toggle("active", i === activeIndex);
    });
  }, []);

  const updateCounter = useCallback((index: number) => {
    if (counterRef.current)
      counterRef.current.textContent = String(index + 1).padStart(2, "0");
    if (totalRef.current)
      totalRef.current.textContent = String(SLIDES.length).padStart(2, "0");
  }, []);

  /* ── main effect ─────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const s = sliderState.current;

    // Reset state for this effect run (handles React strict mode re-mount)
    s.slideTextures.forEach((t) => t.dispose());
    s.slideTextures = [];
    s.currentSlideIndex = 0;
    s.texturesLoaded = false;
    s.sliderEnabled = false;
    s.isTransitioning = false;
    let cancelled = false;

    // Use glass effect only
    s.effectIndex = getEffectIndex("glass");

    // ── Three.js setup
    s.scene = new THREE.Scene();
    s.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    s.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: "default",
    });
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    s.renderer.setSize(cw, ch);
    s.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    s.material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture1: { value: null },
        uTexture2: { value: null },
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(cw, ch) },
        uTexture1Size: { value: new THREE.Vector2(1, 1) },
        uTexture2Size: { value: new THREE.Vector2(1, 1) },
        uEffectType: { value: s.effectIndex },
        uGlobalIntensity: { value: CONFIG.globalIntensity },
        uSpeedMultiplier: { value: CONFIG.speedMultiplier },
        uDistortionStrength: { value: CONFIG.distortionStrength },
        uColorEnhancement: { value: CONFIG.colorEnhancement },
        uGlassRefractionStrength: { value: CONFIG.glassRefractionStrength },
        uGlassChromaticAberration: { value: CONFIG.glassChromaticAberration },
        uGlassBubbleClarity: { value: CONFIG.glassBubbleClarity },
        uGlassEdgeGlow: { value: CONFIG.glassEdgeGlow },
        uGlassLiquidFlow: { value: CONFIG.glassLiquidFlow },
        uFrostIntensity: { value: CONFIG.frostIntensity },
        uFrostCrystalSize: { value: CONFIG.frostCrystalSize },
        uFrostIceCoverage: { value: CONFIG.frostIceCoverage },
        uFrostTemperature: { value: CONFIG.frostTemperature },
        uFrostTexture: { value: CONFIG.frostTexture },
        uRippleFrequency: { value: CONFIG.rippleFrequency },
        uRippleAmplitude: { value: CONFIG.rippleAmplitude },
        uRippleWaveSpeed: { value: CONFIG.rippleWaveSpeed },
        uRippleRippleCount: { value: CONFIG.rippleRippleCount },
        uRippleDecay: { value: CONFIG.rippleDecay },
        uPlasmaIntensity: { value: CONFIG.plasmaIntensity },
        uPlasmaSpeed: { value: CONFIG.plasmaSpeed },
        uPlasmaEnergyIntensity: { value: CONFIG.plasmaEnergyIntensity },
        uPlasmaContrastBoost: { value: CONFIG.plasmaContrastBoost },
        uPlasmaTurbulence: { value: CONFIG.plasmaTurbulence },
        uTimeshiftDistortion: { value: CONFIG.timeshiftDistortion },
        uTimeshiftBlur: { value: CONFIG.timeshiftBlur },
        uTimeshiftFlow: { value: CONFIG.timeshiftFlow },
        uTimeshiftChromatic: { value: CONFIG.timeshiftChromatic },
        uTimeshiftTurbulence: { value: CONFIG.timeshiftTurbulence },
      },
      vertexShader,
      fragmentShader,
    });

    const geo = new THREE.PlaneGeometry(2, 2);
    s.scene.add(new THREE.Mesh(geo, s.material));

    // ── Load textures
    const loader = new THREE.TextureLoader();
    const loadTexture = (src: string): Promise<THREE.Texture> =>
      new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("Timeout")), 15000);
        loader.load(
          src,
          (tex) => {
            clearTimeout(timeout);
            tex.minFilter = tex.magFilter = THREE.LinearFilter;
            tex.userData = {
              size: new THREE.Vector2(tex.image.width, tex.image.height),
            };
            resolve(tex);
          },
          undefined,
          () => {
            clearTimeout(timeout);
            reject(new Error("Load failed"));
          },
        );
      });

    const loadAll = async () => {
      for (const slide of SLIDES) {
        if (cancelled) return;
        try {
          const tex = await loadTexture(slide.media);
          if (cancelled) {
            tex.dispose();
            return;
          }
          s.slideTextures.push(tex);
        } catch {
          console.warn("Failed to load slide texture");
        }
      }
      if (cancelled) return;
      if (s.slideTextures.length >= 2 && s.material) {
        s.material.uniforms.uTexture1.value = s.slideTextures[0];
        s.material.uniforms.uTexture2.value = s.slideTextures[1];
        s.material.uniforms.uTexture1Size.value =
          s.slideTextures[0].userData.size;
        s.material.uniforms.uTexture2Size.value =
          s.slideTextures[1].userData.size;
        s.texturesLoaded = true;
        s.sliderEnabled = true;
        renderOnce();
        startTimer(500);
      }
    };

    // ── Auto-slide timer
    const startTimer = (delay = 0) => {
      stopTimer();
      if (!s.sliderEnabled || !s.texturesLoaded) return;
      const go = () => {
        let progress = 0;
        const increment = (100 / CONFIG.autoSlideSpeed) * 50;
        s.progressTimer = setInterval(() => {
          if (!s.sliderEnabled) {
            stopTimer();
            return;
          }
          progress += increment;
          updateProgress(s.currentSlideIndex, progress);
          if (progress >= 100) {
            if (s.progressTimer) clearInterval(s.progressTimer);
            s.progressTimer = null;
            fadeProgress(s.currentSlideIndex);
            if (!s.isTransitioning) handleChange();
          }
        }, 50);
      };
      if (delay > 0) {
        s.autoTimer = setTimeout(() => {
          if (s.sliderEnabled) go();
        }, delay);
      } else {
        go();
      }
    };

    // ── Navigate
    const navigateTo = (targetIndex: number) => {
      if (
        s.isTransitioning ||
        targetIndex === s.currentSlideIndex ||
        !s.material
      )
        return;
      stopTimer();
      quickResetProgress(s.currentSlideIndex);

      const curTex = s.slideTextures[s.currentSlideIndex];
      const tgtTex = s.slideTextures[targetIndex];
      if (!curTex || !tgtTex) return;

      s.isTransitioning = true;

      // Keep glass effect
      s.material!.uniforms.uEffectType.value = s.effectIndex;

      s.material!.uniforms.uTexture1.value = curTex;
      s.material!.uniforms.uTexture2.value = tgtTex;
      s.material!.uniforms.uTexture1Size.value = curTex.userData.size;
      s.material!.uniforms.uTexture2Size.value = tgtTex.userData.size;

      s.currentSlideIndex = targetIndex;
      updateCounter(targetIndex);
      updateNavState(targetIndex);

      gsap.fromTo(
        s.material!.uniforms.uProgress,
        { value: 0 },
        {
          value: 1,
          duration: CONFIG.transitionDuration,
          ease: "power2.inOut",
          onUpdate: renderOnce,
          onComplete: () => {
            if (!s.material) return;
            s.material.uniforms.uProgress.value = 0;
            s.material.uniforms.uTexture1.value = tgtTex;
            s.material.uniforms.uTexture1Size.value = tgtTex.userData.size;
            s.isTransitioning = false;
            renderOnce();
            startTimer(100);
          },
        },
      );
    };

    const handleChange = () => {
      if (s.isTransitioning || !s.texturesLoaded || !s.sliderEnabled) return;
      navigateTo((s.currentSlideIndex + 1) % s.slideTextures.length);
    };

    const prevSlide = () => {
      if (s.isTransitioning || !s.sliderEnabled) return;
      stopTimer();
      quickResetProgress(s.currentSlideIndex);
      navigateTo(
        (s.currentSlideIndex - 1 + s.slideTextures.length) %
          s.slideTextures.length,
      );
    };

    const nextSlide = () => {
      if (s.isTransitioning || !s.sliderEnabled) return;
      stopTimer();
      quickResetProgress(s.currentSlideIndex);
      handleChange();
    };

    // ── Render (on-demand, not continuous)
    const renderOnce = () => {
      if (s.renderer && s.scene && s.camera) {
        s.renderer.render(s.scene, s.camera);
      }
    };
    // Initial render once textures are ready is handled in loadAll

    // ── Events
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".vs-navigation")) return;
      nextSlide();
    };

    const onTouchStart = (e: TouchEvent) => {
      s.touchStartX = e.changedTouches[0].screenX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].screenX - s.touchStartX;
      if (Math.abs(dx) < 50) return;
      if (dx < 0) nextSlide();
      else prevSlide();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "ArrowRight" || e.code === "Space") {
        e.preventDefault();
        nextSlide();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };

    const onResize = () => {
      if (!s.renderer || !s.material || !container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      s.renderer.setSize(w, h);
      s.material.uniforms.uResolution.value.set(w, h);
      renderOnce();
    };

    const onVisibility = () => {
      if (document.hidden) {
        stopTimer();
      } else if (s.sliderEnabled && !s.isTransitioning) {
        startTimer();
      }
    };

    // Nav item clicks
    const onNavClick = (e: Event) => {
      const item = e.currentTarget as HTMLElement;
      const idx = parseInt(item.dataset.slideIndex ?? "0");
      if (idx !== s.currentSlideIndex && !s.isTransitioning) navigateTo(idx);
    };

    // Attach nav listeners
    setTimeout(() => {
      navRef.current?.querySelectorAll(".vs-nav-item").forEach((item) => {
        item.addEventListener("click", onNavClick);
      });
    }, 0);

    canvas.addEventListener("click", onClick);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    loadAll();

    // ── Cleanup
    return () => {
      cancelled = true;
      stopTimer();
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      navRef.current?.querySelectorAll(".vs-nav-item").forEach((item) => {
        item.removeEventListener("click", onNavClick);
      });

      s.slideTextures.forEach((t) => t.dispose());
      s.slideTextures = [];
      geo.dispose();
      s.material?.dispose();
      s.renderer?.dispose();
      s.material = null;
      s.renderer = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[90vh] overflow-hidden select-none"
    >
      {/* WebGL canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Slide title overlay */}
      <div className="absolute bottom-24 md:bottom-16 left-6 md:left-12 z-10 pointer-events-none">
        <span className="text-[9px] tracking-[0.5em] uppercase text-white/20 font-light">
          NOVA &mdash; FW26
        </span>
      </div>

      {/* Navigation — bottom right */}
      <div
        ref={navRef}
        className="vs-navigation absolute bottom-8 md:bottom-12 right-6 md:right-12 z-20 flex items-center gap-3"
      >
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            data-slide-index={i}
            className={`vs-nav-item group cursor-pointer flex flex-col items-center gap-1.5 ${i === 0 ? "active" : ""}`}
          >
            <div className="relative w-8 md:w-12 h-px bg-white/10 overflow-hidden rounded-full">
              <div
                className="vs-progress-fill absolute left-0 top-0 h-full bg-white/70 rounded-full"
                style={{
                  width: "0%",
                  transition: "width 0.1s ease, opacity 0.3s ease",
                }}
              />
            </div>
            <span className="text-[7px] md:text-[8px] tracking-[0.2em] text-white/20 group-[.active]:text-white/50 transition-colors uppercase">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>

      {/* Counter — bottom left */}
      <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 z-10 flex items-baseline gap-1 pointer-events-none">
        <span
          ref={counterRef}
          className="text-sm md:text-lg font-extralight tracking-widest text-white/60"
        >
          01
        </span>
        <span className="text-[8px] text-white/15 tracking-wider mx-1">/</span>
        <span
          ref={totalRef}
          className="text-[10px] text-white/20 tracking-wider font-light"
        >
          {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* Click hint */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-0 animate-[fadeInHint_1s_2s_forwards]"></div>

      {/* Brand Statement Overlay (moved here from page) */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="brand-card backdrop-blur-sm bg-black/30 rounded-xl px-8 py-10 md:px-16 md:py-14 flex flex-col items-center shadow-2xl shadow-black/40">
          <span
            className="mb-4 text-[10px] md:text-xs tracking-[0.8em] text-white/40 uppercase font-light"
            style={{ letterSpacing: "0.4em" }}
          >
            Established 2024
          </span>

          <h2 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-extralight tracking-wide leading-tight text-center">
            Where darkness meets
            <br />
            <span className="text-white/60">elegance</span>
          </h2>

          <p className="mt-8 text-base md:text-lg font-light text-white/60 text-center max-w-2xl">
            NOVA crafts garments that exist at the intersection of shadow and
            sophistication. Each piece is designed to move with you —
            constructed with premium materials and an uncompromising attention
            to detail.
          </p>

          <div className="mt-8 w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}
