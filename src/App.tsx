import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { FormControl, makeStyles, TextField } from '@material-ui/core';

import Header from './Header';
import PlayerCard from './PlayerCard';

import { Event, SortOrder, SortType, Tradeable } from './models';

import * as eventResponse from './nba_event.json';

const sortTypes: { [key: string]: SortType } = {
  projected: 'projected_live',
  scored: 'scored',
  price: 'price',
};

const sortOrderTypes: { [key: string]: SortOrder } = {
  asc: 'asc',
  desc: 'desc',
};

const App: FunctionComponent = () => {
  const [event, setEvent] = useState<Event>(eventResponse.event);
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<SortType>(sortTypes.projected);
  const [sortOrder, setSortOrder] = useState<SortOrder>(sortOrderTypes.asc);

  const classes = useStyles();

  useEffect(() => {
    const sorted =
      sortOrder === sortOrderTypes.desc
        ? event.tradeables.sort(
            (a: Tradeable, b: Tradeable) => b.rank[sort] - a.rank[sort],
          )
        : event.tradeables.sort(
            (a: Tradeable, b: Tradeable) => a.rank[sort] - b.rank[sort],
          );
    setEvent((prevState) => ({
      ...prevState,
      tradeables: sorted,
    }));
  }, [sort, sortOrder, event.tradeables]);

  const playerList = (event: Event, query: string): Tradeable[] => {
    const { tradeables } = event;

    return !query
      ? tradeables
      : tradeables.filter((player: Tradeable) =>
          player.entity.name.toLowerCase().includes(query.toLowerCase()),
        );
  };

  return (
    <Fragment>
      <Header pageName={event ? event.name : ''} />
      <div className={classes.tradesContainer}>
        <div className={classes.searchContainer}>
          <FormControl>
            <TextField
              className={classes.searchBar}
              value={query}
              placeholder="Search for a Player..."
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              label="Search"
              type="search"
              onChange={(e) => setQuery(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <TextField
              select
              label="Sort By"
              variant="outlined"
              SelectProps={{
                native: true,
              }}
              value={sort}
              onChange={(e) => setSort(e.target.value as SortType)}
            >
              <option value={sortTypes.projected}>Projected Points</option>
              <option value={sortTypes.scored}>Actual Points</option>
              <option value={sortTypes.price}>Estimated Price</option>
            </TextField>
          </FormControl>
          <FormControl>
            <TextField
              select
              label="Order By"
              variant="outlined"
              SelectProps={{
                native: true,
              }}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            >
              <option value={sortOrderTypes.asc}>Ascending</option>
              <option value={sortOrderTypes.desc}>Descending</option>
            </TextField>
          </FormControl>
        </div>

        <div className={classes.playersContainer}>
          {playerList(event, query).map((player: Tradeable) => (
            <PlayerCard
              key={player.id}
              player={player}
              sort={sort}
            ></PlayerCard>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
const useStyles = makeStyles({
  root: {},
  tradesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 12,
  },
  searchBar: {
    width: 372,
    backgroundColor: 'white',
  },
  playersContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default App;
