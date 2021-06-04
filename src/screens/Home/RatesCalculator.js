import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  Box,
  Text,
  Circle,
  Select,
  ErrorText,
  Divider,
  Input,
  SWW,
  Loading,
} from 'components';
import {palette} from 'constants/theme';
import images from 'constants/images';
import {hp, wp} from 'shared/scale';
import data from 'constants/data';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import * as Yup from 'yup';
import {useSelector} from 'react-redux';
import {selectCardSubCategories} from 'selectors';
import {GiftCardBox} from 'components/GiftCard';
import {connect} from 'react-redux';
import {getCards} from 'action';
import {commaFormatter} from 'shared/utils';
import {useQuery} from 'react-query';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const schema = Yup.object().shape({
  // name: Yup.string().required('Required'),
  category: Yup.object()
    .nullable()
    .test("isnt't-null", 'Required', (value) =>
      Promise.resolve(value && Object.keys(value).length != 0),
    )
    .notOneOf([data.cardCategoryRates.value], 'Required')
    .required('Required'),
});

export const RatesCalculatorScreen = ({getCards}) => {
  const {
    control,
    // handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  // const onSubmit = (data) => console.log(data);
  const [index, setIndex] = React.useState(null);
  const [rate, setRate] = React.useState(0);
  const [amount, setAmount] = React.useState('0');

  const {data: cardCategories = [], status, isFetching, refetch} = useQuery(
    'giftcards',
    () => getCards(),
    {
      // staleTime: 5 * 60 * 60, // 5 minutes
      staleTime: __DEV__ ? 5 * 60 * 60 : 0,
      // cacheTime: 0,
    },
  );
  // console.log({isLoading, cardCategories, status});
  // const cardCategories = useSelector(selectCardSubCategories);
  const selectedCategory = React.useMemo(() => cardCategories[index] || {}, [
    cardCategories,
    index,
  ]);
  const cardCategorySelect = React.useMemo(
    () =>
      cardCategories.map((cardCategory, index) => ({
        label: cardCategory.name,
        value: index,
      })),
    [cardCategories],
  );
  const cardSubCategorySelect = React.useMemo(
    () =>
      (selectedCategory?.cardSubCategories ?? []).map(
        (cardCategory, index) => ({
          label: cardCategory.name,
          value: {index, rate: cardCategory.rate},
        }),
      ),
    [selectedCategory],
  );
  if (status === 'loading') return <Loading />;
  if (status === 'error') return <SWW {...{goToFirst: refetch, isFetching}} />;

  if (status === 'success')
    return (
      <Box flex={1}>
        <ScrollView contentContainerStyle={styles.container}>
          <KeyboardAwareScrollView>
            {/* Header */}
            <Box
              flexDirection="row"
              marginBottom="xxxl"
              justifyContent="space-between"
              alignItems="center">
              <Circle size={hp(71.27)} backgroundColor="inactiveInputBorder">
                <Image
                  resizeMode="contain"
                  source={images.calculator}
                  style={styles.image}
                />
              </Circle>

              <Text fontSize={14} fontWeight="600" color="primary">
                Rate Calculator
              </Text>
            </Box>

            {/* content */}
            <Box>
              {/* category select */}
              <Box>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Select
                      placeholder={data.cardCategoryRates}
                      items={cardCategorySelect}
                      value={value}
                      touched={null}
                      onValueChange={(selectValue) => {
                        setIndex(selectValue);
                        onChange(selectValue);
                      }}
                      errorTextProps={{marginLeft: 'l'}}
                      onClose={() => {
                        // setFieldTouched('category', true);
                      }}
                    />
                  )}
                  name="category"
                  rules={{required: true}}
                  defaultValue=""
                />
                <ErrorText error={errors.category?.message} touched={true} />
                <Box style={styles.divider}>
                  <Divider />
                </Box>
              </Box>
              <Box>
                <Box style={styles.divider} />
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Select
                      placeholder={data.cardSub}
                      items={cardSubCategorySelect}
                      value={value}
                      touched={null}
                      onValueChange={(selectValue) => {
                        onChange(selectValue);
                        setRate(selectValue?.rate ?? 0);
                      }}
                      onClose={() => {
                        // setFieldTouched('category', true);
                      }}
                    />
                  )}
                  name="subCategory"
                  rules={{required: true}}
                  defaultValue=""
                />
                <ErrorText error={errors.category?.message} touched={true} />
                <Box style={styles.divider}>
                  <Divider />
                </Box>
              </Box>
              {/* Amount Form */}
              <Box style={styles.EnterAmount}>
                <Text
                  fontSize={13}
                  color="white"
                  textAlign="center"
                  fontWeight="600">
                  Enter Amount
                </Text>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      variant="giftcard"
                      placeholder="0.00"
                      // autoFocus
                      keyboardType="number-pad"
                      inputStyle={{color: palette.blue}}
                      innerContainerProps={{
                        backgroundColor: 'mostBg',
                        height: 67,
                        borderRadius: 100,
                      }}
                      onChangeText={(amountValue) => {
                        onChange(amountValue);
                        setAmount(amountValue);
                      }}
                      onBlur={onBlur}
                      // touched={touched.amount}
                      placeholderTextColor={palette.blue}
                      {...{value}}
                    />
                  )}
                  name="amount"
                  rules={{required: true}}
                  defaultValue=""
                />
                <ErrorText error={errors.amount?.message} touched={true} />
              </Box>
              <Box
                marginTop="s"
                flex={1}
                backgroundColor="lightSuccess"
                borderRadius={100}
                height={38}
                padding="m"
                paddingLeft="xl"
                paddingRight="l"
                justifyContent="space-between"
                flexDirection="row"
                alignItems="center">
                <Text color="primary" fontWeight="600" fontSize={13}>
                  Rate
                </Text>
                <Text color="green" fontWeight="600" fontSize={13}>
                  {rate}
                </Text>
              </Box>
              <Box style={styles.calculatedAmountView}>
                <Divider style={{marginHorizontal: 35, marginBottom: hp(15)}} />
                <Text
                  fontSize={13}
                  color="white"
                  textAlign="center"
                  fontWeight="600"
                  marginBottom="xxs">
                  Calculated Amount
                </Text>
                <GiftCardBox
                  marginVertical="s"
                  // marginBottom="xs"
                  flexDirection="row"
                  backgroundColor="mostBg"
                  justifyContent="space-between"
                  height={67}>
                  <Text fontSize={24} color="success">
                    {commaFormatter(rate * amount)}
                  </Text>
                  <Text fontSize={12} fontWeight="600" color="success">
                    NGN
                  </Text>
                </GiftCardBox>
                <Divider style={{marginHorizontal: 35, marginTop: hp(49)}} />
              </Box>
            </Box>

            <Box height={100} />
          </KeyboardAwareScrollView>
        </ScrollView>
      </Box>
    );
};

export const RatesCalculator = connect(null, {
  getCards,
})(RatesCalculatorScreen);

const styles = StyleSheet.create({
  container: {marginHorizontal: 20},
  image: {width: wp(29.65), height: hp(39.2)},
  divider: {
    marginTop: hp(19),
  },
  EnterAmount: {
    marginTop: hp(21),
  },
  calculatedAmountView: {
    marginTop: hp(40),
  },
});
