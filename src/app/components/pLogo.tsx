export default function PlogoSVG(props: { classPath?: string }) {
  const { classPath } = props;
  return (
    <svg
      version="1.1"
      viewBox="0 0 1200 1520"
      width="1280"
      height="1280"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <defs>
        <filter id="strokeGlow" y="-10" x="-10" width="250" height="150">
          <feOffset
            in="StrokePaint"
            dx="0"
            dy="0"
            result="centeredOffset"
          ></feOffset>

          <feGaussianBlur
            in="centeredOffset"
            stdDeviation="2"
            result="blur1"
          ></feGaussianBlur>
          <feGaussianBlur
            in="centeredOffset"
            stdDeviation="5"
            result="blur2"
          ></feGaussianBlur>
          <feGaussianBlur
            in="centeredOffset"
            stdDeviation="15"
            result="blur3"
          ></feGaussianBlur>

          <feMerge>
            <feMergeNode in="blur1"></feMergeNode>
            <feMergeNode in="blur2"></feMergeNode>
            <feMergeNode in="blur3"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      <path
        filter="url(#strokeGlow)"
        transform="translate(588)"
        d="m0 0h88l34 4 35 6 34 9 32 11 32 14 17 9 12 6 23 14 12 8 14 10 13 10 14 12 8 7 16 15 16 17 11 13 11 14 11 15 10 15 13 21 11 19 10 21 6 12 11 28 10 30 8 29 8 39 5 35 2 18 2 30v65l-3 38-5 36-7 36-7 28-11 35-11 28-9 20-8 17-12 22-11 18-11 17-12 16-13 17-9 10-7 8-11 11-7 8-24 22-14 11-13 10-24 16-22 13-23 12-23 11-29 11-29 9-36 8-25 4-29 3-19 1h-42l-32-2-36-5-29-6-29-8-21-7-26-11-16-8-19-10-19-12-20-14-13-10-11-9-20-18-18-18-7-8-9-10-13-17-5-7-1 638-1 1-98 1h-83l-1-1v-1495l2-1h179l2 2v160h2l13-17 9-11 11-12 7-8 14-14 8-7 14-12 16-12 30-20 21-12 23-12 23-10 21-8 28-8 25-6 37-6zm16 7-40 4-36 6-32 8-24 8-20 8-25 12-19 10-21 13-12 8-19 14-16 13-11 10-8 7-16 16-9 11-12 14-13 19-10 16-3 3 1-10v-173l-1-1h-165l-1 1477 1 4h165l1-654-1-6 4 4 10 16 12 16 13 16 18 20 11 11 8 7 10 9 14 11 17 13 15 10 21 13 17 9 24 11 20 8 25 8 32 8 36 6 29 3 18 1h45l28-2 24-3 36-7 29-8 29-10 24-10 30-15 17-10 19-12 17-12 14-11 16-13 15-14 23-23 7-8 14-17 10-14 15-22 12-20 10-18 8-16 9-19 11-28 11-33 8-31 6-29 5-32 4-43 1-29v-30l-2-40-4-37-6-35-7-31-9-30-9-26-12-28-8-16-13-25-14-23-14-20-13-17-11-13-12-14-21-21-8-7-14-12-17-13-17-12-19-12-18-10-25-13-25-11-20-7-22-7-23-6-25-5-28-4-34-3z"
        fill="#3D3D3D"
        className={classPath}
      />
      <path
        filter="url(#strokeGlow)"
        transform="translate(600,152)"
        d="m0 0h52l22 2 30 5 27 7 25 9 26 12 24 13 18 12 12 9 11 9 12 11 18 18 9 11 10 13 16 24 13 23 10 21 9 23 8 26 6 26 5 29 3 30v76l-4 37-5 27-7 28-9 27-10 24-8 17-12 21-10 15-8 11-13 16-7 8-27 27-11 9-16 12-19 12-18 10-15 7-26 10-26 8-23 5-29 4-30 2h-17l-20-1-30-4-24-5-27-8-21-8-24-11-20-11-12-8-19-14-10-9-8-7-21-21-9-11-10-12-16-23-12-20-8-16-9-20-10-28-7-25-7-35-4-34-2-34v-22l2-31 4-33 7-34 6-21 7-21 9-21 11-23 14-23 11-16 11-14 9-11 11-12 7-8 12-11 14-11 13-10 21-13 22-12 24-11 25-9 27-7 21-4zm0 8-31 4-27 6-26 8-20 8-21 10-18 10-18 12-14 10-14 12-30 30-9 11-8 11-16 24-11 19-13 28-9 24-7 24-6 27-4 26-3 34v52l3 34 4 27 6 28 8 27 10 26 9 20 10 18 16 24 9 12 11 13 9 10 3 4h2l2 4 4 4h2v2l8 7 10 9 16 12 18 12 18 10 23 11 27 10 30 8 30 5 19 2 29 1 33-2 27-4 23-5 29-9 24-10 16-8 18-10 16-11 12-9 13-11 15-14 10-10 7-8 13-16 13-19 8-13 7-12 11-23 10-26 8-26 7-31 4-26 3-30 1-42-1-31-4-36-5-26-7-28-9-26-9-21-8-16-9-17-14-21-12-16-11-13-12-13-15-14-14-11-15-11-18-11-18-10-20-9-24-9-25-7-24-5-23-3-13-1z"
        fill="#383838"
        className={classPath}
      />
    </svg>
  );
}
