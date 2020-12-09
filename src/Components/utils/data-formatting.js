import formatDistance from 'date-fns/formatDistance';

export const formatCreatedAt = (data, baseDate = new Date()) => {
  return data.map((item) => {
    const postedTime = item.created_at;
    const dist = formatDistance(new Date(postedTime), new Date(baseDate), {
      includeSeconds: true,
      addSuffix: true,
    });
    const formattedDist = dist.replace(/about |over |almost /, '');
    const newObject = { ...item, since_posted: formattedDist };
    return newObject;
  });
};
