-- TEST MOUNT FILE
-- TEST INIT

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE gender_enum AS ENUM('MALE', 'FEMALE', 'LGBTQA+', 'NOT_TO_SAY');
CREATE TYPE usertype_enum AS ENUM('CUSTOMER', 'FORTUNE_TELLER');

CREATE TABLE ADMIN (
    AdminId CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    Email VARCHAR(200) UNIQUE NOT NULL,
    Password VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE USER_TABLE (
    UserId CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    Fname VARCHAR(100) NOT NULL,
    Lname VARCHAR(100) NOT NULL,
    Gender gender_enum NOT NULL,
    PhoneNumber VARCHAR(20) NOT NULL,
    Email VARCHAR(200) UNIQUE NOT NULL,
    BirthDate TIMESTAMP NOT NULL,
    ProfilePicture VARCHAR(300),
    IsBanned BOOLEAN NOT NULL DEFAULT FALSE,
    BankName VARCHAR(100) NOT NULL,
    AccountNumber VARCHAR(100) NOT NULL,
    Password VARCHAR(500) NOT NULL,
    UserType usertype_enum NOT NULL,
    CONSTRAINT unique_name_constraint UNIQUE (Fname, Lname),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE FORTUNE_TELLER (
    FortuneTellerId CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    IsVerified BOOLEAN NOT NULL,
    Description VARCHAR(300),
    IdentityCardNumber VARCHAR(30) NOT NULL,
    StageName VARCHAR(100) UNIQUE NOT NULL,
    IdentityCardCopy VARCHAR(300) NOT NULL,
    TotalScore INTEGER NOT NULL DEFAULT 0,
    TotalReview INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY(FortuneTellerId) REFERENCES USER_TABLE(UserId),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE speciality_enum AS ENUM('TAROT_CARD', 'THAI', 'NUMBER', 'ORACLE', 'RUNES');

CREATE TABLE PACKAGE(
    PackageId   CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    Speciality  speciality_enum NOT NULL,
    Description VARCHAR(500),
    Duration    INTEGER  CHECK(Duration > 0),
    Price       INTEGER  CHECK(Price BETWEEN 10 AND 1000000 ),
    FortuneTellerID CHAR(36) NOT NULL,
    FOREIGN KEY(FortuneTellerID) REFERENCES FORTUNE_TELLER(FortuneTellerId),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CONVERSATION (May be NoSQL)
CREATE TABLE CONVERSATION(
    ConversationId CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    FortuneTellerID CHAR(36) NOT NULL,
    CustomerId CHAR(36) NOT NULL,
    FOREIGN KEY(FortuneTellerID) REFERENCES FORTUNE_TELLER(FortuneTellerId),
    FOREIGN KEY(CustomerId) REFERENCES USER_TABLE(UserId),
    CONSTRAINT unique_conversation_constraint UNIQUE (FortuneTellerID, CustomerId),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MESSAGE (May be NoSQL)
CREATE TABLE MESSAGE(
    MessageId CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    SenderId CHAR(36) NOT NULL,
    MessageText VARCHAR(500) NOT NULL,
    IsRead  BOOLEAN NOT NULL DEFAULT FALSE,
    ConversationId CHAR(36) NOT NULL,
    FOREIGN KEY(SenderId) REFERENCES USER_TABLE(UserId),
    FOREIGN KEY(ConversationId) REFERENCES CONVERSATION(ConversationId),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE appointment_status_enum AS ENUM('CREATED', 'WAITING_FOR_PAYMENT', 'WAITING_FOR_EVENT', 'EVENT_COMPLETED', 'PAYMENT_COMPLETED', 'CANCELED', 'SUSPENDED', 'REFUNDED');

CREATE TABLE APPOINTMENT (
    AppointmentId CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    Status appointment_status_enum NOT NULL,
    PackageId CHAR(36) NOT NULL,
    CustomerId CHAR(36) NOT NULL,
    FortuneTellerId CHAR(36) NOT NULL,
    AppointmentDate TIMESTAMP NOT NULL,
    FOREIGN KEY(PackageId) REFERENCES PACKAGE(PackageId),
    FOREIGN KEY(CustomerId) REFERENCES USER_TABLE(UserId),
    FOREIGN KEY(FortuneTellerId) REFERENCES FORTUNE_TELLER(FortuneTellerId),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE REVIEW (
    ReviewId CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    ReviewMessage VARCHAR(500),
    Score INTEGER NOT NULL,
    CustomerId CHAR(36) NOT NULL,
    FortuneTellerId CHAR(36) NOT NULL,
    AppointmentId CHAR(36) NOT NULL,
    FOREIGN KEY(CustomerId) REFERENCES USER_TABLE(UserId),
    FOREIGN KEY(FortuneTellerId) REFERENCES FORTUNE_TELLER(FortuneTellerId),
    FOREIGN KEY(AppointmentId) REFERENCES APPOINTMENT(AppointmentId),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE payment_method_enum AS ENUM('BANK', 'CREDIT_CARD');
CREATE TYPE payment_status_enum AS ENUM('FROM_CUSTOMER', 'TO_FORTUNE_TELLER', 'REFUND');

CREATE TABLE PAYMENT(
    PaymentId   CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    Method payment_method_enum NOT NULL,
    Status payment_status_enum NOT NULL,
    Amount INTEGER  CHECK(Amount BETWEEN 10 AND 1000000 ),
    ReceiverId CHAR(36) NOT NULL,
    AppointmentId CHAR(36) NOT NULL,
    FOREIGN KEY(ReceiverId) REFERENCES USER_TABLE(UserId),
    FOREIGN KEY(AppointmentId) REFERENCES APPOINTMENT(AppointmentId),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE report_type_enum AS ENUM ('INAPPROPRIATE_BEHAVIOR','MONEY_SUSPENSION','SYSTEM_ERROR');
CREATE TYPE report_status_enum AS ENUM ('PENDING','COMPLETED');
CREATE TYPE notification_type_enum AS ENUM ('VERIFICATION', 'CANCELED_VERIFICATION', 'CHAT', 'APPOINTMENT');
CREATE TYPE appointment_notification_type_enum AS ENUM ('REMINDER', 'COMPLETE', 'CANCEL', 'NEW', 'ACCEPT');
CREATE TABLE REPORT (
    ReportId CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    Description VARCHAR(200) NOT NULL,
    ReportType report_type_enum NOT NULL,
    Status report_status_enum NOT NULL,
    AppointmentId CHAR(36) ,
    ReporterId CHAR(36) NOT NULL,
    ReporteeId CHAR(36),
    FOREIGN KEY (ReporterId) REFERENCES USER_TABLE(UserId),
    FOREIGN KEY (ReporteeId) REFERENCES USER_TABLE(UserId),
    FOREIGN KEY(AppointmentId) REFERENCES APPOINTMENT(AppointmentId),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE NOTIFICATION (
    NotificationId CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    UserId  CHAR(36) NOT NULL,
    Type notification_type_enum NOT NULL,
    FOREIGN KEY (UserId) REFERENCES USER_TABLE(UserId),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE APPOINTMENT_NOTIFICATION (
    NotificationId CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    Type appointment_notification_type_enum NOT NULL,
    AppointmentId CHAR(36) NOT NULL,
    FOREIGN KEY (AppointmentId) REFERENCES APPOINTMENT(AppointmentId),
    FOREIGN KEY (NotificationId) REFERENCES NOTIFICATION(NotificationId),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CHAT_NOTIFICATION (
    NotificationId CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    ConversationId CHAR(36) NOT NULL,
    FOREIGN KEY (ConversationId) REFERENCES CONVERSATION(ConversationId),
    FOREIGN KEY (NotificationId) REFERENCES NOTIFICATION(NotificationId),
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

-- ADMIN
INSERT INTO ADMIN (AdminId, Email, Password)
VALUES
    ('1a32b89f67f245648ad812f5473d98c7', 'admin1@example.com', 'admin_password1'),
    ('2c89e0bd16e84a43891f97e7d50d3c4a', 'admin2@example.com', 'admin_password2'),
    ('3d4b45f1-d4d7-4b9c-8baa-95e933ac9b5b', 'admin3@example.com', 'admin_password3');

-- USER_TABLE
INSERT INTO USER_TABLE (UserId, Fname, Lname, Gender, PhoneNumber, Email, BirthDate, ProfilePicture, IsBanned, BankName, AccountNumber, Password, UserType)
VALUES
    ('84885c07-43d7-42b8-8919-88263a33fc74', 'John', 'Doe', 'MALE', '1234567890', 'john.doe@example.com', '1990-01-15', NULL, FALSE, 'ABC Bank', '123456789', 'user_password1', 'CUSTOMER'),
    ('aad3b8fc-bb5f-46a5-b2c5-541f1f4c6a5b', 'Jane', 'Smith', 'FEMALE', '9876543210', 'jane.smith@example.com', '1985-05-20', NULL, FALSE, 'XYZ Bank', '987654321', 'user_password2', 'CUSTOMER'),
    ('0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', 'Bob', 'Johnson', 'MALE', '5551234567', 'bob.johnson@example.com', '1980-11-10', NULL, FALSE, 'PQR Bank', '456789012', 'user_password3', 'FORTUNE_TELLER'),
    ('1e801f2b-f9f0-493e-8a61-c9936e78fb9a', 'Alice', 'Williams', 'FEMALE', '3339876543', 'alice.williams@example.com', '1995-08-25', NULL, FALSE, 'DEF Bank', '654321098', 'user_password4', 'FORTUNE_TELLER'),
    ('2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', 'Charlie', 'Brown', 'MALE', '1112223333', 'charlie.brown@example.com', '1975-04-05', NULL, FALSE, 'GHI Bank', '789012345', 'user_password5', 'FORTUNE_TELLER'),
    ('3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', 'Emma', 'Davis', 'FEMALE', '4445556666', 'emma.davis@example.com', '1993-12-18', NULL, FALSE, 'JKL Bank', '234567890', 'user_password6', 'CUSTOMER'),
    ('4e4894f4-6524-4937-8b7d-23d45b0e0c75', 'James', 'Miller', 'MALE', '6667778888', 'james.miller@example.com', '1982-09-30', NULL, FALSE, 'MNO Bank', '876543210', 'user_password7', 'FORTUNE_TELLER'),
    ('5f0d68c8-7803-4d25-b80e-13d43a641791', 'Olivia', 'Moore', 'FEMALE', '9990001111', 'olivia.moore@example.com', '1998-06-22', NULL, FALSE, 'PQR Bank', '543210987', 'user_password8', 'CUSTOMER');

-- FORTUNE_TELLER
INSERT INTO FORTUNE_TELLER (FortuneTellerId, IsVerified, Description, IdentityCardNumber, StageName, IdentityCardCopy, TotalScore, TotalReview)
VALUES
    ('0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', TRUE, 'Experienced tarot card reader', '01234567891012', 'Mystic Bob', 'IDCopy1.png', 4, 20),
    ('2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', TRUE, 'Specialized in Thai astrology', '01234567891013', 'Astro Alice', 'IDCopy2.png', 4.5, 15),
    ('3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', TRUE, 'Oracle readings with deep insights', '01234567891014', 'Oracle Charlie', 'IDCopy3.png', 4.8, 25),
    ('4e4894f4-6524-4937-8b7d-23d45b0e0c75', FALSE, NULL, '012345678910125', 'Novice Fortune Teller', 'IDCopy4.png', 0, 0);

-- PACKAGE
INSERT INTO PACKAGE (PackageId, Speciality, Description, Duration, Price, FortuneTellerID)
VALUES
    ('5da3c188-7f9a-44f0-8641-4f64d1e92f51', 'RUNES', 'Detailed Rune Reading', 30, 50, '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da'),
    ('6b648537-13cc-4ce0-a1ae-7b6b7ccbc152', 'THAI', 'Thai Astrology Session', 45, 75, '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1'),
    ('7d5dd6cf-b7bc-4c69-87d5-ea5dab607620', 'ORACLE', 'In-Depth Oracle Reading', 60, 100, '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da'),
    ('a70d65c3-ff8f-44d9-a06b-32e3abda4db7', 'TAROT_CARD', 'Tarot Card Session', 45, 80, '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d');

-- CONVERSATION
INSERT INTO CONVERSATION (ConversationId, FortuneTellerID, CustomerId)
VALUES
    ('2389b0b-6929-4b18-8a50-c301a36b3e24', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1'),
    ('3456a1c-4321-4b8c-9d0e-a6b2c3d4e5f6', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da'),
    ('7890b2a-4567-4b89-9c01-a2b3c4d5e6f7', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', '5f0d68c8-7803-4d25-b80e-13d43a641791'),
    ('3256a1c-4321-4b8c-9d0e-a6b2c3d4e5f6', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1'),
    ('3256b1c-4321-4b8c-9d0e-a8b2c3d4e5f6', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', '5f0d68c8-7803-4d25-b80e-13d43a641791')
    ;

-- MESSAGE
INSERT INTO MESSAGE (MessageId, SenderId, MessageText, IsRead, ConversationId)
VALUES
    ('1234abcd-5678-90ef-ghij-klmn12345678', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', 'Hello there!', FALSE, '2389b0b-6929-4b18-8a50-c301a36b3e24'),
    ('2345bcde-6789-01fg-hijk-lmno23456789', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', 'Hi! How can I help you?', FALSE, '2389b0b-6929-4b18-8a50-c301a36b3e24'),
    ('3456cdef-7890-12gh-ijkl-mnop34567890', '5f0d68c8-7803-4d25-b80e-13d43a641791', 'Im interested in a reading.', FALSE, '3456a1c-4321-4b8c-9d0e-a6b2c3d4e5f6'),
    ('4567efgh-9012-34ij-klmn-opqr12345678', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', 'Sure! Lets discuss your preferences.', FALSE, '3456a1c-4321-4b8c-9d0e-a6b2c3d4e5f6');


-- APPOINTMENT
INSERT INTO APPOINTMENT (AppointmentId, Status, PackageId, CustomerId, FortuneTellerId, AppointmentDate)
VALUES
    ('5678ghij-9012-34kl-mnop-qrst12345678', 'CREATED',             '5da3c188-7f9a-44f0-8641-4f64d1e92f51', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', '2024-02-15 10:00:00'),
    ('6789ijkl-0123-45mn-opqr-stuv23456789', 'WAITING_FOR_PAYMENT', '6b648537-13cc-4ce0-a1ae-7b6b7ccbc152', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', '2024-02-20 15:30:00'),
    ('7890mnop-1234-5rst-uvwx-yzab34567890', 'WAITING_FOR_EVENT',   '7d5dd6cf-b7bc-4c69-87d5-ea5dab607620', '5f0d68c8-7803-4d25-b80e-13d43a641791', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', '2024-03-01 18:45:00');


-- REVIEW
INSERT INTO REVIEW (ReviewId, ReviewMessage, Score, CustomerId, FortuneTellerId, AppointmentId)
VALUES
    ('9012ijkl-3456-78mn-opqr-stuv12345678', 'Great experience! Highly recommended.', 5,    '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', '5678ghij-9012-34kl-mnop-qrst12345678'),
    ('0123mnop-4567-89qr-uvwx-yzab23456789', 'Very insightful reading. Thank you!', 4,      '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', '6789ijkl-0123-45mn-opqr-stuv23456789'),
    ('1234qrst-5678-90uv-wxyz-abcd34567890', 'Professional and accurate predictions.', 4.5, '5f0d68c8-7803-4d25-b80e-13d43a641791', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', '7890mnop-1234-5rst-uvwx-yzab34567890');

-- PAYMENT
INSERT INTO PAYMENT (PaymentId, Method, Status, Amount, ReceiverId, AppointmentId)
VALUES
    ('2345ijkl-6789-01mn-opqr-stuv23456789', 'BANK', 'FROM_CUSTOMER', 50, '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', '5678ghij-9012-34kl-mnop-qrst12345678'),
    ('3456mnop-7890-12st-uvwx-yzab34567890', 'CREDIT_CARD', 'TO_FORTUNE_TELLER', 75, '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', '6789ijkl-0123-45mn-opqr-stuv23456789'),
    ('4567qrst-9012-34uv-wxyz-abcd12345678', 'BANK', 'REFUND', 100, '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', '7890mnop-1234-5rst-uvwx-yzab34567890');

-- REPORT
INSERT INTO REPORT (ReportId, Description, ReportType, Status, AppointmentId, ReporterId, ReporteeId)
VALUES
    ('5678ijkl-9012-34mn-opqr-stuv12345678', 'Inappropriate behavior during the session.', 'INAPPROPRIATE_BEHAVIOR', 'PENDING', '5678ghij-9012-34kl-mnop-qrst12345678', '2da1baf4-4291-493b-b8d4-8a6c7d65d6b1', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d'),
    ('6789mnop-0123-45qr-uvwx-yzab23456789', 'Money dispute with the fortune teller.', 'MONEY_SUSPENSION', 'PENDING', '6789ijkl-0123-45mn-opqr-stuv23456789', '5f0d68c8-7803-4d25-b80e-13d43a641791', '3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da'),
    ('7890qrst-1234-56uv-wxyz-abcd34567890', 'System error during the appointment.', 'SYSTEM_ERROR', 'PENDING', '7890mnop-1234-5rst-uvwx-yzab34567890', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d', NULL);

-- NOTIFICATION
INSERT INTO NOTIFICATION (NotificationId, UserId, Type)
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
INSERT INTO APPOINTMENT_NOTIFICATION (NotificationId, Type, AppointmentId)
VALUES
    ('2345ijkl-6789-01mn-opqr-stuv23456789', 'REMINDER', '5678ghij-9012-34kl-mnop-qrst12345678'),
    ('3456mnop-7890-12st-uvwx-yzab34567890', 'COMPLETE', '6789ijkl-0123-45mn-opqr-stuv23456789'),
    ('4567qrst-9012-34uv-wxyz-abcd12345678', 'CANCEL', '7890mnop-1234-5rst-uvwx-yzab34567890');

-- CHAT_NOTIFICATION
INSERT INTO CHAT_NOTIFICATION (NotificationId, ConversationId)
VALUES
    ('5678ijkl-9012-34mn-opqr-stuv12345678', '2389b0b-6929-4b18-8a50-c301a36b3e24'),
    ('6789mnop-0123-45st-uvwx-yzab23456789', '3456a1c-4321-4b8c-9d0e-a6b2c3d4e5f6'),
    ('7890qrst-1234-56uv-wxyz-abcd34567890', '7890b2a-4567-4b89-9c01-a2b3c4d5e6f7');
