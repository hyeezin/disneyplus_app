import axios from '../api/axios';
import React, { useCallback, useEffect, useState } from 'react'
import "./Row.css";
import MovieModal from './MovieModal';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelection] = useState({});

  const fetchMovieData = useCallback( async () => {
    const response = await axios.get(fetchUrl);
    console.log(response, 'response');
    setMovies(response.data.results);
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelection(movie);
  }

  return (
    <Container>
      <h2>{title}</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // loop 기능을 사용할 것인지
        navigation // arrow 버튼 사용 유무
        pagenation={{ clickable: true}} // 페이지버튼 보이게 할지 
      >
        <Content id={id}>
          {movies.map(movie => (
            <SwiperSlide>
              <Wrap>
                <img 
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.name}
                  onClick={() => handleClick(movie) }
                />
              </Wrap>  
            </SwiperSlide>
          ))}
        </Content>
      </Swiper>
      {modalOpen && 
        <MovieModal 
          {...movieSelected}
          setModalOpen={setModalOpen}
        />
      }
    </Container>
  );
}

export default Row;

const Container = styled.div`
  padding: 0 0 26px;
`;
const Content = styled.div`

`;

const Wrap = styled.div`

`;
