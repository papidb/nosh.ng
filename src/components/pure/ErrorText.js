import React from 'react';
import {Text} from './Text';
import {StyleSheet} from 'react-native';

export const ErrorText = ({error, touched, ...props}) => {
  // console.log({error, touched})
  // return null
  return (
    <>
      {touched && error && (
        <Text
          fontWeight="600"
          marginTop="xxs"
          marginLeft="xl"
          style={styles.errorInput}
          {...props}>
          {error}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  errorInput: {color: 'red', fontSize: 12},
});
