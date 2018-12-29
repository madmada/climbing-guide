import React from 'react';

export const getGrade = (gradesum, votes) => Math.round(votes < 1 ? 0 : (gradesum / votes));

export const getRate = (ratesum, votes) => Math.round(votes < 1 ? 0 : (ratesum / votes));

export const renderRatingStars = (votes) => {
  const emptyStars = 5 - votes;
  const filledStars = votes;
  const stars = [];
  for (let i = 0; i < filledStars; i += 1) {
    stars.push(<span className="fa fa-star" style={{ color: 'orange' }} key={i} />);
  }
  for (let i = filledStars; i < filledStars + emptyStars; i += 1) {
    stars.push(<i className="fa fa-star-o" key={i} />);
  }
  return stars;
};

export const getRegion = (addressComponents) => {
  let region;
  addressComponents.map((component) => { component.types[0]==='administrative_area_level_1' && (region = component.long_name)});
  const str = region.replace(/Województwo /g, '');
  return str;
}

export const timestampToDate = (timestamp) => {
  const newDate = new Date(timestamp);
  const stringDate = newDate.toLocaleDateString('pl-PL');
  return stringDate;
};

export const setDate = (day, month, year) => {
  // new Date() starts counting Month from 0 to 11.
  const newDate = new Date(year, month - 1, day).toLocaleDateString('pl-PL');
  return newDate;
};
