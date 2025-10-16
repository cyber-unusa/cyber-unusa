export const mockUp = (asset) => {
  return (
    <>
      <svg
        width="auto"
        height="auto"
        viewBox="0 0 808 1100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g mask="url(#mask0_375_171)">
          <image
            xlinkHref={asset}
            x="0"
            y="0"
            width="808"
            height="1100"
            preserveAspectRatio="middle none"
          />
          <g mask="url(#mask0_375_172)">
            <path
              d="M017.5 245.078L408 0V860.622L0 1100V245.078Z"
              fill="rgba(245, 40, 145, 0)"
            />
          </g>
        </g>
      </svg>
    </>
  );
};
