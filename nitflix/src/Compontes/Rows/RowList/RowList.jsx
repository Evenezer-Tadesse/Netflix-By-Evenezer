import React from "react";
import Row from "../row/Row";
import "./RowList.css";

const RowList = () => {
  const rowData = [
    {
      title: "Netflix Originals",
      fetchUrl: "/discover/tv?with_networks=213",
      isLargeRow: true,
    },
    {
      title: "Trending Now",
      fetchUrl: "/trending/all/week",
    },
    {
      title: "Top Rated",
      fetchUrl: "/movie/top_rated",
    },
    {
      title: "Action Movies",
      fetchUrl: "/discover/movie?with_genres=28",
    },
    {
      title: "Comedy Movies",
      fetchUrl: "/discover/movie?with_genres=35",
    },
    {
      title: "Horror Movies",
      fetchUrl: "/discover/movie?with_genres=27",
    },
    {
      title: "Romance Movies",
      fetchUrl: "/discover/movie?with_genres=10749",
    },
    {
      title: "Documentaries",
      fetchUrl: "/discover/movie?with_genres=99",
    },
  ];

  return (
    <div className="rowList">
      {rowData.map((row, index) => (
        <Row
          key={index}
          title={row.title}
          fetchUrl={row.fetchUrl}
          isLargeRow={row.isLargeRow || false}
        />
      ))}
    </div>
  );
};

export default RowList;
