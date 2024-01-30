-- TEST MOUNT FILE
-- TEST INIT

CREATE TYPE gender_enum AS ENUM('MALE', 'FEMALE', 'LGBTQA+', 'NOT_TO_SAY');
CREATE TYPE usertype_enum AS ENUM('CUSTOMER', 'FORTUNE_TELLER');

CREATE TABLE ADMIN (
    AdminId CHAR(36) PRIMARY KEY,
    Email VARCHAR(200) UNIQUE NOT NULL,
    Password VARCHAR(500) NOT NULL
);


CREATE TABLE USER_TABLE (
    UserId CHAR(36) PRIMARY KEY,
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
    CONSTRAINT unique_name_constraint UNIQUE (Fname, Lname)
);


CREATE TABLE FORTUNE_TELLER (
    FortuneTellerId CHAR(36) PRIMARY KEY,
    IsVerified BOOLEAN NOT NULL,
    Description VARCHAR(300),
    IdentityCardNumber VARCHAR(30) NOT NULL,
    StageName VARCHAR(100) UNIQUE NOT NULL,
    IdentityCardCopy VARCHAR(300) NOT NULL,
    TotalScore INTEGER NOT NULL DEFAULT 0,
    TotalReview INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY(FortuneTellerId) REFERENCES USER_TABLE(UserId)
);

CREATE TYPE speciality_enum AS ENUM('TAROT_CARD', 'THAI', 'NUMBER', 'ORACLE', 'RUNES');

CREATE TABLE PACKAGE(
    PackageId   CHAR(36) PRIMARY KEY,
    Speciality  speciality_enum NOT NULL,
    Description VARCHAR(500),
    Duration    INTEGER  CHECK(Duration > 0),
    Price       INTEGER  CHECK(Price BETWEEN 0 AND 1000000 ),
    FortuneTellerID CHAR(36) NOT NULL,
    FOREIGN KEY(FortuneTellerID) REFERENCES FORTUNE_TELLER(FortuneTellerId)
);

-- CONVERSATION (May be NoSQL)
CREATE TABLE CONVERSATION(
    ConversationId CHAR(36) PRIMARY KEY,
    FortuneTellerID CHAR(36) NOT NULL,
    CustomerId CHAR(36) NOT NULL,
    FOREIGN KEY(FortuneTellerID) REFERENCES FORTUNE_TELLER(FortuneTellerId),
    FOREIGN KEY(CustomerId) REFERENCES USER_TABLE(UserId),
    CONSTRAINT unique_conversation_constraint UNIQUE (FortuneTellerID, CustomerId)

);

-- MESSAGE (May be NoSQL)
CREATE TABLE MESSAGE(
    MessageId CHAR(36) PRIMARY KEY,
    SenderId CHAR(36) NOT NULL,
    MessageText VARCHAR(500) NOT NULL,
    IsRead  BOOLEAN NOT NULL DEFAULT FALSE,
    ConversationId CHAR(36) NOT NULL,
    FOREIGN KEY(SenderId) REFERENCES USER_TABLE(UserId),
    FOREIGN KEY(ConversationId) REFERENCES CONVERSATION(ConversationId)
);

CREATE TYPE appointment_status_enum AS ENUM('CREATED', 'WAITING_FOR_PAYMENT', 'WAITING_FOR_EVENT', 'EVENT_COMPLETED', 'PAYMENT_COMPLETED', 'CANCELED', 'SUSPENDED', 'REFUNDED');

CREATE TABLE APPOINTMENT (
    AppointmentId CHAR(36) PRIMARY KEY,
    Status appointment_status_enum NOT NULL,
    PackageId CHAR(36) NOT NULL,
    CustomerId CHAR(36) NOT NULL,
    FortuneTellerId CHAR(36) NOT NULL,
    AppointmentDate TIMESTAMP NOT NULL,
    FOREIGN KEY(PackageId) REFERENCES PACKAGE(PackageId),
    FOREIGN KEY(CustomerId) REFERENCES USER_TABLE(UserId),
    FOREIGN KEY(FortuneTellerId) REFERENCES FORTUNE_TELLER(FortuneTellerId)
);

