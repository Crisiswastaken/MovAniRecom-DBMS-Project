-- ===================================
-- Sample Data for Movie/Anime Logger
-- ===================================

USE movie_anime_logger;

-- ===================================
-- INSERT GENRES
-- ===================================
INSERT INTO genres (name) VALUES
('Action'),
('Adventure'),
('Romance'),
('Comedy'),
('Drama'),
('Thriller'),
('Horror'),
('Sci-Fi'),
('Fantasy'),
('Mystery'),
('Anime');

-- ===================================
-- INSERT SAMPLE SHOWS (Movies & Anime)
-- ===================================

-- Anime Shows
INSERT INTO shows (title, description, genre_id, release_year, image_url) VALUES
('Demon Slayer: Kimetsu no Yaiba', 'A young boy becomes a demon slayer after his family is slaughtered and his sister is turned into a demon.', 11, 2019, 'https://via.placeholder.com/300x450?text=Demon+Slayer'),
('Attack on Titan', 'Humanity fights for survival against giant humanoid creatures called Titans that devour humans.', 11, 2013, 'https://via.placeholder.com/300x450?text=Attack+on+Titan'),
('My Hero Academia', 'In a world where most people have superpowers, a powerless boy enrolls in a prestigious hero academy.', 11, 2016, 'https://via.placeholder.com/300x450?text=My+Hero+Academia'),
('Death Note', 'A high school student discovers a supernatural notebook that allows him to kill anyone by writing their name.', 11, 2006, 'https://via.placeholder.com/300x450?text=Death+Note'),
('Naruto', 'A young ninja seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.', 11, 2002, 'https://via.placeholder.com/300x450?text=Naruto'),
('One Piece', 'A young pirate sets out on an adventure to find the legendary treasure One Piece and become the Pirate King.', 11, 1999, 'https://via.placeholder.com/300x450?text=One+Piece'),
('Fullmetal Alchemist: Brotherhood', 'Two brothers search for the Philosophers Stone to restore their bodies after a failed alchemical experiment.', 11, 2009, 'https://via.placeholder.com/300x450?text=FMA+Brotherhood'),
('Sword Art Online', 'Players are trapped in a virtual reality MMORPG where dying in the game means dying in real life.', 11, 2012, 'https://via.placeholder.com/300x450?text=Sword+Art+Online'),
('Tokyo Ghoul', 'A college student is transformed into a half-ghoul and must navigate between human and ghoul societies.', 11, 2014, 'https://via.placeholder.com/300x450?text=Tokyo+Ghoul'),
('Steins;Gate', 'A group of friends discover a way to send messages to the past, leading to dangerous consequences.', 11, 2011, 'https://via.placeholder.com/300x450?text=Steins+Gate');

