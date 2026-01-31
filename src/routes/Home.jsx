import "./Home.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "../components/Movie";

const Home = () => {
  // 1. state 선언 (useState 사용)
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  // 2. 데이터 가져오는 함수
  const getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts.bz/api/v2/list_movies.json?sort_by=rating",
    );

    setMovies(movies); // movies 상태 업데이트
    setIsLoading(false); // 로딩 상태 해제
  };

  // 3. 생명주기 관리 (componentDidMount 역할)
  useEffect(() => {
    getMovies();
  }, []); // []는 컴포넌트가 처음 나타날 때(Mount) 딱 한 번만 실행하라는 뜻!

  // 4. 렌더링 (return문)
  return (
    <section className="container">
      {isLoading ? (
        <div className="loader">
          <span className="loader__text">Loading...</span>
        </div>
      ) : (
        <div className="movies">
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              year={movie.year}
              title={movie.title}
              summary={movie.summary}
              poster={movie.medium_cover_image}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
