import "./Home.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "../components/Movie";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  // 1. 검색어 상태 추가
  const [keyword, setKeyword] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // 실제 API에 보낼 검색어

  // 2. getMovies 함수 수정 (searchQuery 인자 추가)
  const getMovies = async (currentPage, query) => {
    setIsLoading(true);
    try {
      // query_term 파arami터를 URL에 포함
      const {
        data: {
          data: { movies },
        },
      } = await axios.get(
        `https://yts.bz/api/v2/list_movies.json?sort_by=rating&limit=6&page=${currentPage}&query_term=${query}`,
      );

      setMovies(movies || []); // 검색 결과가 없을 경우 빈 배열 처리
    } catch (error) {
      console.error("영화 데이터를 가져오는데 실패했습니다.", error);
    }
    setIsLoading(false);
  };

  // 3. 페이지나 검색어가 변경될 때마다 실행
  useEffect(() => {
    getMovies(page, searchQuery);
    window.scrollTo(0, 0);
  }, [page, searchQuery]);

  // 4. 검색 버튼 클릭 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // 검색 시 1페이지부터 보여줌
    setSearchQuery(keyword); // 입력을 완료했을 때만 API 호출을 위해 상태 업데이트
  };

  return (
    <section className="container">
      {isLoading ? (
        <div className="loader">
          <span className="loader__text">Loading (Page {page})...</span>
        </div>
      ) : (
        <div className="main-wrapper">
          {" "}
          {/* 전체를 감싸는 래퍼 추가 */}
          {/* 1. 검색창 영역 (독립) */}
          <div className="search-area">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="영화 제목, 배우, 감독 검색..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                검색
              </button>
            </form>
          </div>
          {/* 2. 영화 리스트 영역 */}
          <div className="movies">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              ))
            ) : (
              <p className="no-results">검색 결과가 없습니다.</p>
            )}
          </div>
          {/* 3. 페이지네이션 영역 (독립) */}
          <div className="pagination-area">
            <div className="pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="page-btn"
              >
                이전
              </button>
              <span className="page-number">{page}</span>
              <button
                disabled={movies.length < 6}
                onClick={() => setPage((prev) => prev + 1)}
                className="page-btn"
              >
                다음
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
