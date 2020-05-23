import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from 'react-infinite-scroll-component';

import './genre-games.styles.scss';

import { fetchGenreGamesStart, fetchMoreGenreGamesStart, resetGames } from '../../redux/all-games/all-games.actions';
import { fetchExactGenreStart } from '../../redux/genres/genres.actions';
import { selectGenreGamesCollection } from '../../redux/all-games/all-games.selectors';
import { selectExactGenre } from '../../redux/genres/genres.selectors';

import Spinner from '../spinner/spinner.component';
import GamePreviewItem from '../game-preview-item/game-preview-item.component';
import SectionHeader from '../section-header/section-header.component';

const GenreGames = ({ match, genre, fetchGenre, fetchGenreGames, genreGames, fetchMore, reset }) => {
  const [page, changePage] = useState(2);

  const fetchMoreGenreGames = () => {
    changePage(page => page + 1);
    return fetchMore({genre: match.params.slug, page: page});
  }

  useEffect(() => {
    fetchGenre(match.params.slug);
    fetchGenreGames(match.params.slug);
    return () => reset();
  }, [fetchGenre, fetchGenreGames, match.params.slug, reset]);

  return (
    genre && genreGames ? 
    <div>
      <div className='genre-info'>
        <SectionHeader className='genre-info__title'>{genre.name}</SectionHeader>
        <p className='genre-info__description' dangerouslySetInnerHTML={{ __html: genre.description }}></p>
      </div>
      <div className='genre-games'>
        <InfiniteScroll
          className='genre-games__infinity-scroll'
          style={{overflow: 'hidden'}}
          dataLength={genreGames.length}
          next={fetchMoreGenreGames}
          hasMore={page < 20 ? true : false}
          loader={<Spinner />}
        >
          {
            genreGames.map(game => <GamePreviewItem key={game.id} game={game} />)
          }
        </InfiniteScroll>
      </div>
    </div>
    : <Spinner />
  )
}

const mapStateToProps = createStructuredSelector({
  genre: selectExactGenre,
  genreGames: selectGenreGamesCollection
})

const mapDispatchToProps = dispatch => ({
  fetchGenre: slug => dispatch(fetchExactGenreStart(slug)),
  fetchGenreGames: slug => dispatch(fetchGenreGamesStart(slug)),
  fetchMore: data => dispatch(fetchMoreGenreGamesStart(data)),
  reset: () => dispatch(resetGames())
})

export default connect(mapStateToProps, mapDispatchToProps)(GenreGames);