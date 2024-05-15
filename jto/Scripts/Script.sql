begin transaction;
-- Create table for storing user information
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table for storing phishing events
CREATE TABLE phishing_events (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    affected_brand VARCHAR(255) NOT NULL,
    description TEXT CHECK (LENGTH(description) <= 1500),
    malicious_url VARCHAR(255) NOT NULL,
    domain_registration_date DATE,
    status VARCHAR(20) CHECK (status IN ('todo', 'in progress', 'done')),
    created_by INTEGER NOT NULL,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

-- Create table for storing DNS records associated with phishing events
CREATE TABLE dns_records (
    dns_id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL,
    record_type VARCHAR(10) CHECK (record_type IN ('A', 'NS', 'MX')),
    record_value VARCHAR(255) NOT NULL,
    FOREIGN KEY (event_id) REFERENCES phishing_events(event_id)
);

-- Create table for storing keywords associated with phishing events
CREATE TABLE event_keywords (
    keyword_id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL,
    keyword VARCHAR(255) NOT NULL,
    FOREIGN KEY (event_id) REFERENCES phishing_events(event_id)
);

-- Create table for storing comments on phishing events
CREATE TABLE event_comments (
    comment_id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL,
    FOREIGN KEY (event_id) REFERENCES phishing_events(event_id),
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

-- Indexes to speed up searches
CREATE INDEX idx_event_name ON phishing_events(name);
CREATE INDEX idx_event_brand ON phishing_events(affected_brand);
CREATE INDEX idx_event_url ON phishing_events(malicious_url);
CREATE INDEX idx_event_status ON phishing_events(status);
CREATE INDEX idx_keyword ON event_keywords(keyword);

-- Function to update edited_at timestamp on comment update
CREATE OR REPLACE FUNCTION update_edited_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.edited_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update edited_at on comment update
CREATE TRIGGER update_edited_at BEFORE UPDATE
ON event_comments FOR EACH ROW EXECUTE FUNCTION update_edited_at_column();

-- insert into users
INSERT INTO users (name, surname, email, password_hash) VALUES
('Ivo', 'Ivić', 'ivo.ivic@example.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36p9bfkPaO.hf8kkXtcW5iG'), -- password: "password123"
('Ana', 'Anić', 'ana.anic@example.com', '$2a$10$7S4Px8hOfBZcFqTxDp3TeOaV4EFv.Xde9uY2QF5wX3SmD0/hZr6C2'), -- password: "password456"
('Marija', 'Marić', 'marija.maric@example.com', '$2a$10$CwTycUXWue0Thq9StjUM0u/8Kq8XW6cT/M6wGAeWsqe/SF/oZH2Oi'), -- password: "password789"
('Pero', 'Matišić', 'pero.matisic@example.com', '$2a$10$wNq/8d0W8/Y4R7O/5KJkP.k5lAeZy5wrz7K7Vs7p7vSyYTrh2B.vG'); -- password: "password101"

-- insert into events
INSERT INTO phishing_events (name, affected_brand, description, malicious_url, domain_registration_date, status, created_by) VALUES
('Prvi napadd', 'BrandA', 'This is a description of the first phishing attack.', 'http://malicious1.com', '2023-04-01', 'todo', 1),
('Phishing Attack 2', 'BrandB', 'This is a description of the second phishing attack.', 'http://malicious2.com', '2023-04-02', 'in progress', 2),
('Phishing Attack 3', 'BrandC', 'This is a description of the third phishing attack.', 'http://malicious3.com', '2023-04-03', 'done', 3),
('Phishing Attack 4', 'BrandD', 'This is a description of the fourth phishing attack.', 'http://malicious4.com', '2023-04-04', 'todo', 4);

-- insert into dns_records
INSERT INTO dns_records (event_id, record_type, record_value) VALUES
(1, 'A', '192.168.1.1'),
(1, 'NS', 'ns1.malicious1.com'),
(1, 'MX', 'mail.malicious1.com'),
(2, 'A', '192.168.1.2'),
(2, 'NS', 'ns1.malicious2.com'),
(2, 'MX', 'mail.malicious2.com'),
(3, 'A', '192.168.1.3'),
(3, 'NS', 'ns1.malicious3.com'),
(3, 'MX', 'mail.malicious3.com'),
(4, 'A', '192.168.1.4'),
(4, 'NS', 'ns1.malicious4.com'),
(4, 'MX', 'mail.malicious4.com');

-- insert into event_keywords
INSERT INTO event_keywords (event_id, keyword) VALUES
(1, 'brand1'),
(1, 'product1'),
(2, 'brand2'),
(2, 'product2'),
(3, 'brand3'),
(3, 'product3'),
(4, 'brand4'),
(4, 'product4');

-- insert into event_comments
INSERT INTO event_comments (event_id, comment, created_by) VALUES
(1, 'This is the first comment on the first phishing attack.', 1),
(1, 'This is the second comment on the first phishing attack.', 2),
(2, 'This is the first comment on the second phishing attack.', 3),
(2, 'This is the second comment on the second phishing attack.', 4),
(3, 'This is the first comment on the third phishing attack.', 1),
(3, 'This is the second comment on the third phishing attack.', 2),
(4, 'This is the first comment on the fourth phishing attack.', 3),
(4, 'This is the second comment on the fourth phishing attack.', 4);

commit;

select * FROM phishing_events;

:
ALTER TABLE users ADD COLUMN password_reset_token VARCHAR(255);