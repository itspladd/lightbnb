SELECT properties.id, properties.title, cost_per_night, AVG(revs.rating) AS average_rating
FROM properties
JOIN property_reviews AS revs
ON properties.id = revs.property_id
WHERE city LIKE '%ancouv%'
GROUP BY properties.id
HAVING AVG(revs.rating) >= 4
ORDER BY cost_per_night ASC
LIMIT 10;