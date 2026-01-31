import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";

function Movie({ year, title, summary, poster, genres }) {
  return (
    <div className="movie">
      <img src={poster} alt={title} title={title} />
      <div className="movie__data">
        <h3 className="movie__title">{title}</h3>
        <h5 className="movie__year">{year}</h5>

        <ul className="movie__genres">
          {/* genres가 없을 경우를 대비해 ?. (옵셔널 체이닝) 사용 */}
          {genres?.map((genre, index) => (
            <li key={index} className="genres__genre">
              {genre}
            </li>
          ))}
        </ul>

        {/* 핵심 수정: summary가 있을 때만 slice를 실행하도록 보호 */}
        <p className="movie__summary">
          {summary ? summary.slice(0, 180) : "No summary available"}...
        </p>
      </div>
    </div>
  );
}

Movie.propTypes = {
  // id는 props로 받아오지만 현재 출력에 사용하지 않으므로 체크만 유지
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
