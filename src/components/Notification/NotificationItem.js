import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {Box, Text} from 'components';

import {commaFormatter} from 'shared/utils';

export class NotificationItem extends PureComponent {
  render() {
    const {message, amount} = this.props;
    return (
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        style={styles.container}>
        <Text
          fontFamily="Hurme Geometric Sans 2"
          fontSize={14}
          fontWeight="600"
          style={styles.message}>
          {message}
        </Text>
        {amount && (
          <Text color="primary" fontSize={18}>
            {commaFormatter(amount)}
          </Text>
        )}
      </Box>
    );
  }
}

// export const NotificationItem = (props) => {
//   const {message, amount} = props;
//   return (
//     <Box
//       flexDirection="row"
//       justifyContent="space-between"
//       alignItems="center"
//       style={styles.container}>
//       <Text
//         fontFamily="Hurme Geometric Sans 2"
//         fontSize={14}
//         fontWeight="600"
//         style={{color: '#525C6B'}}>
//         {message}
//       </Text>
//       {amount && (
//         <Text color="primary" fontSize={18}>
//           {commaFormatter(amount)}
//         </Text>
//       )}
//     </Box>
//   );
// };

const styles = StyleSheet.create({
  container: {paddingTop: 14, paddingBottom: 16, paddingHorizontal: 18},
  message: {color: '#525C6B'},
});
