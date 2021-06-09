import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import { SortType, Tradeable } from './models';

type PlayerCardProps = {
  player: Tradeable;
  sort: SortType;
};

const PlayerCard: FunctionComponent<PlayerCardProps> = ({ player, sort }) => {
  const classes = useStyles();

  const formatVal = (val: number | undefined) =>
    Number(val ? val : 0).toFixed(2);

  return (
    <Card className={classes.root} raised>
      <div className={classes.rank}>
        <Typography className={classes.rankVal} variant="subtitle2">
          {player.rank[sort]}
        </Typography>
      </div>
      <CardMedia
        className={classes.media}
        image={player.entity.image_url}
        title={`Picture of ${player.entity.name}`}
      />
      <CardContent className={classes.cardInnerContainer}>
        <div>
          <Typography
            className={classes.playerName}
            variant="subtitle2"
            display="inline"
          >
            {player.entity.name}
          </Typography>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            display="inline"
          >
            {player.entity.position}
          </Typography>
        </div>
        <Typography variant="subtitle2" color="textSecondary">
          {player.entity.current_team}
        </Typography>
        <div className={classes.scores}>
          <div>
            <Typography variant="subtitle2" display="inline">
              {formatVal(player.points.projected_live)}
            </Typography>
            <Typography
              className={classes.pointLabel}
              variant="subtitle2"
              color="textSecondary"
              display="inline"
            >
              PROJ
            </Typography>
          </div>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            display="inline"
          >
            -
          </Typography>
          <div>
            <Typography variant="subtitle2" display="inline">
              {formatVal(player.points.scored)}
            </Typography>
            <Typography
              className={classes.pointLabel}
              variant="subtitle2"
              color="textSecondary"
              display="inline"
            >
              SCOR
            </Typography>
          </div>
        </div>
      </CardContent>
      <div className={classes.price}>
        <Button size="small" color="primary" variant="contained">
          ${formatVal(player.price.estimated)}
        </Button>
        <div className={classes.priceMeta}>
          <div>
            <Typography variant="subtitle2">
              ${formatVal(player.price.bid)}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              BID
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle2">
              ${formatVal(player.price.ask)}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              ASK
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  );
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 12,
    width: 650,
  },
  rank: {
    position: 'absolute',
    height: 28,
    width: 28,
    margin: 2,
    borderRadius: '50%',
    color: 'white',
    backgroundColor: 'black',
    opacity: 0.7,
    textAlign: 'center',
  },
  rankVal: {
    verticalAlign: 'middle',
    lineHeight: 2,
  },
  media: {
    height: 100,
    width: 100,
    borderRadius: '50%',
  },
  cardInnerContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  playerName: {
    marginRight: 4,
  },
  scores: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 176,
  },
  pointLabel: {
    marginLeft: 4,
  },
  price: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 124,
    padding: 12,
  },
  priceMeta: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 'inherit',
    textAlign: 'center',
    margin: 0,
  },
});

export default PlayerCard;
