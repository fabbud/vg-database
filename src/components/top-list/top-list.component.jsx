import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './top-list.styles.scss';

import TopListItem from '../top-list-item/top-list-item.component';
import Spinner from '../spinner/spinner.component';
import SectionHeader from '../section-header/section-header.component';

import { fetchTopGamesStart, fetchTopOfTheYearStart, fetchTopOf2018Start } from '../../redux/best-games/best-games.actions';

import { 
  selectTop100, 
  selectBestOfTheYear, 
  selectBestOf2018, 
  selectBestGamesFetchingStatus } from '../../redux/best-games/best-games.selectors';

const TopList = ({ top100, top2018, topYear, loading, fetchTopGamesStart, fetchTopOf2018Start, fetchTopOfTheYearStart, match }) => {
  useEffect(() => {
    if (match.path === '/top/oftheyear') fetchTopOfTheYearStart();
    if (match.path === '/top') fetchTopGamesStart();
    if (match.path === '/top/2018') fetchTopOf2018Start();
  }, [fetchTopGamesStart, fetchTopOfTheYearStart, fetchTopOf2018Start, match.path])

  let array = [];
  if (match.path === '/top') array = top100;
  if (match.path === '/top/oftheyear') array = topYear;
  if (match.path === '/top/2018') array = top2018;

  return (
    <div className='top-list'>
      <div className='top-list__image-wrapper'>
        <div className='game-overview__title-wrapper'>
          <SectionHeader>Top 100 Games of all time</SectionHeader>
        </div>
      </div>
      <div>
        {
          loading ? <Spinner /> : array.map((game, index) => <TopListItem key={game.id} game={game} index={index} />)
        }
      </div>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  fetchTopGamesStart: () => dispatch(fetchTopGamesStart()),
  fetchTopOfTheYearStart: () => dispatch(fetchTopOfTheYearStart()),
  fetchTopOf2018Start: () => dispatch(fetchTopOf2018Start())
})

const mapStateToProps = createStructuredSelector({
  top100: selectTop100,
  topYear: selectBestOfTheYear,
  top2018: selectBestOf2018,
  loading: selectBestGamesFetchingStatus
})

export default connect(mapStateToProps, mapDispatchToProps)(TopList);