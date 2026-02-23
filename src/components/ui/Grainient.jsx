import { useId, useMemo } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function Grainient({
  color1 = '#3f363f',
  color2 = '#1226ba',
  color3 = '#0c0c0d',
  colorBalance = -0.15,
  warpStrength = 0.8,
  warpFrequency = 4.1,
  blendAngle = -19
}) {
  const filterId = useId().replace(/:/g, '');

  const config = useMemo(() => {
    const normalizedBalance = clamp(colorBalance, -1, 1);
    const overlayOneOpacity = clamp(0.72 + normalizedBalance * 0.28, 0.15, 0.95);
    const overlayTwoOpacity = clamp(0.6 - normalizedBalance * 0.2, 0.12, 0.9);
    const turbulenceFrequency = Math.max(0.005, warpFrequency / 100);
    const displacementScale = Math.max(0, warpStrength * 34);

    return {
      overlayOneOpacity,
      overlayTwoOpacity,
      turbulenceFrequency,
      displacementScale,
      blendAngle
    };
  }, [blendAngle, colorBalance, warpFrequency, warpStrength]);

  return (
    <div className="grainient-bg" aria-hidden="true">
      <svg className="grainient-filter-def" xmlns="http://www.w3.org/2000/svg">
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={config.turbulenceFrequency}
            numOctaves="3"
            seed="7"
            stitchTiles="stitch"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={config.displacementScale} xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </svg>

      <div className="grainient-layer grainient-base" style={{ backgroundColor: color3 }} />
      <div
        className="grainient-layer grainient-overlay-one"
        style={{
          opacity: config.overlayOneOpacity,
          background: `linear-gradient(${config.blendAngle}deg, ${color1} 0%, transparent 70%)`
        }}
      />
      <div
        className="grainient-layer grainient-overlay-two"
        style={{
          opacity: config.overlayTwoOpacity,
          background: `radial-gradient(circle at 75% 25%, ${color2} 0%, transparent 58%)`
        }}
      />
      <div className="grainient-layer grainient-noise" style={{ filter: `url(#${filterId})` }} />
    </div>
  );
}

export default Grainient;
