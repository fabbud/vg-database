import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './content.styles.scss';

import MainContent from '../../pages/main-content/main-content.component';
import AllGamesPage from '../../pages/all-games/all-games.component';
import GameOverviewPage from '../../pages/game-overview/game-overview.component';

import { fetchTrendingStart } from '../../redux/trending/trending.actions';

const Content = ({ fetchTrendingStart }) => {
  useEffect(() => {
    fetchTrendingStart();
  }, [fetchTrendingStart]);

  return (
    <div className='content'>
      <Switch>
        <Route exact path='/' component={MainContent} />
        <Route exact path='/games' component={AllGamesPage} />
        <Route path='/games/:slug' component={GameOverviewPage} />
      </Switch>
    </div>
  )
};

const mapDispatchToProps = dispath => ({
  fetchTrendingStart: () => dispath(fetchTrendingStart())
})

export default connect(null, mapDispatchToProps)(Content);
