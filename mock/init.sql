-- TEST MOUNT FILE
-- TEST INIT

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INTEGER
);

INSERT INTO students (name, age) VALUES
  ('Mkyong', 40),
  ('Ali', 28),
  ('Teoh', 18);
