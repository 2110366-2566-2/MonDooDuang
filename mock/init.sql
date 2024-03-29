-- TEST MOUNT FILE
-- TEST INIT

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE gender_enum AS ENUM('MALE', 'FEMALE', 'LGBTQA+', 'NOT_TO_SAY');
CREATE TYPE usertype_enum AS ENUM('CUSTOMER', 'FORTUNE_TELLER');

CREATE TABLE ADMIN (
    admin_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE USER_TABLE (
    user_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    fname VARCHAR(100) NOT NULL,
    lname VARCHAR(100) NOT NULL,
    gender gender_enum NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    birth_date TIMESTAMP NOT NULL,
    profile_picture VARCHAR(300),
    is_banned BOOLEAN NOT NULL DEFAULT FALSE,
    bank_name VARCHAR(100) NOT NULL,
    account_number VARCHAR(100) NOT NULL,
    password VARCHAR(500) NOT NULL,
    user_type usertype_enum NOT NULL,
    CONSTRAINT unique_name_constraint UNIQUE (fname, lname),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE FORTUNE_TELLER (
    fortune_teller_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    description VARCHAR(300),
    identity_card_number VARCHAR(30) NOT NULL,
    stage_name VARCHAR(100) UNIQUE NOT NULL,
    identity_card_copy VARCHAR(300) NOT NULL,
    total_score INTEGER NOT NULL DEFAULT 0,
    total_review INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY(fortune_teller_id) REFERENCES USER_TABLE(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE speciality_enum AS ENUM('TAROT_CARD', 'THAI', 'NUMBER', 'ORACLE', 'RUNES');

CREATE TABLE PACKAGE(
    package_id   CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    speciality  speciality_enum NOT NULL,
    description VARCHAR(500),
    duration    INTEGER  CHECK(duration > 0),
    price       INTEGER  CHECK(price BETWEEN 10 AND 1000000 ),
    fortune_teller_id CHAR(36) NOT NULL,
    FOREIGN KEY(fortune_teller_id) REFERENCES FORTUNE_TELLER(fortune_teller_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CONVERSATION (May be NoSQL)
CREATE TABLE CONVERSATION(
    conversation_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    fortune_teller_id CHAR(36) NOT NULL,
    customer_id CHAR(36) NOT NULL,
    FOREIGN KEY(fortune_teller_id) REFERENCES FORTUNE_TELLER(fortune_teller_id),
    FOREIGN KEY(customer_id) REFERENCES USER_TABLE(user_id),
    CONSTRAINT unique_conversation_constraint UNIQUE (fortune_teller_id, customer_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MESSAGE (May be NoSQL)
CREATE TABLE MESSAGE(
    message_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id CHAR(36) NOT NULL,
    message_text VARCHAR(500) NOT NULL,
    is_read  BOOLEAN NOT NULL DEFAULT FALSE,
    conversation_id CHAR(36) NOT NULL,
    FOREIGN KEY(sender_id) REFERENCES USER_TABLE(user_id),
    FOREIGN KEY(conversation_id) REFERENCES CONVERSATION(conversation_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE appointment_status_enum AS ENUM('CREATED', 'WAITING_FOR_PAYMENT', 'WAITING_FOR_EVENT', 'EVENT_COMPLETED', 'PAYMENT_COMPLETED', 'SUSPENDED', 'REFUNDED', 'NO_PAYMENT_CANCELED', 'FORTUNE_TELLER_CANCELED', 'CUSTOMER_CANCELED', 'NO_FRAUD_DETECTED', 'FORTUNE_TELLER_DECLINED');

CREATE TABLE APPOINTMENT (
    appointment_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    status appointment_status_enum NOT NULL,
    package_id CHAR(36) NOT NULL,
    customer_id CHAR(36) NOT NULL,
    fortune_teller_id CHAR(36) NOT NULL,
    appointment_date TIMESTAMP NOT NULL,
    FOREIGN KEY(package_id) REFERENCES PACKAGE(package_id),
    FOREIGN KEY(customer_id) REFERENCES USER_TABLE(user_id),
    FOREIGN KEY(fortune_teller_id) REFERENCES FORTUNE_TELLER(fortune_teller_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE REVIEW (
    review_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_message VARCHAR(500),
    score INTEGER NOT NULL,
    customer_id CHAR(36) NOT NULL,
    fortune_teller_id CHAR(36) NOT NULL,
    appointment_id CHAR(36) NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES USER_TABLE(user_id),
    FOREIGN KEY(fortune_teller_id) REFERENCES FORTUNE_TELLER(fortune_teller_id),
    FOREIGN KEY(appointment_id) REFERENCES APPOINTMENT(appointment_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE payment_method_enum AS ENUM('BANK', 'CREDIT_CARD', 'PROMPT_PAY');
CREATE TYPE payment_status_enum AS ENUM('FROM_CUSTOMER', 'TO_FORTUNE_TELLER', 'REFUND');

CREATE TABLE PAYMENT(
    payment_id   CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    method payment_method_enum NOT NULL,
    status payment_status_enum NOT NULL,
    amount INTEGER  CHECK(amount BETWEEN 10 AND 1000000 ),
    appointment_id CHAR(36) NOT NULL,
    FOREIGN KEY(appointment_id) REFERENCES APPOINTMENT(appointment_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE report_type_enum AS ENUM ('INAPPROPRIATE_BEHAVIOR','MONEY_SUSPENSION','SYSTEM_ERROR');
CREATE TYPE report_status_enum AS ENUM ('PENDING','COMPLETED');
CREATE TYPE notification_type_enum AS ENUM ('VERIFICATION', 'CANCELED_VERIFICATION', 'CHAT', 'APPOINTMENT', 'HIDDEN');
CREATE TYPE appointment_notification_type_enum AS ENUM ('REMINDER', 'COMPLETE', 'CANCEL', 'NEW', 'ACCEPT', 'DENY');
CREATE TABLE REPORT (
    report_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    description VARCHAR(200) NOT NULL,
    report_type report_type_enum NOT NULL,
    status report_status_enum NOT NULL,
    appointment_id CHAR(36) ,
    reporter_id CHAR(36) NOT NULL,
    reportee_id CHAR(36),
    FOREIGN KEY (reporter_id) REFERENCES USER_TABLE(user_id),
    FOREIGN KEY (reportee_id) REFERENCES USER_TABLE(user_id),
    FOREIGN KEY(appointment_id) REFERENCES APPOINTMENT(appointment_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE NOTIFICATION (
    notification_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id  CHAR(36) NOT NULL,
    type notification_type_enum NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USER_TABLE(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE APPOINTMENT_NOTIFICATION (
    notification_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    type appointment_notification_type_enum NOT NULL,
    appointment_id CHAR(36) NOT NULL,
    FOREIGN KEY (appointment_id) REFERENCES APPOINTMENT(appointment_id),
    FOREIGN KEY (notification_id) REFERENCES NOTIFICATION(notification_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CHAT_NOTIFICATION (
    notification_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id CHAR(36) NOT NULL,
    FOREIGN KEY (conversation_id) REFERENCES CONVERSATION(conversation_id),
    FOREIGN KEY (notification_id) REFERENCES NOTIFICATION(notification_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE request_status_enum AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
CREATE TABLE REQUEST (
    request_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    fortune_teller_id CHAR(36) NOT NULL,
    status request_status_enum NOT NULL,
    FOREIGN KEY(fortune_teller_id) REFERENCES FORTUNE_TELLER(fortune_teller_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER admin_updated_at
BEFORE UPDATE ON ADMIN
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER user_updated_at
BEFORE UPDATE ON USER_TABLE
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER fortune_teller_updated_at
BEFORE UPDATE ON FORTUNE_TELLER
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER package_updated_at
BEFORE UPDATE ON PACKAGE
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER conversation_updated_at
BEFORE UPDATE ON CONVERSATION
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER message_updated_at
BEFORE UPDATE ON MESSAGE
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER appointment_updated_at
BEFORE UPDATE ON APPOINTMENT
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER review_updated_at
BEFORE UPDATE ON REVIEW
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER payment_updated_at
BEFORE UPDATE ON PAYMENT
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER report_updated_at
BEFORE UPDATE ON REPORT
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER notification_updated_at
BEFORE UPDATE ON NOTIFICATION
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER appointment_notification_updated_at
BEFORE UPDATE ON APPOINTMENT_NOTIFICATION
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER chat_notification_updated_at
BEFORE UPDATE ON CHAT_NOTIFICATION
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE FUNCTION notify_new_appointment() RETURNS TRIGGER AS $$
DECLARE
    notification_id UUID;
BEGIN
    notification_id := uuid_generate_v4();
	
    INSERT INTO notification (notification_id, user_id, type)
    VALUES (notification_id, NEW.fortune_teller_id, 'APPOINTMENT');
	
	INSERT INTO appointment_notification (notification_id, type, appointment_id)
	VALUES (notification_id, 'NEW', NEW.appointment_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION notify_accept_appointment() RETURNS TRIGGER AS $$
DECLARE
    notification_id UUID;
BEGIN
    notification_id := uuid_generate_v4();
	
    INSERT INTO notification (notification_id, user_id, type)
    VALUES (notification_id, NEW.customer_id, 'APPOINTMENT');
	
	INSERT INTO appointment_notification (notification_id, type, appointment_id)
	VALUES (notification_id, 'ACCEPT', NEW.appointment_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION notify_deny_appointment() RETURNS TRIGGER AS $$
DECLARE
    notification_id UUID;
BEGIN
    notification_id := uuid_generate_v4();
	
    INSERT INTO notification (notification_id, user_id, type)
    VALUES (notification_id, NEW.customer_id, 'APPOINTMENT');
	
	INSERT INTO appointment_notification (notification_id, type, appointment_id)
	VALUES (notification_id, 'DENY', NEW.appointment_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION notify_fortune_teller_cancel_appointment() RETURNS TRIGGER AS $$
DECLARE
    notification_id UUID;
BEGIN
    notification_id := uuid_generate_v4();
	
    INSERT INTO notification (notification_id, user_id, type)
    VALUES (notification_id, NEW.customer_id, 'APPOINTMENT');
	
	INSERT INTO appointment_notification (notification_id, type, appointment_id)
	VALUES (notification_id, 'CANCEL', NEW.appointment_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION notify_customer_cancel_appointment() RETURNS TRIGGER AS $$
DECLARE
    notification_id UUID;
BEGIN
    notification_id := uuid_generate_v4();
	
    INSERT INTO notification (notification_id, user_id, type)
    VALUES (notification_id, NEW.fortune_teller_id, 'APPOINTMENT');
	
	INSERT INTO appointment_notification (notification_id, type, appointment_id)
	VALUES (notification_id, 'CANCEL', NEW.appointment_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION notify_complete_appointment() RETURNS TRIGGER AS $$
DECLARE
    notification_id UUID;
BEGIN
    notification_id := uuid_generate_v4();
	
    INSERT INTO notification (notification_id, user_id, type)
    VALUES (notification_id, NEW.customer_id, 'APPOINTMENT');
	
	INSERT INTO appointment_notification (notification_id, type, appointment_id)
	VALUES (notification_id, 'COMPLETE', NEW.appointment_id);

    notification_id := uuid_generate_v4();
	
    INSERT INTO notification (notification_id, user_id, type)
    VALUES (notification_id, NEW.fortune_teller_id, 'APPOINTMENT');
	
	INSERT INTO appointment_notification (notification_id, type, appointment_id)
	VALUES (notification_id, 'COMPLETE', NEW.appointment_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER new_appointment_notification
AFTER INSERT ON APPOINTMENT
FOR EACH ROW
WHEN (NEW.status = 'CREATED')
EXECUTE FUNCTION notify_new_appointment();

CREATE OR REPLACE TRIGGER accept_appointment_notification
AFTER UPDATE ON APPOINTMENT
FOR EACH ROW
WHEN (NEW.status = 'WAITING_FOR_PAYMENT')
EXECUTE FUNCTION notify_accept_appointment();

CREATE OR REPLACE TRIGGER deny_appointment_notification
AFTER UPDATE ON APPOINTMENT
FOR EACH ROW
WHEN (NEW.status = 'FORTUNE_TELLER_DECLINED')
EXECUTE FUNCTION notify_deny_appointment();

CREATE OR REPLACE TRIGGER fortune_teller_cancel_appointment_notification
AFTER UPDATE ON APPOINTMENT
FOR EACH ROW
WHEN (NEW.status = 'FORTUNE_TELLER_CANCELED')
EXECUTE FUNCTION notify_fortune_teller_cancel_appointment();

CREATE OR REPLACE TRIGGER customer_appointment_cancel_notification
AFTER UPDATE ON APPOINTMENT
FOR EACH ROW
WHEN (NEW.status = 'CUSTOMER_CANCELED')
EXECUTE FUNCTION notify_customer_cancel_appointment();

CREATE OR REPLACE TRIGGER complete_appointment_notification
AFTER UPDATE ON APPOINTMENT
FOR EACH ROW
WHEN (NEW.status = 'EVENT_COMPLETED')
EXECUTE FUNCTION notify_complete_appointment();

-- ADMIN
INSERT INTO ADMIN (admin_id, email, password)
VALUES
    ('1a32b89f67f245648ad812f5473d98c7', 'admin1@example.com', '$2b$10$OiCIClo3py6zoK5mJUBDZOAV9erDkW8LqjeiJI96gBmyk0D1lb296'),
    ('2c89e0bd16e84a43891f97e7d50d3c4a', 'admin2@example.com', '$2b$10$OiCIClo3py6zoK5mJUBDZOAV9erDkW8LqjeiJI96gBmyk0D1lb296'),
    ('3d4b45f1-d4d7-4b9c-8baa-95e933ac9b5b', 'admin3@example.com', '$2b$10$OiCIClo3py6zoK5mJUBDZOAV9erDkW8LqjeiJI96gBmyk0D1lb296');

-- USER_TABLE
INSERT INTO USER_TABLE (user_id, fname, lname, gender, phone_number, email, birth_date, profile_picture, is_banned, bank_name, account_number, password, user_type)
VALUES
    ('84885c07-43d7-42b8-8919-88263a33fc74', 'John', 'Doe', 'MALE', '1234567890', 'customer1@example.com', '1990-01-15', NULL, FALSE, 'ABC Bank', '123456789', '$2b$10$OiCIClo3py6zoK5mJUBDZOAV9erDkW8LqjeiJI96gBmyk0D1lb296', 'CUSTOMER'),
    ('aad3b8fc-bb5f-46a5-b2c5-541f1f4c6a5b', 'Jane', 'Smith', 'FEMALE', '9876543210', 'customer2@example.com', '1985-05-20', NULL, FALSE, 'XYZ Bank', '987654321', '$2b$10$OiCIClo3py6zoK5mJUBDZOAV9erDkW8LqjeiJI96gBmyk0D1lb296', 'CUSTOMER'),
    ('0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', 'Bob', 'Johnson', 'MALE', '5551234567', 'fortune1@example.com', '1980-11-10', NULL, FALSE, 'PQR Bank', '456789012', '$2b$10$OiCIClo3py6zoK5mJUBDZOAV9erDkW8LqjeiJI96gBmyk0D1lb296', 'FORTUNE_TELLER'),
    ('1e801f2b-f9f0-493e-8a61-c9936e78fb9a', 'Alice', 'Williams', 'FEMALE', '3339876543', 'customer3@example.com', '1995-08-25', NULL, FALSE, 'DEF Bank', '654321098', '$2b$10$OiCIClo3py6zoK5mJUBDZOAV9erDkW8LqjeiJI96gBmyk0D1lb296', 'FORTUNE_TELLER'),
    ('2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', 'Charlie', 'Brown', 'MALE', '1112223333', 'fortune2@example.com', '1975-04-05', NULL, FALSE, 'GHI Bank', '789012345', '$2b$10$OiCIClo3py6zoK5mJUBDZOAV9erDkW8LqjeiJI96gBmyk0D1lb296', 'FORTUNE_TELLER'),
    ('3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', 'Emma', 'Davis', 'FEMALE', '4445556666', 'fortune3@example.com', '1993-12-18', NULL, FALSE, 'JKL Bank', '234567890', '$2b$10$OiCIClo3py6zoK5mJUBDZOAV9erDkW8LqjeiJI96gBmyk0D1lb296', 'CUSTOMER'),
    ('4e4894f4-6524-4937-8b7d-23d45b0e0c75', 'James', 'Miller', 'MALE', '6667778888', 'fortune4@example.com', '1982-09-30', NULL, FALSE, 'MNO Bank', '876543210', '$2b$10$OiCIClo3py6zoK5mJUBDZOAV9erDkW8LqjeiJI96gBmyk0D1lb296', 'FORTUNE_TELLER'),
    ('5f0d68c8-7803-4d25-b80e-13d43a641791', 'Olivia', 'Moore', 'FEMALE', '9990001111', 'customer4@example.com', '1998-06-22', NULL, FALSE, 'PQR Bank', '543210987', '$2b$10$OiCIClo3py6zoK5mJUBDZOAV9erDkW8LqjeiJI96gBmyk0D1lb296', 'CUSTOMER');

-- FORTUNE_TELLER
INSERT INTO FORTUNE_TELLER (fortune_teller_id, is_verified, description, identity_card_number, stage_name, identity_card_copy, total_score, total_review)
VALUES
    ('0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', TRUE, 'Experienced tarot card reader', '01234567891012', 'Mystic Bob', 'IDCopy1.png', 4, 20),
    ('2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', TRUE, 'Specialized in Thai astrology', '01234567891013', 'Astro Alice', 'IDCopy2.png', 4.5, 15),
    ('3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', TRUE, 'Oracle readings with deep insights', '01234567891014', 'Oracle Charlie', 'IDCopy3.png', 4.8, 25),
    ('4e4894f4-6524-4937-8b7d-23d45b0e0c75', FALSE, NULL, '012345678910125', 'Novice Fortune Teller', 'IDCopy4.png', 0, 0);

-- PACKAGE
INSERT INTO PACKAGE (package_id, speciality, description, duration, price, fortune_teller_id)
VALUES
    ('5da3c188-7f9a-44f0-8641-4f64d1e92f51', 'RUNES', 'Detailed Rune Reading', 30, 50, '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da'),
    ('6b648537-13cc-4ce0-a1ae-7b6b7ccbc152', 'THAI', 'Thai Astrology Session', 45, 75, '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1'),
    ('7d5dd6cf-b7bc-4c69-87d5-ea5dab607620', 'ORACLE', 'In-Depth Oracle Reading', 60, 100, '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da'),
    ('a70d65c3-ff8f-44d9-a06b-32e3abda4db7', 'TAROT_CARD', 'Tarot Card Session', 45, 80, '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d');

-- CONVERSATION
INSERT INTO CONVERSATION (conversation_id, fortune_teller_id, customer_id)
VALUES
    ('2389b0b-6929-4b18-8a50-c301a36b3e24', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1'),
    ('3456a1c-4321-4b8c-9d0e-a6b2c3d4e5f6', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da'),
    ('7890b2a-4567-4b89-9c01-a2b3c4d5e6f7', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', '5f0d68c8-7803-4d25-b80e-13d43a641791'),
    ('3256a1c-4321-4b8c-9d0e-a6b2c3d4e5f6', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1'),
    ('3256b1c-4321-4b8c-9d0e-a8b2c3d4e5f6', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', '5f0d68c8-7803-4d25-b80e-13d43a641791')
    ;

-- MESSAGE
INSERT INTO MESSAGE (message_id, sender_id, message_text, is_read, conversation_id)
VALUES
    ('1234abcd-5678-90ef-ghij-klmn12345678', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', 'Hello there!', FALSE, '2389b0b-6929-4b18-8a50-c301a36b3e24'),
    ('2345bcde-6789-01fg-hijk-lmno23456789', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', 'Hi! How can I help you?', FALSE, '2389b0b-6929-4b18-8a50-c301a36b3e24'),
    ('3456cdef-7890-12gh-ijkl-mnop34567890', '5f0d68c8-7803-4d25-b80e-13d43a641791', 'Im interested in a reading.', FALSE, '3456a1c-4321-4b8c-9d0e-a6b2c3d4e5f6'),
    ('4567efgh-9012-34ij-klmn-opqr12345678', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', 'Sure! Lets discuss your preferences.', FALSE, '3456a1c-4321-4b8c-9d0e-a6b2c3d4e5f6');


-- APPOINTMENT
INSERT INTO APPOINTMENT (appointment_id, status, package_id, customer_id, fortune_teller_id, appointment_date)
VALUES
    ('5678ghij-9012-34kl-mnop-qrst12345678', 'CREATED',             '5da3c188-7f9a-44f0-8641-4f64d1e92f51', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', '2024-02-15 10:00:00'),
    ('6789ijkl-0123-45mn-opqr-stuv23456789', 'WAITING_FOR_PAYMENT', '6b648537-13cc-4ce0-a1ae-7b6b7ccbc152', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', '2024-02-20 15:30:00'),
    ('7890mnop-1234-5rst-uvwx-yzab34567890', 'WAITING_FOR_EVENT',   '7d5dd6cf-b7bc-4c69-87d5-ea5dab607620', '5f0d68c8-7803-4d25-b80e-13d43a641791', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', '2024-03-01 18:45:00');


-- REVIEW
INSERT INTO REVIEW (review_id, review_message, score, customer_id, fortune_teller_id, appointment_id)
VALUES
    ('9012ijkl-3456-78mn-opqr-stuv12345678', 'Great experience! Highly recommended.', 5,    '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', '5678ghij-9012-34kl-mnop-qrst12345678'),
    ('0123mnop-4567-89qr-uvwx-yzab23456789', 'Very insightful reading. Thank you!', 4,      '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', '6789ijkl-0123-45mn-opqr-stuv23456789'),
    ('1234qrst-5678-90uv-wxyz-abcd34567890', 'Professional and accurate predictions.', 4.5, '5f0d68c8-7803-4d25-b80e-13d43a641791', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', '7890mnop-1234-5rst-uvwx-yzab34567890');

-- PAYMENT
INSERT INTO PAYMENT (payment_id, method, status, amount, appointment_id)
VALUES
    ('2345ijkl-6789-01mn-opqr-stuv23456789', 'BANK', 'FROM_CUSTOMER', 50, '5678ghij-9012-34kl-mnop-qrst12345678'),
    ('3456mnop-7890-12st-uvwx-yzab34567890', 'CREDIT_CARD', 'TO_FORTUNE_TELLER', 75, '6789ijkl-0123-45mn-opqr-stuv23456789'),
    ('4567qrst-9012-34uv-wxyz-abcd12345678', 'BANK', 'REFUND', 100, '7890mnop-1234-5rst-uvwx-yzab34567890');

-- REPORT
INSERT INTO REPORT (report_id, description, report_type, status, appointment_id, reporter_id, reportee_id)
VALUES
    ('5678ijkl-9012-34mn-opqr-stuv12345678', 'Inappropriate behavior during the session.', 'INAPPROPRIATE_BEHAVIOR', 'PENDING', '5678ghij-9012-34kl-mnop-qrst12345678', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d'),
    ('6789mnop-0123-45qr-uvwx-yzab23456789', 'Money dispute with the fortune teller.', 'MONEY_SUSPENSION', 'PENDING', '6789ijkl-0123-45mn-opqr-stuv23456789', '5f0d68c8-7803-4d25-b80e-13d43a641791', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da'),
    ('7890qrst-1234-56uv-wxyz-abcd34567890', 'System error during the appointment.', 'SYSTEM_ERROR', 'PENDING', '7890mnop-1234-5rst-uvwx-yzab34567890', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', NULL);

-- NOTIFICATION
INSERT INTO NOTIFICATION (notification_id, user_id, type)
VALUES
    ('9012ijkl-3456-78mn-opqr-stuv12345678', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', 'VERIFICATION'),
    ('9012ijkl-3456-68mn-opqr-stuv12345678', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', 'CANCELED_VERIFICATION'),
    ('2345ijkl-6789-01mn-opqr-stuv23456789', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', 'APPOINTMENT'),
    ('3456mnop-7890-12st-uvwx-yzab34567890', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', 'APPOINTMENT'),
    ('4567qrst-9012-34uv-wxyz-abcd12345678', '5f0d68c8-7803-4d25-b80e-13d43a641791', 'APPOINTMENT'),
    ('5678ijkl-9012-34mn-opqr-stuv12345678', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d','CHAT'),
    ('6789mnop-0123-45st-uvwx-yzab23456789', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da','CHAT'),
    ('7890qrst-1234-56uv-wxyz-abcd34567890', '5f0d68c8-7803-4d25-b80e-13d43a641791','CHAT')
    ;

-- APPOINTMENT_NOTIFICATION
INSERT INTO APPOINTMENT_NOTIFICATION (notification_id, type, appointment_id)
VALUES
    ('2345ijkl-6789-01mn-opqr-stuv23456789', 'REMINDER', '5678ghij-9012-34kl-mnop-qrst12345678'),
    ('3456mnop-7890-12st-uvwx-yzab34567890', 'COMPLETE', '6789ijkl-0123-45mn-opqr-stuv23456789'),
    ('4567qrst-9012-34uv-wxyz-abcd12345678', 'CANCEL', '7890mnop-1234-5rst-uvwx-yzab34567890');

-- CHAT_NOTIFICATION
INSERT INTO CHAT_NOTIFICATION (notification_id, conversation_id)
VALUES
    ('5678ijkl-9012-34mn-opqr-stuv12345678', '2389b0b-6929-4b18-8a50-c301a36b3e24'),
    ('6789mnop-0123-45st-uvwx-yzab23456789', '3456a1c-4321-4b8c-9d0e-a6b2c3d4e5f6'),
    ('7890qrst-1234-56uv-wxyz-abcd34567890', '7890b2a-4567-4b89-9c01-a2b3c4d5e6f7');

-- REQUEST
INSERT INTO REQUEST (request_id, fortune_teller_id, status)
VALUES 
    ('1234ijkl-5678-90mn-opqr-stuv12345678', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', 'PENDING'),
    ('4123ijkl-5378-90mn-opqr-stuv12345678', '4e4894f4-6524-4937-8b7d-23d45b0e0c75', 'PENDING'),
    ('3245mnop-6789-01st-uvwx-yzab23456789', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', 'ACCEPTED'),
    ('1256qrst-7890-12uv-wxyz-abcd34567890', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', 'REJECTED');