/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  Divider, IconButton, List, ListItem, ListItemText, Toolbar, Typography,
} from '@material-ui/core';
import FilterDrawer from 'material-ui-shell/lib/components/FilterDrawer';
import FilterList from '@material-ui/icons/FilterList';
import Page from 'material-ui-shell/lib/containers/Page';
import React, { useEffect, useCallback, useState } from 'react';
import SearchField from 'material-ui-shell/lib/components/SearchField';
import { FixedSizeList } from 'react-window';
import { Scrollbars } from 'react-custom-scrollbars';
import { useFilter } from 'material-ui-shell/lib/providers/Filter';
import { useIntl } from 'react-intl';
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme';
import { useDispatch, useSelector } from 'react-redux';

import {
  getInvitationsThunk,
} from '../../store/slices/featuresSlice';

const filterName = 'test_filter';

const CustomScrollbars = ({
  onScroll, forwardedRef, style, children,
}) => {
  const { isRTL } = useAppTheme();
  const refSetter = useCallback((scrollbarsRef) => {
    if (scrollbarsRef) {
      forwardedRef(scrollbarsRef.view);
    } else {
      forwardedRef(null);
    }
  }, []);
  return (
    <Scrollbars
      ref={refSetter}
      renderView={(props) => (
        isRTL ? (
          <div
            {...props}
            style={{
              ...props.style,
              marginLeft: props.style.marginRight,
              marginRight: 0,
            }}
          />
        ) : (
          <div
            {...props}
            style={{ ...props.style }}
          />
        )
      )}
      // style={{ ...style, overflow: 'hidden' }}
      style={{ ...style, overflow: 'hidden', direction: isRTL ? 'rtl' : 'ltr' }} // james - test code should fix native scrollbars in demofilter and maybe in RMW demos,
      onScroll={onScroll}
    >
      {children}
    </Scrollbars>
  );
};

const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
));

const FilterDemo = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const {
    openFilter, getList, getFilter, setSearch,
  } = useFilter();
  const { invitationsList } = useSelector((state) => state.features);
  const [source, setSource] = useState([]);

  useEffect(async () => {
    await dispatch(getInvitationsThunk());
  }, []);

  useEffect(() => {
    setSource(invitationsList);
  }, [invitationsList]);

  const { queries = [], search = {} } = getFilter(filterName);
  const { value: searchValue = '' } = search;

  const fields = [
    {
      name: 'name',
      label: 'Name',
    },
    {
      name: 'last_name',
      label: 'Last Name',
    },
    {
      name: 'plate',
      label: 'Plate',
    },
    // {
    //   name: 'isActive',
    //   label: 'Active',
    // },
    // {
    //   name: 'registered',
    //   label: 'Registered',
    //   type: 'date',
    // },
    // {
    //   name: 'registrationTime',
    //   label: 'Registration time',
    //   type: 'time',
    // },
  ];

  const list = getList(filterName, source, fields);

  const listRef = React.createRef();

  console.log('LIST', list);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(1500, 'center');
    }
  }, [listRef]);

  const Row = ({ index, style }) => {
    const {
      name, last_name, patent,
    } = list[index].contact;
    return (
      <div key={`${name}_${index}`} style={style}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={`${name} ${index}`}
            secondary={(
              <>
                <Typography
                  component="span"
                  variant="body2"
                  color="textSecondary"
                >
                  {last_name}
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="body2"
                  color="textSecondary"
                >
                  {`${patent}`}
                </Typography>
              </>
            )}
          />
        </ListItem>
        <Divider />
      </div>
    );
  };

  return (
    <Page
      pageTitle={intl.formatMessage(
        {
          id: 'filter_demo',
          defaultMessage: 'Filter demo with {count} rows',
        },
        { count: list.length },
      )}
      contentStyle={{ overflow: 'hidden' }}
      appBarContent={(
        <Toolbar disableGutters>
          <SearchField
            initialValue={searchValue}
            onChange={(v) => {
              setSearch(filterName, v);
            }}
          />
          <IconButton color="inherit" onClick={() => openFilter(filterName)}>
            <FilterList color={queries.length > 0 ? 'secondary' : undefined} />
          </IconButton>
        </Toolbar>
      )}
    >
      <AutoSizer style={{ height: '100%', width: '100%' }}>
        {({ height, width }) => (
          <List disablePadding>
            <FixedSizeList
              className="List"
              ref={listRef}
              height={height}
              itemCount={list.length}
              itemSize={91}
              width={width}
              outerElementType={CustomScrollbarsVirtualList}
            >
              {Row}
            </FixedSizeList>
          </List>
        )}
      </AutoSizer>
      <FilterDrawer fields={fields} name={filterName} />
    </Page>
  );
};

export default FilterDemo;