CREATE TABLE REVIEW (
    ReviewId CHAR(36) PRIMARY KEY,
    ReviewMessage VARCHAR(500),
    Score INTEGER NOT NULL,
    CustomerId CHAR(36) NOT NULL,
    FortuneTellerId CHAR(36) NOT NULL,
    AppointmentId CHAR(36) NOT NULL,
    FOREIGN KEY(CustomerId) REFERENCES USER_TABLE(UserId),
    FOREIGN KEY(FortuneTellerId) REFERENCES FORTUNE_TELLER(FortuneTellerId),
    FOREIGN KEY(AppointmentId) REFERENCES APPOINTMENT(AppointmentId)
);

CREATE TYPE payment_method_enum AS ENUM('BANK', 'CREDIT_CARD');
CREATE TYPE payment_status_enum AS ENUM('FROM_CUSTOMER', 'TO_FORTUNE_TELLER', 'REFUND');

CREATE TABLE PAYMENT(
    PaymentId   CHAR(36) PRIMARY KEY,
    Method payment_method_enum NOT NULL,
    Status payment_status_enum NOT NULL,
    Amount INTEGER  CHECK(Amount BETWEEN 0 AND 1000000 ),
    ReceiverId CHAR(36) NOT NULL,
    AppointmentId CHAR(36) NOT NULL,
    FOREIGN KEY(ReceiverId) REFERENCES USER_TABLE(UserId),
    FOREIGN KEY(AppointmentId) REFERENCES APPOINTMENT(AppointmentId)
);

CREATE TYPE report_type_enum AS ENUM ('INAPPROPIATE_BEHAVIOR','MONEY_SUSPENSION','SYSTEM_ERROR');
CREATE TYPE report_status_enum AS ENUM ('PENDING','COMPLETED');
CREATE TYPE notification_type_enum AS ENUM ('VERIFICATION', 'CHAT', 'APPOINTMENT');
CREATE TYPE appointment_notification_type_enum AS ENUM ('REMINDER', 'COMPLETE', 'CANCEL', 'NEW', 'ACCEPT');
CREATE TABLE REPORT (
    ReportId CHAR(36) PRIMARY KEY,
    Description VARCHAR(200) NOT NULL,
    ReportType report_type_enum NOT NULL,
    Status report_status_enum NOT NULL,
    AppointmentId CHAR(36) ,
    ReporterId CHAR(36) NOT NULL,
    ReporteeId CHAR(36),
    FOREIGN KEY (ReporterId) REFERENCES USER_TABLE(UserId),
    FOREIGN KEY (ReporteeId) REFERENCES USER_TABLE(UserId),
    FOREIGN KEY(AppointmentId) REFERENCES APPOINTMENT(AppointmentId)
);

CREATE TABLE NOTIFICATION (
    NotificationId CHAR(36) PRIMARY KEY,
    UserId  CHAR(36) NOT NULL,
    Type notification_type_enum NOT NULL,
    FOREIGN KEY (UserId) REFERENCES USER_TABLE(UserId)
);

CREATE TABLE APPOINTMENT_NOTIFICATION (
    NotificationId CHAR(36) PRIMARY KEY,
    Type appointment_notification_type_enum NOT NULL,
    AppointmentId CHAR(36) NOT NULL,
    FOREIGN KEY (AppointmentId) REFERENCES APPOINTMENT(AppointmentId),
    FOREIGN KEY (NotificationId) REFERENCES NOTIFICATION(NotificationId)
);

CREATE TABLE CHAT_NOTIFICATION (
    NotificationId CHAR(36) PRIMARY KEY,
    ConversationId CHAR(36) NOT NULL,
    FOREIGN KEY (ConversationId) REFERENCES CONVERSATION(ConversationId),
    FOREIGN KEY (NotificationId) REFERENCES NOTIFICATION(NotificationId)
);