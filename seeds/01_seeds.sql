INSERT INTO users (name, email, password)
VALUES ('Trapezius Crushpecs' , 'bloodwar@hemoclobber.clan', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Tautrion Stoneglutes' , 'goddess_king@petalsworn.clan', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Caverno Skullex' , 'bone-flayer@marrowvein.empire', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Vertebros Marrowvein' , 'bone-flayer++@marrowvein.empire', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Skeletron Marrowvein' , 'bone2pick@marrowvein.empire', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code)
VALUES (1, 'Heartflex Hollow', 'description', 'https://i.imgur.com/CyeZOiQ.jpg', 'https://i.imgur.com/CyeZOiQ.jpg', 'Canada', '342 Blood Drive', 'Hemoclobber Enclave', 'Ontario', '123'),
(2, 'Briarthorn Abode', 'description', 'https://i.imgur.com/a4rYMym.png', 'https://i.imgur.com/a4rYMym.png', 'Canada', '10 Vinesprawl Way', 'The Petalsworn Garden-Mausoleum', 'Ontario', '321'),
(3, 'Castle Skullex', 'description', 'https://i.imgur.com/jZ3DUgf.png', 'https://i.imgur.com/jZ3DUgf.png', 'Canada', '1 Osteo Avenue', 'Fracture', 'Montreal', '455'),
(5, 'Marrowveinia', 'description', 'https://starfinderwiki.com/mediawikisf/images/thumb/a/ac/Eox.jpg/250px-Eox.jpg', 'https://starfinderwiki.com/mediawikisf/images/thumb/a/ac/Eox.jpg/800px-Eox.jpg', 'Marrowveinia', '0 Marrowveinia Promenade', 'Marrowveinia City', 'Crania', '111');

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (5 , 2, '2020-03-01', '2020-04-02'),
(5 , 2, '2020-03-04', '2020-04-05'),
(2 , 4, '2020-03-07', '2020-04-03'),
(2 , 1, '2020-03-08', '2020-03-20'),
(4 , 3, '2020-03-09', '2020-04-12'),
(4 , 3, '2020-03-11', '2020-04-15'),
(5 , 4, '2020-03-13', '2020-04-12'),
(1 , 2, '2020-03-14', '2020-04-11'),
(3 , 1, '2020-03-25', '2020-04-05');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 2, 1, 3, 'message'),
(1, 4, 3, 3, 'message'),
(3, 2, 4, 3, 'message'),
(5, 1, 1, 3, 'message'),
(1, 3, 2, 3, 'message'),
(2, 2, 7, 3, 'message'),
(4, 1, 5, 3, 'message');