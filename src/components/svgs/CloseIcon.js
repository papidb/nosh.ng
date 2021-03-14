import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function CloseIcon({fill = '#FF4000', ...props}) {
  return (
    <Svg
      width={9}
      height={9}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M8.74 7.565L5.67 4.483 8.74 1.4A.833.833 0 008.723.243.825.825 0 007.571.226L4.5 3.31 1.43.226A.825.825 0 00.276.243.833.833 0 00.26 1.4l3.07 3.083L.26 7.565A.833.833 0 00.62 8.974a.825.825 0 00.808-.235L4.5 5.657l3.07 3.082a.825.825 0 001.404-.362.833.833 0 00-.234-.812z"
        fill={fill}
      />
    </Svg>
  );
}