-- Action Movies
INSERT INTO shows (title, description, genre_id, release_year, image_url) VALUES
('John Wick', 'An ex-hitman comes out of retirement to track down the gangsters that killed his dog.', 1, 2014, 'https://via.placeholder.com/300x450?text=John+Wick'),
('The Dark Knight', 'Batman must accept one of the greatest psychological and physical tests to fight injustice.', 1, 2008, 'https://via.placeholder.com/300x450?text=The+Dark+Knight'),
('Mad Max: Fury Road', 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland.', 1, 2015, 'https://via.placeholder.com/300x450?text=Mad+Max'),
('Avengers: Endgame', 'The Avengers assemble once more to reverse the damage caused by Thanos.', 1, 2019, 'https://via.placeholder.com/300x450?text=Avengers+Endgame'),
('The Matrix', 'A hacker discovers reality is a computer simulation and joins a rebellion against the machines.', 1, 1999, 'https://via.placeholder.com/300x450?text=The+Matrix');

-- Thriller Movies
INSERT INTO shows (title, description, genre_id, release_year, image_url) VALUES
('Inception', 'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.', 6, 2010, 'https://via.placeholder.com/300x450?text=Inception'),
('Se7en', 'Two detectives hunt a serial killer who uses the seven deadly sins as his motives.', 6, 1995, 'https://via.placeholder.com/300x450?text=Se7en'),
('Gone Girl', 'A woman mysteriously disappears on her fifth wedding anniversary, and her husband becomes the prime suspect.', 6, 2014, 'https://via.placeholder.com/300x450?text=Gone+Girl'),
('Shutter Island', 'A U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.', 6, 2010, 'https://via.placeholder.com/300x450?text=Shutter+Island'),
('Parasite', 'A poor family schemes to become employed by a wealthy family and infiltrates their household.', 6, 2019, 'https://via.placeholder.com/300x450?text=Parasite');

-- Sci-Fi Movies
INSERT INTO shows (title, description, genre_id, release_year, image_url) VALUES
('Interstellar', 'A team of explorers travel through a wormhole in space to ensure humanitys survival.', 8, 2014, 'https://via.placeholder.com/300x450?text=Interstellar'),
('Blade Runner 2049', 'A young blade runner unearths a secret that could plunge society into chaos.', 8, 2017, 'https://via.placeholder.com/300x450?text=Blade+Runner+2049'),
('The Martian', 'An astronaut becomes stranded on Mars and must find a way to survive and signal Earth for rescue.', 8, 2015, 'https://via.placeholder.com/300x450?text=The+Martian'),
('Arrival', 'A linguist works with the military to communicate with alien visitors before tensions escalate.', 8, 2016, 'https://via.placeholder.com/300x450?text=Arrival'),
('Ex Machina', 'A programmer is invited to conduct the Turing test on an intelligent humanoid robot.', 8, 2014, 'https://via.placeholder.com/300x450?text=Ex+Machina');

-- Romance Movies
INSERT INTO shows (title, description, genre_id, release_year, image_url) VALUES
('The Notebook', 'A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom.', 3, 2004, 'https://via.placeholder.com/300x450?text=The+Notebook'),
('Titanic', 'A young aristocrat falls in love with a kind artist aboard the luxurious, ill-fated R.M.S. Titanic.', 3, 1997, 'https://via.placeholder.com/300x450?text=Titanic'),
('La La Land', 'A jazz musician and an aspiring actress fall in love while pursuing their dreams in Los Angeles.', 3, 2016, 'https://via.placeholder.com/300x450?text=La+La+Land'),
('Pride and Prejudice', 'Sparks fly when spirited Elizabeth Bennet meets the proud Mr. Darcy in 19th century England.', 3, 2005, 'https://via.placeholder.com/300x450?text=Pride+and+Prejudice'),
('Your Name (Kimi no Na wa)', 'Two teenagers share a mysterious connection, swapping bodies and falling in love across time and space.', 3, 2016, 'https://via.placeholder.com/300x450?text=Your+Name');

-- Drama Movies
INSERT INTO shows (title, description, genre_id, release_year, image_url) VALUES
('The Shawshank Redemption', 'Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency.', 5, 1994, 'https://via.placeholder.com/300x450?text=Shawshank+Redemption'),
('Forrest Gump', 'The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man with an IQ of 75.', 5, 1994, 'https://via.placeholder.com/300x450?text=Forrest+Gump'),
('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.', 5, 1972, 'https://via.placeholder.com/300x450?text=The+Godfather'),
('Schindlers List', 'A German industrialist saves the lives of more than a thousand Jews during the Holocaust.', 5, 1993, 'https://via.placeholder.com/300x450?text=Schindlers+List'),
('12 Years a Slave', 'A free African-American man is kidnapped and sold into slavery in the pre-Civil War United States.', 5, 2013, 'https://via.placeholder.com/300x450?text=12+Years+a+Slave');

-- ===================================
-- DISPLAY SUCCESS MESSAGE
-- ===================================
SELECT 'Sample data inserted successfully!' AS message;
SELECT COUNT(*) as total_shows FROM shows;
SELECT COUNT(*) as total_genres FROM genres;
