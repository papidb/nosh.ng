/* eslint-disable eqeqeq */
import React, {useState, useCallback, useEffect} from 'react';
import {SectionList, ActivityIndicator} from 'react-native';

import {Box, Text, Loading, Close, Divider, HeaderInfo} from 'components';

import {commaFormatter, uuid, purgeData} from 'shared/utils';

import {getNotifications} from 'action';
import {palette} from 'constants/theme';
import {connect} from 'react-redux';

const Item = (props) => {
  const {message, amount} = props;
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      style={{paddingTop: 14, paddingBottom: 16, paddingHorizontal: 18}}>
      <Text
        fontFamily="Hurme Geometric Sans 2"
        fontSize={14}
        fontWeight="600"
        style={{color: '#525C6B'}}>
        {message}
      </Text>
      {amount && (
        <Text color="primary" fontSize={18}>
          {commaFormatter(amount)}
        </Text>
      )}
    </Box>
  );
};

export const NotificationModalList = ({closeModal, getNotifications}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // const [pure, setPure] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [max, setMax] = useState(false);

  const _renderFooter = useCallback(() => {
    if (!loadingMore) return null;
    return (
      <Box marginVertical="m">
        <ActivityIndicator color={palette.blue} />
      </Box>
    );
  }, [loadingMore]);

  const _handleLoadMore = useCallback(async () => {
    // console.log(`[_handleLoadMore]:${max}, page: ${currentPage}`);
    try {
      if (max) return;
      setLoadingMore(true);

      await getNotifications(currentPage).then((data) => {
        const {
          // eslint-disable-next-line no-shadow
          currentPage: pureCurrentPage,
          notifications,
          // totalNotifications,
          totalPages,
        } = data;
        setMax(pureCurrentPage == totalPages);
        setCurrentPage(Number(pureCurrentPage) + 1);
        if (!notifications || notifications.length === 0) return;
        setData([...data, ...purgeData(notifications)]);
        // setPure([...pure, ...notifications]);
      });
    } catch (error) {
      console.log({error});
    } finally {
      setLoadingMore(false);
    }
  }, [currentPage, getNotifications, max]);

  useEffect(() => {
    console.log('na you be the bastard');
    const initPage = 1;
    (async () => {
      try {
        await getNotifications(initPage).then((data) => {
          const {
            // eslint-disable-next-line no-shadow
            currentPage,
            notifications,
            // totalNotifications,
            totalPages,
          } = data;
          console.log({totalPages});
          setMax(currentPage == totalPages);
          setCurrentPage(Number(currentPage) + 1);
          setData(purgeData(notifications));
          // setPure(notifications);
        });
      } catch (error) {
        console.log({error});
      } finally {
        setLoading(false);
      }
    })();
  }, [getNotifications]);
  console.log('omo');

  return (
    <Box
      backgroundColor="white"
      borderRadius={38}
      padding="l"
      height="75%"
      style={{paddingHorizontal: 15}}>
      <Close onPress={closeModal} />

      <Text
        fontWeight="600"
        color="primary"
        textAlign="center"
        marginBottom="l">
        Notifications
      </Text>

      {loading ? (
        <Loading />
      ) : data.length == 0 ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text
            textAlign="center"
            color="primary"
            fontSize={14}
            fontWeight="600">
            {"There's no notifications. Use our services more\n😭😭😭"}
          </Text>
        </Box>
      ) : (
        <SectionList
          sections={data}
          keyExtractor={(item, index) => uuid()}
          renderItem={({item}) => <Item {...item} />}
          renderSectionHeader={({section: {title}}) => (
            <HeaderInfo
              text={String(title).toUpperCase()}
              containerProps={{backgroundColor: 'mostBgPure'}}
            />
          )}
          ListFooterComponent={_renderFooter}
          ItemSeparatorComponent={() => (
            <Divider style={{marginHorizontal: 18}} />
          )}
          onEndReached={_handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      )}
    </Box>
  );
};

export const NotificationModal = connect(null, {getNotifications})(
  NotificationModalList,
);
