CREATE TABLE IF NOT EXISTS universities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  degree_level TEXT NOT NULL,
  min_gpa NUMERIC(2,1) NOT NULL,
  min_ielts NUMERIC(2,1) NOT NULL,
  tuition_fee INTEGER NOT NULL
);

INSERT INTO universities (name, country, degree_level, min_gpa, min_ielts, tuition_fee) VALUES
('MIT', 'USA', 'Masters', 3.5, 7.0, 30000),
('University of Toronto', 'Canada', 'Masters', 3.2, 6.5, 25000),
('Stanford University', 'USA', 'Masters', 3.6, 7.5, 32000),
('Harvard University', 'USA', 'Masters', 3.5, 7.0, 31000),
('University of British Columbia', 'Canada', 'Masters', 3.0, 6.5, 22000),
('University of Waterloo', 'Canada', 'Bachelors', 3.0, 6.0, 18000),
('University of Oxford', 'UK', 'Masters', 3.7, 7.5, 35000),
('University of Cambridge', 'UK', 'Masters', 3.7, 7.5, 34000),
('Imperial College London', 'UK', 'Masters', 3.5, 7.0, 33000),
('University College London', 'UK', 'Bachelors', 3.2, 6.5, 28000),
('Australian National University', 'Australia', 'Masters', 3.1, 6.5, 26000),
('University of Melbourne', 'Australia', 'Masters', 3.2, 6.5, 27000),
('University of Sydney', 'Australia', 'Bachelors', 3.0, 6.0, 24000),
('Technical University of Munich', 'Germany', 'Masters', 2.8, 6.5, 15000),
('RWTH Aachen University', 'Germany', 'Masters', 2.9, 6.5, 14000),
('ETH Zurich', 'Switzerland', 'Masters', 3.6, 7.0, 20000),
('National University of Singapore', 'Singapore', 'Masters', 3.4, 7.0, 29000),
('Nanyang Technological University', 'Singapore', 'Bachelors', 3.1, 6.5, 26000),
('University of Tokyo', 'Japan', 'Masters', 3.3, 6.5, 21000),
('Seoul National University', 'South Korea', 'Masters', 3.2, 6.5, 19000);


CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  university_id INT REFERENCES universities(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  gpa FLOAT NOT NULL,
  ielts FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);