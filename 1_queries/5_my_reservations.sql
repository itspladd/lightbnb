SELECT res.*, prop.*, AVG(revs.rating) AS average_rating
FROM reservations AS res
JOIN properties AS prop ON res.property_id = prop.id
JOIN property_reviews AS revs ON revs.property_id = prop.id
WHERE res.guest_id = 1
  AND res.end_date < now()::date
GROUP BY res.id, prop.id
ORDER BY res.start_date DESC
LIMIT 10;