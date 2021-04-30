import * as React from 'react';

import Svg, {Circle, Path, SvgProps} from 'react-native-svg';
import PropTypes from 'prop-types';

export function CloseIconLight({...props}) {
  return (
    <Svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx="20" cy="20" r="20" fill="#B4EBFF" />
      <Circle cx="20" cy="20" r="16.0976" fill="#023248" />
      <Path
        d="M24.1369 22.9904L21.1411 19.9832L24.1369 16.9761C24.4365 16.6572 24.4292 16.157 24.1204 15.8471C23.8117 15.5371 23.3134 15.5298 22.9957 15.8306L20 18.8378L17.0042 15.8306C16.6866 15.5298 16.1883 15.5371 15.8795 15.8471C15.5708 16.157 15.5635 16.6572 15.8631 16.9761L18.8589 19.9832L15.8631 22.9904C15.6492 23.1929 15.5619 23.4962 15.6353 23.782C15.7086 24.0678 15.9309 24.291 16.2157 24.3646C16.5004 24.4382 16.8025 24.3506 17.0042 24.1359L20 21.1287L22.9957 24.1359C23.1975 24.3506 23.4996 24.4382 23.7843 24.3646C24.069 24.291 24.2914 24.0678 24.3647 23.782C24.438 23.4962 24.3507 23.1929 24.1369 22.9904Z"
        fill="white"
      />
    </Svg>
  );
}

CloseIconLight.propTypes = {
  fill: PropTypes.string,
  ...SvgProps,
};
