-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS account_balance_id_seq;

-- Table Definition
CREATE TABLE "public"."account_balance" (
    "id" int8 NOT NULL DEFAULT nextval('account_balance_id_seq'::regclass),
    "student_id" int8 NOT NULL,
    "semester" varchar(255) NOT NULL,
    "academic_year" varchar(255) NOT NULL,
    "school_year" varchar(255) NOT NULL,
    "total_fees" numeric(8,2) NOT NULL,
    "amount_paid" numeric(8,2) NOT NULL,
    "balance" numeric(8,2) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21439_primary ON public.account_balance USING btree (id)
CREATE UNIQUE INDEX idx_21439_fk_account_balance_students ON public.account_balance USING btree (student_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS account_request_metas_id_seq;

-- Table Definition
CREATE TABLE "public"."account_request_metas" (
    "id" int8 NOT NULL DEFAULT nextval('account_request_metas_id_seq'::regclass),
    "user_id" int8,
    "model_id" numeric,
    "model_type" varchar(255) DEFAULT NULL::character varying,
    "account_request_id" numeric NOT NULL,
    "key" varchar(255) NOT NULL,
    "value" text,
    "is_approved" bool DEFAULT false,
    "is_approved_at" timestamptz,
    "is_rejected" bool DEFAULT false,
    "is_rejected_at" timestamptz,
    "rejected_reason" text,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21458_primary ON public.account_request_metas USING btree (id)
CREATE INDEX idx_21458_account_request_metas_account_request_id_foreign ON public.account_request_metas USING btree (account_request_id)
CREATE INDEX idx_21458_account_request_metas_key_index ON public.account_request_metas USING btree (key);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS account_requests_id_seq;

-- Table Definition
CREATE TABLE "public"."account_requests" (
    "id" int8 NOT NULL DEFAULT nextval('account_requests_id_seq'::regclass),
    "account_id" numeric NOT NULL,
    "user_id" int8,
    "type" varchar(255) DEFAULT NULL::character varying,
    "status" varchar(255) DEFAULT 'pending'::character varying,
    "is_approved" bool DEFAULT false,
    "is_approved_at" timestamptz,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21448_primary ON public.account_requests USING btree (id)
CREATE INDEX idx_21448_account_requests_account_id_foreign ON public.account_requests USING btree (account_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS accounts_id_seq;

-- Table Definition
CREATE TABLE "public"."accounts" (
    "id" int8 NOT NULL DEFAULT nextval('accounts_id_seq'::regclass),
    "type" varchar(255) DEFAULT 'account'::character varying,
    "parent_id" numeric,
    "name" varchar(255) DEFAULT NULL::character varying,
    "username" varchar(255) NOT NULL,
    "email" varchar(255) DEFAULT NULL::character varying,
    "phone" varchar(255) DEFAULT NULL::character varying,
    "loginby" varchar(255) DEFAULT 'email'::character varying,
    "address" text,
    "lang" varchar(10) DEFAULT NULL::character varying,
    "password" varchar(255) DEFAULT NULL::character varying,
    "two_factor_secret" text,
    "two_factor_recovery_codes" text,
    "two_factor_confirmed_at" timestamptz,
    "otp_code" varchar(255) DEFAULT NULL::character varying,
    "otp_activated_at" timestamptz,
    "last_login" timestamptz,
    "agent" text,
    "host" varchar(255) DEFAULT NULL::character varying,
    "is_login" bool DEFAULT false,
    "is_active" bool NOT NULL DEFAULT false,
    "is_notification_active" bool NOT NULL DEFAULT true,
    "deleted_at" timestamptz,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    "person_id" int8,
    "profile_photo_url" varchar(255) DEFAULT NULL::character varying,
    "email_verified_at" varchar(255) DEFAULT NULL::character varying,
    "role" varchar(255) DEFAULT NULL::character varying,
    "avatar" varchar(255) DEFAULT NULL::character varying,
    "person_type" varchar(255) DEFAULT NULL::character varying,
    "profile_photo_path" varchar(255) DEFAULT NULL::character varying,
    "remember_token" varchar(255) DEFAULT NULL::character varying,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21390_primary ON public.accounts USING btree (id)
CREATE UNIQUE INDEX idx_21390_accounts_username_unique ON public.accounts USING btree (username);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS accounts_metas_id_seq;

-- Table Definition
CREATE TABLE "public"."accounts_metas" (
    "id" int8 NOT NULL DEFAULT nextval('accounts_metas_id_seq'::regclass),
    "model_id" numeric,
    "model_type" varchar(255) DEFAULT NULL::character varying,
    "account_id" numeric NOT NULL,
    "key" varchar(255) NOT NULL,
    "value" text,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21431_primary ON public.accounts_metas USING btree (id)
CREATE INDEX idx_21431_accounts_metas_account_id_foreign ON public.accounts_metas USING btree (account_id)
CREATE INDEX idx_21431_accounts_metas_key_index ON public.accounts_metas USING btree (key);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS accountsportal_id_seq;

-- Table Definition
CREATE TABLE "public"."accountsportal" (
    "id" int8 NOT NULL DEFAULT nextval('accountsportal_id_seq'::regclass),
    "email" varchar(255) NOT NULL,
    "email_verified_at" timestamptz,
    "password" varchar(255) DEFAULT NULL::character varying,
    "two_factor_secret" text,
    "two_factor_recovery_codes" text,
    "two_factor_confirmed_at" timestamptz,
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz,
    "remember_token" varchar(255) DEFAULT '_utf8mb4\\''NULL\\'''::character varying,
    "two_factor_auth" bool DEFAULT false,
    "person_id" int8,
    "name" varchar(255) DEFAULT NULL::character varying,
    "role" varchar(255) NOT NULL,
    "is_google_auth" int8,
    "avatar" varchar(255) DEFAULT NULL::character varying,
    "cover" varchar(255) DEFAULT NULL::character varying,
    "person_type" varchar(255) DEFAULT NULL::character varying,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21416_primary ON public.accountsportal USING btree (id)
CREATE UNIQUE INDEX idx_21416_accounts_email_unique ON public.accountsportal USING btree (email)
CREATE INDEX idx_21416_fk_accounts_faculty ON public.accountsportal USING btree (person_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS activity_log_id_seq;

-- Table Definition
CREATE TABLE "public"."activity_log" (
    "id" int8 NOT NULL DEFAULT nextval('activity_log_id_seq'::regclass),
    "log_name" varchar(255) DEFAULT NULL::character varying,
    "description" text NOT NULL,
    "subject_type" varchar(255) DEFAULT NULL::character varying,
    "event" varchar(255) DEFAULT NULL::character varying,
    "subject_id" numeric,
    "causer_type" varchar(255) DEFAULT NULL::character varying,
    "causer_id" numeric,
    "properties" text,
    "batch_uuid" int8,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21468_primary ON public.activity_log USING btree (id)
CREATE INDEX idx_21468_activity_log_log_name_index ON public.activity_log USING btree (log_name)
CREATE INDEX idx_21468_causer ON public.activity_log USING btree (causer_type, causer_id)
CREATE INDEX idx_21468_subject ON public.activity_log USING btree (subject_type, subject_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS admin_transactions_id_seq;

-- Table Definition
CREATE TABLE "public"."admin_transactions" (
    "id" int8 NOT NULL DEFAULT nextval('admin_transactions_id_seq'::regclass),
    "admin_id" int8 NOT NULL,
    "transaction_id" int8 NOT NULL,
    "status" varchar(255) NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    CONSTRAINT "admin_transactions_admin_id_foreign" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "admin_transactions_transaction_id_foreign" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21479_primary ON public.admin_transactions USING btree (id)
CREATE INDEX idx_21479_admin_transactions_admin_id_foreign ON public.admin_transactions USING btree (admin_id)
CREATE INDEX idx_21479_admin_transactions_transaction_id_foreign ON public.admin_transactions USING btree (transaction_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS announcements_id_seq;

-- Table Definition
CREATE TABLE "public"."announcements" (
    "id" int8 NOT NULL DEFAULT nextval('announcements_id_seq'::regclass),
    "title" varchar(255) NOT NULL,
    "content" text NOT NULL,
    "slug" varchar(255) NOT NULL,
    "status" varchar(255) NOT NULL,
    "user_id" int8 NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    CONSTRAINT "announcements_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21484_primary ON public.announcements USING btree (id)
CREATE INDEX idx_21484_announcements_user_id_foreign ON public.announcements USING btree (user_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS attendances_id_seq;

-- Table Definition
CREATE TABLE "public"."attendances" (
    "id" int8 NOT NULL DEFAULT nextval('attendances_id_seq'::regclass),
    "class_enrollment_id" int8 NOT NULL,
    "student_id" int8 NOT NULL,
    "date" date NOT NULL,
    "status" varchar(255) NOT NULL DEFAULT 'present'::character varying,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21491_primary ON public.attendances USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS authentication_log_id_seq;

-- Table Definition
CREATE TABLE "public"."authentication_log" (
    "id" int8 NOT NULL DEFAULT nextval('authentication_log_id_seq'::regclass),
    "authenticatable_type" varchar(255) NOT NULL,
    "authenticatable_id" numeric NOT NULL,
    "ip_address" varchar(45) DEFAULT NULL::character varying,
    "user_agent" text,
    "login_at" timestamptz,
    "login_successful" bool NOT NULL DEFAULT false,
    "logout_at" timestamptz,
    "cleared_by_user" bool NOT NULL DEFAULT false,
    "location" text,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21497_primary ON public.authentication_log USING btree (id)
CREATE INDEX idx_21497_authentication_log_authenticatable_type_authenticatab ON public.authentication_log USING btree (authenticatable_type, authenticatable_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS authenticator_apps_id_seq;

-- Table Definition
CREATE TABLE "public"."authenticator_apps" (
    "id" int8 NOT NULL DEFAULT nextval('authenticator_apps_id_seq'::regclass),
    "user_id" int8 NOT NULL,
    "name" varchar(255) DEFAULT NULL::character varying,
    "secret" text,
    "last_used_at" timestamptz,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    CONSTRAINT "authenticator_apps_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21507_primary ON public.authenticator_apps USING btree (id)
CREATE INDEX idx_21507_authenticator_apps_user_id_foreign ON public.authenticator_apps USING btree (user_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS backup_destination_statuses_id_seq;

-- Table Definition
CREATE TABLE "public"."backup_destination_statuses" (
    "id" int8 NOT NULL DEFAULT nextval('backup_destination_statuses_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "disk" varchar(255) NOT NULL,
    "reachable" varchar(255) NOT NULL,
    "healthy" varchar(255) NOT NULL,
    "amount" int8 NOT NULL,
    "newest" varchar(255) DEFAULT NULL::character varying,
    "usedstorage" varchar(255) NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21515_primary ON public.backup_destination_statuses USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS breezy_sessions_id_seq;

-- Table Definition
CREATE TABLE "public"."breezy_sessions" (
    "id" int8 NOT NULL DEFAULT nextval('breezy_sessions_id_seq'::regclass),
    "authenticatable_type" varchar(255) NOT NULL,
    "authenticatable_id" int8 NOT NULL,
    "panel_id" varchar(255) DEFAULT NULL::character varying,
    "guard" varchar(255) DEFAULT NULL::character varying,
    "ip_address" varchar(255) DEFAULT NULL::character varying,
    "user_agent" text,
    "expires_at" timestamptz,
    "two_factor_secret" text,
    "two_factor_recovery_codes" text,
    "two_factor_confirmed_at" timestamptz,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21523_primary ON public.breezy_sessions USING btree (id)
CREATE INDEX idx_21523_breezy_sessions_authenticatable_type_authenticatable_ ON public.breezy_sessions USING btree (authenticatable_type, authenticatable_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS bulk_action_records_id_seq;

-- Table Definition
CREATE TABLE "public"."bulk_action_records" (
    "id" int8 NOT NULL DEFAULT nextval('bulk_action_records_id_seq'::regclass),
    "bulk_action_id" int8 NOT NULL,
    "record_id" int8 NOT NULL,
    "record_type" varchar(255) NOT NULL,
    "status" varchar(255) NOT NULL DEFAULT 'queued'::character varying,
    "message" text,
    "started_at" timestamptz,
    "failed_at" timestamptz,
    "finished_at" timestamptz,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    CONSTRAINT "bulk_action_records_bulk_action_id_foreign" FOREIGN KEY ("bulk_action_id") REFERENCES "public"."bulk_actions"("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21542_primary ON public.bulk_action_records USING btree (id)
CREATE INDEX idx_21542_bulk_action_records_bulk_action_id_foreign ON public.bulk_action_records USING btree (bulk_action_id)
CREATE INDEX idx_21542_bulk_action_records_record_id_record_type_index ON public.bulk_action_records USING btree (record_id, record_type);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS bulk_actions_id_seq;

-- Table Definition
CREATE TABLE "public"."bulk_actions" (
    "id" int8 NOT NULL DEFAULT nextval('bulk_actions_id_seq'::regclass),
    "name" varchar(255) DEFAULT NULL::character varying,
    "type" varchar(255) NOT NULL,
    "identifier" varchar(255) NOT NULL,
    "status" varchar(255) NOT NULL DEFAULT 'queued'::character varying,
    "job" varchar(255) NOT NULL,
    "user_id" int8,
    "total_records" int8,
    "data" text,
    "message" text,
    "dismissed_at" timestamptz,
    "started_at" timestamptz,
    "failed_at" timestamptz,
    "finished_at" timestamptz,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    CONSTRAINT "bulk_actions_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21533_primary ON public.bulk_actions USING btree (id)
CREATE INDEX idx_21533_bulk_actions_type_identifier_index ON public.bulk_actions USING btree (type, identifier)
CREATE INDEX idx_21533_bulk_actions_user_id_foreign ON public.bulk_actions USING btree (user_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."cache" (
    "key" varchar(255) NOT NULL,
    "value" text NOT NULL,
    "expiration" int8 NOT NULL,
    PRIMARY KEY ("key")
);


-- Indices
CREATE UNIQUE INDEX idx_21549_primary ON public.cache USING btree (key);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."cache_locks" (
    "key" varchar(255) NOT NULL,
    "owner" varchar(255) NOT NULL,
    "expiration" int8 NOT NULL,
    PRIMARY KEY ("key")
);


-- Indices
CREATE UNIQUE INDEX idx_21554_primary ON public.cache_locks USING btree (key);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS categories_id_seq;

-- Table Definition
CREATE TABLE "public"."categories" (
    "id" int8 NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "slug" varchar(255) NOT NULL,
    "is_visible" bool NOT NULL DEFAULT true,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21560_primary ON public.categories USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."category_ticket" (
    "category_id" numeric NOT NULL,
    "ticket_id" numeric NOT NULL
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."ch_favorites" (
    "id" bpchar(36) NOT NULL,
    "user_id" int8 NOT NULL,
    "favorite_id" int8 NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21572_primary ON public.ch_favorites USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."ch_messages" (
    "id" bpchar(36) NOT NULL,
    "from_id" int8 NOT NULL,
    "to_id" int8 NOT NULL,
    "body" varchar(5000) DEFAULT NULL::character varying,
    "attachment" varchar(255) DEFAULT NULL::character varying,
    "seen" bool NOT NULL DEFAULT false,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21575_primary ON public.ch_messages USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS class_enrollments_id_seq;

-- Table Definition
CREATE TABLE "public"."class_enrollments" (
    "id" int8 NOT NULL DEFAULT nextval('class_enrollments_id_seq'::regclass),
    "class_id" int8 NOT NULL,
    "student_id" numeric NOT NULL,
    "completion_date" date,
    "status" bool NOT NULL DEFAULT true,
    "remarks" text,
    "prelim_grade" numeric(8,2) DEFAULT NULL::numeric,
    "midterm_grade" numeric(8,2) DEFAULT NULL::numeric,
    "finals_grade" numeric(8,2) DEFAULT NULL::numeric,
    "total_average" numeric(8,2) DEFAULT NULL::numeric,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    "deleted_at" timestamptz,
    CONSTRAINT "class_enrollments_class_id_foreign" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21599_primary ON public.class_enrollments USING btree (id)
CREATE INDEX idx_21599_class_enrollments_class_id_foreign ON public.class_enrollments USING btree (class_id)
CREATE INDEX idx_21599_class_enrollments_student_id_foreign ON public.class_enrollments USING btree (student_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS class_posts_id_seq;

-- Table Definition
CREATE TABLE "public"."class_posts" (
    "id" int8 NOT NULL DEFAULT nextval('class_posts_id_seq'::regclass),
    "user_id" int8 NOT NULL,
    "class_id" int8 NOT NULL,
    "content" text NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    CONSTRAINT "class_posts_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "class_posts_class_id_foreign" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21611_primary ON public.class_posts USING btree (id)
CREATE INDEX idx_21611_class_posts_class_id_foreign ON public.class_posts USING btree (class_id)
CREATE INDEX idx_21611_class_posts_user_id_foreign ON public.class_posts USING btree (user_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS classes_id_seq;

-- Table Definition
CREATE TABLE "public"."classes" (
    "id" int4 NOT NULL DEFAULT nextval('classes_id_seq'::regclass),
    "subject_code" varchar(255) DEFAULT NULL::character varying,
    "faculty_id" int4,
    "academic_year" varchar(255) DEFAULT NULL::character varying,
    "semester" varchar(255) DEFAULT NULL::character varying,
    "schedule_id" int4,
    "school_year" varchar(255) DEFAULT NULL::character varying,
    "course_codes" varchar(255) DEFAULT NULL::character varying,
    "section" varchar(255) DEFAULT NULL::character varying,
    "room_id" int2,
    "classification" varchar(255) DEFAULT NULL::character varying,
    "maximum_slots" int2 DEFAULT '50'::bigint,
    PRIMARY KEY ("id")
);


-- Indices
CREATE INDEX idx_21584_classes_academic_year_semester_index ON public.classes USING btree (academic_year, semester)
CREATE INDEX idx_21584_classes_course_codes_index ON public.classes USING btree (course_codes)
CREATE INDEX idx_21584_classes_school_year_index ON public.classes USING btree (school_year)
CREATE INDEX idx_21584_classes_subject_code_index ON public.classes USING btree (subject_code)
CREATE INDEX idx_21584_fk_classes_subject1 ON public.classes USING btree (subject_code)
CREATE INDEX idx_21584_idx_academic_year_semester ON public.classes USING btree (academic_year, semester)
CREATE UNIQUE INDEX idx_21584_primary ON public.classes USING btree (id)
CREATE INDEX idx_21584_classes_faculty_id_index ON public.classes USING btree (faculty_id)
CREATE INDEX idx_21584_fk_classes_facultyb ON public.classes USING btree (faculty_id)
CREATE INDEX idx_21584_idx_classes_schedule_id ON public.classes USING btree (schedule_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS clients_id_seq;

-- Table Definition
CREATE TABLE "public"."clients" (
    "id" int8 NOT NULL DEFAULT nextval('clients_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "iban" varchar(255) DEFAULT NULL::character varying,
    "kvk_number" varchar(255) DEFAULT NULL::character varying,
    "vat_number" varchar(255) DEFAULT NULL::character varying,
    "address" varchar(255) DEFAULT NULL::character varying,
    "city" varchar(255) DEFAULT NULL::character varying,
    "zipcode" varchar(255) DEFAULT NULL::character varying,
    "country" varchar(255) DEFAULT NULL::character varying,
    "phone" varchar(255) DEFAULT NULL::character varying,
    "email" varchar(255) DEFAULT NULL::character varying,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21618_primary ON public.clients USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS connected_accounts_id_seq;

-- Table Definition
CREATE TABLE "public"."connected_accounts" (
    "id" int8 NOT NULL DEFAULT nextval('connected_accounts_id_seq'::regclass),
    "user_id" numeric NOT NULL,
    "provider" varchar(255) NOT NULL,
    "provider_id" varchar(255) NOT NULL,
    "name" varchar(255) DEFAULT NULL::character varying,
    "nickname" varchar(255) DEFAULT NULL::character varying,
    "email" varchar(255) DEFAULT NULL::character varying,
    "telephone" varchar(255) DEFAULT NULL::character varying,
    "avatar_path" text,
    "token" varchar(1000) NOT NULL,
    "secret" varchar(255) DEFAULT NULL::character varying,
    "refresh_token" varchar(1000) DEFAULT NULL::character varying,
    "expires_at" timestamptz,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21634_primary ON public.connected_accounts USING btree (id)
CREATE INDEX idx_21634_connected_accounts_provider_provider_id_index ON public.connected_accounts USING btree (provider, provider_id)
CREATE INDEX idx_21634_connected_accounts_user_id_id_index ON public.connected_accounts USING btree (user_id, id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS contacts_id_seq;

-- Table Definition
CREATE TABLE "public"."contacts" (
    "id" int8 NOT NULL DEFAULT nextval('contacts_id_seq'::regclass),
    "type" varchar(255) DEFAULT 'contact'::character varying,
    "status" varchar(255) DEFAULT 'pending'::character varying,
    "name" varchar(255) NOT NULL,
    "email" varchar(255) DEFAULT NULL::character varying,
    "phone" varchar(255) DEFAULT NULL::character varying,
    "subject" varchar(255) NOT NULL,
    "message" text NOT NULL,
    "active" bool DEFAULT true,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21647_primary ON public.contacts USING btree (id)
CREATE INDEX idx_21647_contacts_name_index ON public.contacts USING btree (name);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS contacts_metas_id_seq;

-- Table Definition
CREATE TABLE "public"."contacts_metas" (
    "id" int8 NOT NULL DEFAULT nextval('contacts_metas_id_seq'::regclass),
    "model_id" numeric,
    "model_type" varchar(255) DEFAULT NULL::character varying,
    "contact_id" numeric NOT NULL,
    "key" varchar(255) NOT NULL,
    "value" text,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21659_primary ON public.contacts_metas USING btree (id)
CREATE INDEX idx_21659_contacts_metas_contact_id_foreign ON public.contacts_metas USING btree (contact_id)
CREATE INDEX idx_21659_contacts_metas_key_index ON public.contacts_metas USING btree (key);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS courses_id_seq;

-- Table Definition
CREATE TABLE "public"."courses" (
    "id" int8 NOT NULL DEFAULT nextval('courses_id_seq'::regclass),
    "code" varchar(255) NOT NULL,
    "title" varchar(255) NOT NULL,
    "description" text NOT NULL,
    "department" varchar(255) NOT NULL,
    "lec_per_unit" int8,
    "lab_per_unit" int8,
    "remarks" text,
    "curriculum_year" varchar(255) DEFAULT NULL::character varying,
    "miscelaneous" int4,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21667_primary ON public.courses USING btree (id)
CREATE INDEX idx_21667_idx_code ON public.courses USING btree (code);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS credited_enrolled_subjects_id_seq;

-- Table Definition
CREATE TABLE "public"."credited_enrolled_subjects" (
    "id" int8 NOT NULL DEFAULT nextval('credited_enrolled_subjects_id_seq'::regclass),
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21675_primary ON public.credited_enrolled_subjects USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS document_locations_id_seq;

-- Table Definition
CREATE TABLE "public"."document_locations" (
    "id" int8 NOT NULL DEFAULT nextval('document_locations_id_seq'::regclass),
    "birth_certificate" varchar(255) DEFAULT NULL::character varying,
    "form_138" varchar(255) DEFAULT NULL::character varying,
    "form_137" varchar(255) DEFAULT NULL::character varying,
    "good_moral_cert" varchar(255) DEFAULT NULL::character varying,
    "transfer_credentials" varchar(255) DEFAULT NULL::character varying,
    "transcript_records" varchar(255) DEFAULT NULL::character varying,
    "picture_1x1" varchar(255) DEFAULT NULL::character varying,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21680_primary ON public.document_locations USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS enrollment_signatures_id_seq;

-- Table Definition
CREATE TABLE "public"."enrollment_signatures" (
    "id" int8 NOT NULL DEFAULT nextval('enrollment_signatures_id_seq'::regclass),
    "depthead_signature" text,
    "registrar_signature" text,
    "cashier_signature" text,
    "enrollment_id" int8,
    "enrollment_type" text,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21694_primary ON public.enrollment_signatures USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS exception_log_groups_id_seq;

-- Table Definition
CREATE TABLE "public"."exception_log_groups" (
    "id" int8 NOT NULL DEFAULT nextval('exception_log_groups_id_seq'::regclass),
    "message" text NOT NULL,
    "type" varchar(255) NOT NULL,
    "file" varchar(255) NOT NULL,
    "line" int8 NOT NULL,
    "first_seen" timestamptz NOT NULL,
    "last_seen" timestamptz NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    "site_id" int8 NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21709_primary ON public.exception_log_groups USING btree (id)
CREATE INDEX idx_21709_exception_log_groups_site_id_foreign ON public.exception_log_groups USING btree (site_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS exception_logs_id_seq;

-- Table Definition
CREATE TABLE "public"."exception_logs" (
    "id" int8 NOT NULL DEFAULT nextval('exception_logs_id_seq'::regclass),
    "message" text NOT NULL,
    "type" varchar(255) NOT NULL,
    "file" varchar(255) NOT NULL,
    "status" varchar(255) NOT NULL DEFAULT 'unresolved'::character varying,
    "line" int8 NOT NULL,
    "trace" text NOT NULL,
    "request" text,
    "thrown_at" timestamptz NOT NULL,
    "exception_log_group_id" int8 NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21701_primary ON public.exception_logs USING btree (id)
CREATE INDEX idx_21701_exception_logs_exception_log_group_id_foreign ON public.exception_logs USING btree (exception_log_group_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS exports_id_seq;

-- Table Definition
CREATE TABLE "public"."exports" (
    "id" int8 NOT NULL DEFAULT nextval('exports_id_seq'::regclass),
    "completed_at" timestamptz,
    "file_disk" varchar(255) NOT NULL,
    "file_name" varchar(255) DEFAULT NULL::character varying,
    "exporter" varchar(255) NOT NULL,
    "processed_rows" int8 NOT NULL DEFAULT '0'::bigint,
    "total_rows" int8 NOT NULL,
    "successful_rows" int8 NOT NULL DEFAULT '0'::bigint,
    "user_id" int8,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    CONSTRAINT "exports_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21716_primary ON public.exports USING btree (id)
CREATE INDEX idx_21716_exports_user_id_foreign ON public.exports USING btree (user_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

DROP TYPE IF EXISTS "public"."faculty_status";
CREATE TYPE "public"."faculty_status" AS ENUM ('active', 'inactive', 'on_leave', 'retired');
DROP TYPE IF EXISTS "public"."faculty_gender";
CREATE TYPE "public"."faculty_gender" AS ENUM ('male', 'female', 'other');

-- Table Definition
CREATE TABLE "public"."faculty" (
    "id" int8 NOT NULL,
    "first_name" varchar(255) NOT NULL,
    "last_name" varchar(255) NOT NULL,
    "middle_name" varchar(255) DEFAULT NULL::character varying,
    "email" varchar(255) NOT NULL,
    "phone_number" varchar(255) DEFAULT NULL::character varying,
    "department" varchar(255) DEFAULT NULL::character varying,
    "office_hours" varchar(255) DEFAULT NULL::character varying,
    "birth_date" date,
    "address_line1" varchar(255) DEFAULT NULL::character varying,
    "biography" text,
    "education" text,
    "courses_taught" text,
    "photo_url" varchar(255) DEFAULT NULL::character varying,
    "status" "public"."faculty_status",
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "gender" "public"."faculty_gender",
    "age" int8,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21725_primary ON public.faculty USING btree (id)
CREATE UNIQUE INDEX idx_21725_email ON public.faculty USING btree (email);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS failed_import_rows_id_seq;

-- Table Definition
CREATE TABLE "public"."failed_import_rows" (
    "id" int8 NOT NULL DEFAULT nextval('failed_import_rows_id_seq'::regclass),
    "data" text NOT NULL,
    "import_id" numeric NOT NULL,
    "validation_error" text,
    "user_id" int8,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    CONSTRAINT "failed_import_rows_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21739_primary ON public.failed_import_rows USING btree (id)
CREATE INDEX idx_21739_failed_import_rows_import_id_foreign ON public.failed_import_rows USING btree (import_id)
CREATE INDEX idx_21739_failed_import_rows_user_id_foreign ON public.failed_import_rows USING btree (user_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS failed_jobs_id_seq;

-- Table Definition
CREATE TABLE "public"."failed_jobs" (
    "id" int8 NOT NULL DEFAULT nextval('failed_jobs_id_seq'::regclass),
    "uuid" varchar(255) NOT NULL,
    "connection" text NOT NULL,
    "queue" text NOT NULL,
    "payload" text NOT NULL,
    "exception" text NOT NULL,
    "failed_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21746_primary ON public.failed_jobs USING btree (id)
CREATE UNIQUE INDEX idx_21746_failed_jobs_uuid_unique ON public.failed_jobs USING btree (uuid);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS fblog_categories_id_seq;

-- Table Definition
CREATE TABLE "public"."fblog_categories" (
    "id" int8 NOT NULL DEFAULT nextval('fblog_categories_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "slug" varchar(255) NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21754_primary ON public.fblog_categories USING btree (id)
CREATE UNIQUE INDEX idx_21754_fblog_categories_name_unique ON public.fblog_categories USING btree (name)
CREATE UNIQUE INDEX idx_21754_fblog_categories_slug_unique ON public.fblog_categories USING btree (slug);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS fblog_category_fblog_post_id_seq;

-- Table Definition
CREATE TABLE "public"."fblog_category_fblog_post" (
    "id" int8 NOT NULL DEFAULT nextval('fblog_category_fblog_post_id_seq'::regclass),
    "post_id" int8 NOT NULL,
    "category_id" int8 NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    CONSTRAINT "fblog_category_fblog_post_category_id_foreign" FOREIGN KEY ("category_id") REFERENCES "public"."fblog_categories"("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT "fblog_category_fblog_post_post_id_foreign" FOREIGN KEY ("post_id") REFERENCES "public"."fblog_posts"("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21761_primary ON public.fblog_category_fblog_post USING btree (id)
CREATE INDEX idx_21761_fblog_category_fblog_post_category_id_foreign ON public.fblog_category_fblog_post USING btree (category_id)
CREATE INDEX idx_21761_fblog_category_fblog_post_post_id_foreign ON public.fblog_category_fblog_post USING btree (post_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS fblog_comments_id_seq;

-- Table Definition
CREATE TABLE "public"."fblog_comments" (
    "id" int8 NOT NULL DEFAULT nextval('fblog_comments_id_seq'::regclass),
    "user_id" int8 NOT NULL,
    "post_id" int8 NOT NULL,
    "comment" text NOT NULL,
    "approved" bool NOT NULL DEFAULT false,
    "approved_at" timestamptz,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    CONSTRAINT "fblog_comments_post_id_foreign" FOREIGN KEY ("post_id") REFERENCES "public"."fblog_posts"("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21766_primary ON public.fblog_comments USING btree (id)
CREATE INDEX idx_21766_fblog_comments_post_id_foreign ON public.fblog_comments USING btree (post_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS fblog_news_letters_id_seq;

-- Table Definition
CREATE TABLE "public"."fblog_news_letters" (
    "id" int8 NOT NULL DEFAULT nextval('fblog_news_letters_id_seq'::regclass),
    "email" varchar(255) NOT NULL,
    "subscribed" bool NOT NULL DEFAULT true,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21774_primary ON public.fblog_news_letters USING btree (id)
CREATE UNIQUE INDEX idx_21774_fblog_news_letters_email_unique ON public.fblog_news_letters USING btree (email);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS fblog_post_fblog_tag_id_seq;

-- Table Definition
CREATE TABLE "public"."fblog_post_fblog_tag" (
    "id" int8 NOT NULL DEFAULT nextval('fblog_post_fblog_tag_id_seq'::regclass),
    "post_id" int8 NOT NULL,
    "tag_id" int8 NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    CONSTRAINT "fblog_post_fblog_tag_post_id_foreign" FOREIGN KEY ("post_id") REFERENCES "public"."fblog_posts"("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT "fblog_post_fblog_tag_tag_id_foreign" FOREIGN KEY ("tag_id") REFERENCES "public"."fblog_tags"("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21789_primary ON public.fblog_post_fblog_tag USING btree (id)
CREATE INDEX idx_21789_fblog_post_fblog_tag_post_id_foreign ON public.fblog_post_fblog_tag USING btree (post_id)
CREATE INDEX idx_21789_fblog_post_fblog_tag_tag_id_foreign ON public.fblog_post_fblog_tag USING btree (tag_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS fblog_posts_id_seq;
DROP TYPE IF EXISTS "public"."fblog_posts_status";
CREATE TYPE "public"."fblog_posts_status" AS ENUM ('published', 'scheduled', 'pending');

-- Table Definition
CREATE TABLE "public"."fblog_posts" (
    "id" int8 NOT NULL DEFAULT nextval('fblog_posts_id_seq'::regclass),
    "title" varchar(255) NOT NULL,
    "slug" varchar(255) NOT NULL,
    "sub_title" varchar(255) DEFAULT NULL::character varying,
    "body" text NOT NULL,
    "status" "public"."fblog_posts_status" NOT NULL DEFAULT 'pending'::fblog_posts_status,
    "published_at" timestamptz,
    "scheduled_for" timestamptz,
    "cover_photo_path" varchar(255) NOT NULL,
    "photo_alt_text" varchar(255) NOT NULL,
    "user_id" int8 NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    CONSTRAINT "fblog_posts_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21780_primary ON public.fblog_posts USING btree (id)
CREATE INDEX idx_21780_fblog_posts_user_id_foreign ON public.fblog_posts USING btree (user_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS fblog_seo_details_id_seq;

-- Table Definition
CREATE TABLE "public"."fblog_seo_details" (
    "id" int8 NOT NULL DEFAULT nextval('fblog_seo_details_id_seq'::regclass),
    "post_id" int8 NOT NULL,
    "title" varchar(255) NOT NULL,
    "keywords" text,
    "description" text NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    CONSTRAINT "fblog_seo_details_post_id_foreign" FOREIGN KEY ("post_id") REFERENCES "public"."fblog_posts"("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21794_primary ON public.fblog_seo_details USING btree (id)
CREATE INDEX idx_21794_fblog_seo_details_post_id_foreign ON public.fblog_seo_details USING btree (post_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS fblog_settings_id_seq;

-- Table Definition
CREATE TABLE "public"."fblog_settings" (
    "id" int8 NOT NULL DEFAULT nextval('fblog_settings_id_seq'::regclass),
    "title" varchar(255) DEFAULT NULL::character varying,
    "description" text,
    "logo" varchar(255) DEFAULT NULL::character varying,
    "favicon" varchar(255) DEFAULT NULL::character varying,
    "organization_name" varchar(255) DEFAULT NULL::character varying,
    "google_console_code" text,
    "google_analytic_code" text,
    "google_adsense_code" text,
    "quick_links" text,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21801_primary ON public.fblog_settings USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS fblog_share_snippets_id_seq;

-- Table Definition
CREATE TABLE "public"."fblog_share_snippets" (
    "id" int8 NOT NULL DEFAULT nextval('fblog_share_snippets_id_seq'::regclass),
    "script_code" text NOT NULL,
    "html_code" text NOT NULL,
    "active" bool NOT NULL DEFAULT true,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21812_primary ON public.fblog_share_snippets USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS fblog_tags_id_seq;

-- Table Definition
CREATE TABLE "public"."fblog_tags" (
    "id" int8 NOT NULL DEFAULT nextval('fblog_tags_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "slug" varchar(255) NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21820_primary ON public.fblog_tags USING btree (id)
CREATE UNIQUE INDEX idx_21820_fblog_tags_name_unique ON public.fblog_tags USING btree (name)
CREATE UNIQUE INDEX idx_21820_fblog_tags_slug_unique ON public.fblog_tags USING btree (slug);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS feature_segments_id_seq;

-- Table Definition
CREATE TABLE "public"."feature_segments" (
    "id" int8 NOT NULL DEFAULT nextval('feature_segments_id_seq'::regclass),
    "feature" varchar(255) NOT NULL,
    "scope" varchar(255) NOT NULL,
    "values" text NOT NULL,
    "active" bool NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21834_primary ON public.feature_segments USING btree (id)
CREATE UNIQUE INDEX idx_21834_feature_segments_feature_scope_active_unique ON public.feature_segments USING btree (feature, scope, active);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS features_id_seq;

-- Table Definition
CREATE TABLE "public"."features" (
    "id" int8 NOT NULL DEFAULT nextval('features_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "scope" varchar(255) NOT NULL,
    "value" text NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21827_primary ON public.features USING btree (id)
CREATE UNIQUE INDEX idx_21827_features_name_scope_unique ON public.features USING btree (name, scope);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS feedbacks_id_seq;

-- Table Definition
CREATE TABLE "public"."feedbacks" (
    "id" int8 NOT NULL DEFAULT nextval('feedbacks_id_seq'::regclass),
    "type" varchar(255) NOT NULL,
    "message" text NOT NULL,
    "user_info" text,
    "reviewed" bool NOT NULL DEFAULT false,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21841_primary ON public.feedbacks USING btree (id)
CREATE INDEX idx_21841_feedbacks_type_index ON public.feedbacks USING btree (type);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS filachat_agents_id_seq;

-- Table Definition
CREATE TABLE "public"."filachat_agents" (
    "id" int8 NOT NULL DEFAULT nextval('filachat_agents_id_seq'::regclass),
    "agentable_id" numeric NOT NULL,
    "agentable_type" varchar(255) NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21849_primary ON public.filachat_agents USING btree (id)
CREATE UNIQUE INDEX idx_21849_filachat_agents_agentable_id_agentable_type_unique ON public.filachat_agents USING btree (agentable_id, agentable_type);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS filachat_conversations_id_seq;

-- Table Definition
CREATE TABLE "public"."filachat_conversations" (
    "id" int8 NOT NULL DEFAULT nextval('filachat_conversations_id_seq'::regclass),
    "senderable_id" numeric NOT NULL,
    "senderable_type" varchar(255) NOT NULL,
    "receiverable_id" numeric NOT NULL,
    "receiverable_type" varchar(255) NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21856_primary ON public.filachat_conversations USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS filachat_messages_id_seq;

-- Table Definition
CREATE TABLE "public"."filachat_messages" (
    "id" int8 NOT NULL DEFAULT nextval('filachat_messages_id_seq'::regclass),
    "filachat_conversation_id" numeric NOT NULL,
    "message" text,
    "attachments" text,
    "original_attachment_file_names" text,
    "reactions" text,
    "is_starred" bool NOT NULL DEFAULT false,
    "metadata" text,
    "reply_to_message_id" numeric,
    "senderable_id" numeric NOT NULL,
    "senderable_type" varchar(255) NOT NULL,
    "receiverable_id" numeric NOT NULL,
    "receiverable_type" varchar(255) NOT NULL,
    "last_read_at" timestamptz,
    "edited_at" timestamptz,
    "sender_deleted_at" timestamptz,
    "receiver_deleted_at" timestamptz,
    "deleted_at" timestamptz,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21863_primary ON public.filachat_messages USING btree (id)
CREATE INDEX idx_21863_filachat_messages_filachat_conversation_id_foreign ON public.filachat_messages USING btree (filachat_conversation_id)
CREATE INDEX idx_21863_filachat_messages_receiverable_id_receiverable_type_i ON public.filachat_messages USING btree (receiverable_id, receiverable_type)
CREATE INDEX idx_21863_filachat_messages_reply_to_message_id_foreign ON public.filachat_messages USING btree (reply_to_message_id)
CREATE INDEX idx_21863_filachat_messages_senderable_id_senderable_type_index ON public.filachat_messages USING btree (senderable_id, senderable_type);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS filament_email_log_id_seq;

-- Table Definition
CREATE TABLE "public"."filament_email_log" (
    "id" int8 NOT NULL DEFAULT nextval('filament_email_log_id_seq'::regclass),
    "from" varchar(255) DEFAULT NULL::character varying,
    "to" varchar(255) DEFAULT NULL::character varying,
    "cc" varchar(255) DEFAULT NULL::character varying,
    "bcc" varchar(255) DEFAULT NULL::character varying,
    "subject" varchar(255) DEFAULT NULL::character varying,
    "text_body" text,
    "html_body" text,
    "raw_body" text,
    "sent_debug_info" text,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21871_primary ON public.filament_email_log USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS filament_exceptions_table_id_seq;

-- Table Definition
CREATE TABLE "public"."filament_exceptions_table" (
    "id" int8 NOT NULL DEFAULT nextval('filament_exceptions_table_id_seq'::regclass),
    "type" varchar(255) NOT NULL,
    "code" varchar(255) NOT NULL,
    "message" text NOT NULL,
    "file" varchar(255) NOT NULL,
    "line" int8 NOT NULL,
    "trace" text NOT NULL,
    "method" varchar(255) NOT NULL,
    "path" varchar(255) NOT NULL,
    "query" text NOT NULL,
    "body" text NOT NULL,
    "cookies" text NOT NULL,
    "headers" text NOT NULL,
    "ip" varchar(255) NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21883_primary ON public.filament_exceptions_table USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS fileponds_id_seq;

-- Table Definition
CREATE TABLE "public"."fileponds" (
    "id" int8 NOT NULL DEFAULT nextval('fileponds_id_seq'::regclass),
    "filename" varchar(255) NOT NULL,
    "filepath" varchar(255) NOT NULL,
    "extension" varchar(100) NOT NULL,
    "mimetypes" varchar(100) NOT NULL,
    "disk" varchar(100) NOT NULL,
    "created_by" numeric,
    "expires_at" timestamptz,
    "deleted_at" timestamptz,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21890_primary ON public.fileponds USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS general_settings_id_seq;

-- Table Definition
CREATE TABLE "public"."general_settings" (
    "id" int8 NOT NULL DEFAULT nextval('general_settings_id_seq'::regclass),
    "site_name" varchar(255) DEFAULT NULL::character varying,
    "site_description" text,
    "theme_color" varchar(255) DEFAULT NULL::character varying,
    "support_email" varchar(255) DEFAULT NULL::character varying,
    "support_phone" varchar(255) DEFAULT NULL::character varying,
    "google_analytics_id" varchar(255) DEFAULT NULL::character varying,
    "posthog_html_snippet" varchar(255) DEFAULT NULL::character varying,
    "seo_title" varchar(255) DEFAULT NULL::character varying,
    "seo_keywords" varchar(255) DEFAULT NULL::character varying,
    "seo_metadata" text,
    "email_settings" text,
    "email_from_address" varchar(255) DEFAULT NULL::character varying,
    "email_from_name" varchar(255) DEFAULT NULL::character varying,
    "social_network" text,
    "more_configs" text,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    "school_starting_date" varchar(255) DEFAULT NULL::character varying,
    "school_ending_date" varchar(255) DEFAULT NULL::character varying,
    "school_portal_url" varchar(255) DEFAULT NULL::character varying,
    "school_portal_enabled" bool,
    "online_enrollment_enabled" bool,
    "school_portal_maintenance" bool,
    "semester" varchar(255) NOT NULL DEFAULT '1'::character varying,
    "enrollment_courses" text,
    "school_portal_logo" varchar(255) DEFAULT NULL::character varying,
    "school_portal_favicon" varchar(255) DEFAULT NULL::character varying,
    "school_portal_title" varchar(255) DEFAULT NULL::character varying,
    "school_portal_description" varchar(255) DEFAULT NULL::character varying,
    "enable_clearance_check" bool NOT NULL DEFAULT false,
    "enable_signatures" bool NOT NULL DEFAULT false,
    "enable_qr_codes" varchar(255) DEFAULT NULL::character varying,
    "enable_public_transactions" varchar(255) DEFAULT NULL::character varying,
    "enable_support_page" varchar(255) NOT NULL DEFAULT 'false'::character varying,
    "features" text,
    "curriculum_year" varchar(255) DEFAULT NULL::character varying,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21897_primary ON public.general_settings USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS guest_education_id_id_seq;

-- Table Definition
CREATE TABLE "public"."guest_education_id" (
    "id" int8 NOT NULL DEFAULT nextval('guest_education_id_id_seq'::regclass),
    "elementaryschoolname" varchar(255) DEFAULT NULL::character varying,
    "elementarygraduationyear" int8,
    "seniorhighschoolname" varchar(255) DEFAULT NULL::character varying,
    "seniorhighgraduationyear" int8,
    "elementaryschooladdress" varchar(255) DEFAULT NULL::character varying,
    "seniorhighschooladdress" varchar(255) DEFAULT NULL::character varying,
    "juniorhighschoolname" varchar(255) DEFAULT NULL::character varying,
    "juniorhighgraduationyear" int8,
    "juniorhighschooladdress" varchar(255) DEFAULT NULL::character varying,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21937_primary ON public.guest_education_id USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS guest_enrollments_id_seq;

-- Table Definition
CREATE TABLE "public"."guest_enrollments" (
    "id" int8 NOT NULL DEFAULT nextval('guest_enrollments_id_seq'::regclass),
    "selected_course" int8,
    "academic_year" int8,
    "selected_semester" int8,
    "geust_education_id" int8,
    "special_skills" text,
    "guest_parents_id" int8,
    "guest_guardian_id" int8,
    "guest_documents_id" int8,
    "guest_tuition_id" int8,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "student_id" int8,
    "guest_email" varchar(255) DEFAULT NULL::character varying,
    "status" varchar(255) DEFAULT NULL::character varying,
    "selected_subjects" int8,
    "deleted_at" timestamptz,
    "type" varchar(255) DEFAULT NULL::character varying,
    "guest_personal_info_id" int8,
    "downpayment" int8,
    "school_year" varchar(255) DEFAULT NULL::character varying,
    "semester" varchar(255) DEFAULT NULL::character varying,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21950_primary ON public.guest_enrollments USING btree (id)
CREATE INDEX idx_21950_fk_guest_enrollments_guest_education_id ON public.guest_enrollments USING btree (geust_education_id)
CREATE INDEX idx_21950_fk_guest_enrolments_guest_guardian_contact ON public.guest_enrollments USING btree (guest_guardian_id)
CREATE INDEX idx_21950_idx_guest_enrollments_guest_documents_id ON public.guest_enrollments USING btree (guest_documents_id)
CREATE INDEX idx_21950_idx_guest_enrollments_guest_tuition_id ON public.guest_enrollments USING btree (guest_tuition_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS guest_guardian_contact_id_seq;

-- Table Definition
CREATE TABLE "public"."guest_guardian_contact" (
    "id" int8 NOT NULL DEFAULT nextval('guest_guardian_contact_id_seq'::regclass),
    "emergencycontactname" varchar(255) DEFAULT NULL::character varying,
    "emergencycontactphone" int8,
    "emergencycontactaddress" text,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21964_primary ON public.guest_guardian_contact USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS guest_personal_info_id_seq;

-- Table Definition
CREATE TABLE "public"."guest_personal_info" (
    "id" int8 NOT NULL DEFAULT nextval('guest_personal_info_id_seq'::regclass),
    "firstname" varchar(255) DEFAULT NULL::character varying,
    "middleinitial" varchar(255) DEFAULT NULL::character varying,
    "lastname" varchar(255) DEFAULT NULL::character varying,
    "birthdate" date,
    "birthplace" varchar(255) DEFAULT NULL::character varying,
    "citizenship" varchar(255) DEFAULT NULL::character varying,
    "religion" varchar(255) DEFAULT NULL::character varying,
    "sex" varchar(255) DEFAULT NULL::character varying,
    "civilstatus" varchar(255) DEFAULT NULL::character varying,
    "weight" int8,
    "height" int8,
    "currentaddress" text,
    "permanentaddress" text,
    "inputemail" varchar(255) DEFAULT NULL::character varying,
    "phone" int8,
    "age" int8,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21972_primary ON public.guest_personal_info USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS guest_tuition_id_seq;

-- Table Definition
CREATE TABLE "public"."guest_tuition" (
    "id" int8 NOT NULL DEFAULT nextval('guest_tuition_id_seq'::regclass),
    "totaltuition" int8,
    "downpayment" int8,
    "totalbalance" int8,
    "payment_method" varchar(255) DEFAULT NULL::character varying,
    "due_date" date,
    "invoice_uuid" varchar(255) DEFAULT NULL::character varying,
    "total_lecture" int8,
    "total_laboratory" int8,
    "miscellaneous" int8,
    "overall_total" int8,
    "discount" varchar(255) DEFAULT NULL::character varying,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21988_primary ON public.guest_tuition USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS guests_parents_info_id_seq;

-- Table Definition
CREATE TABLE "public"."guests_parents_info" (
    "id" int8 NOT NULL DEFAULT nextval('guests_parents_info_id_seq'::regclass),
    "fathersname" varchar(255) DEFAULT NULL::character varying,
    "mothersname" varchar(255) DEFAULT NULL::character varying,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21928_primary ON public.guests_parents_info USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS health_check_result_history_items_id_seq;

-- Table Definition
CREATE TABLE "public"."health_check_result_history_items" (
    "id" int8 NOT NULL DEFAULT nextval('health_check_result_history_items_id_seq'::regclass),
    "check_name" varchar(255) NOT NULL,
    "check_label" varchar(255) NOT NULL,
    "status" varchar(255) NOT NULL,
    "notification_message" text,
    "short_summary" varchar(255) DEFAULT NULL::character varying,
    "meta" text NOT NULL,
    "ended_at" timestamptz NOT NULL,
    "batch" varchar(255) NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_21998_primary ON public.health_check_result_history_items USING btree (id)
CREATE INDEX idx_21998_health_check_result_history_items_batch_index ON public.health_check_result_history_items USING btree (batch)
CREATE INDEX idx_21998_health_check_result_history_items_created_at_index ON public.health_check_result_history_items USING btree (created_at);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS imports_id_seq;

-- Table Definition
CREATE TABLE "public"."imports" (
    "id" int8 NOT NULL DEFAULT nextval('imports_id_seq'::regclass),
    "completed_at" timestamptz,
    "file_name" varchar(255) NOT NULL,
    "file_path" varchar(255) NOT NULL,
    "importer" varchar(255) NOT NULL,
    "processed_rows" int8 NOT NULL DEFAULT '0'::bigint,
    "total_rows" int8 NOT NULL,
    "successful_rows" int8 NOT NULL DEFAULT '0'::bigint,
    "user_id" numeric NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22006_primary ON public.imports USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."job_batches" (
    "id" varchar(255) NOT NULL,
    "name" varchar(255) NOT NULL,
    "total_jobs" int8 NOT NULL,
    "pending_jobs" int8 NOT NULL,
    "failed_jobs" int8 NOT NULL,
    "failed_job_ids" text NOT NULL,
    "options" text,
    "cancelled_at" int8,
    "created_at" int8 NOT NULL,
    "finished_at" int8,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22021_primary ON public.job_batches USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS jobs_id_seq;

-- Table Definition
CREATE TABLE "public"."jobs" (
    "id" int8 NOT NULL DEFAULT nextval('jobs_id_seq'::regclass),
    "queue" varchar(255) NOT NULL,
    "payload" text NOT NULL,
    "attempts" int8 NOT NULL,
    "reserved_at" int8,
    "available_at" int8 NOT NULL,
    "created_at" int8 NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22015_primary ON public.jobs USING btree (id)
CREATE INDEX idx_22015_jobs_queue_index ON public.jobs USING btree (queue);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."label_ticket" (
    "label_id" numeric NOT NULL,
    "ticket_id" numeric NOT NULL
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS labels_id_seq;

-- Table Definition
CREATE TABLE "public"."labels" (
    "id" int8 NOT NULL DEFAULT nextval('labels_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "slug" varchar(255) NOT NULL,
    "is_visible" bool NOT NULL DEFAULT true,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22027_primary ON public.labels USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS layouts_id_seq;

-- Table Definition
CREATE TABLE "public"."layouts" (
    "id" int8 NOT NULL DEFAULT nextval('layouts_id_seq'::regclass),
    "user_id" varchar(255) NOT NULL,
    "layout_title" varchar(255) NOT NULL,
    "layout_slug" varchar(255) NOT NULL,
    "widgets" text NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    "deleted_at" timestamptz,
    "is_active" bool NOT NULL DEFAULT true,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22040_primary ON public.layouts USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS mail_logs_id_seq;

-- Table Definition
CREATE TABLE "public"."mail_logs" (
    "id" int8 NOT NULL DEFAULT nextval('mail_logs_id_seq'::regclass),
    "from" varchar(255) DEFAULT NULL::character varying,
    "to" varchar(255) DEFAULT NULL::character varying,
    "cc" varchar(255) DEFAULT NULL::character varying,
    "bcc" varchar(255) DEFAULT NULL::character varying,
    "subject" varchar(255) NOT NULL,
    "body" text NOT NULL,
    "headers" text,
    "attachments" text,
    "message_id" varchar(255) DEFAULT NULL::character varying,
    "status" varchar(255) DEFAULT NULL::character varying,
    "data" text,
    "opened" timestamptz,
    "delivered" timestamptz,
    "complaint" timestamptz,
    "bounced" timestamptz,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22048_primary ON public.mail_logs USING btree (id)
CREATE INDEX idx_22048_mail_logs_message_id_index ON public.mail_logs USING btree (message_id)
CREATE INDEX idx_22048_mail_logs_status_index ON public.mail_logs USING btree (status);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS media_id_seq;

-- Table Definition
CREATE TABLE "public"."media" (
    "id" int8 NOT NULL DEFAULT nextval('media_id_seq'::regclass),
    "model_type" varchar(255) NOT NULL,
    "model_id" numeric NOT NULL,
    "uuid" bpchar(36) DEFAULT NULL::bpchar,
    "collection_name" varchar(255) NOT NULL,
    "name" varchar(255) NOT NULL,
    "file_name" varchar(255) NOT NULL,
    "mime_type" varchar(255) DEFAULT NULL::character varying,
    "disk" varchar(255) NOT NULL,
    "conversions_disk" varchar(255) DEFAULT NULL::character varying,
    "size" numeric NOT NULL,
    "manipulations" text NOT NULL,
    "custom_properties" text NOT NULL,
    "generated_conversions" text NOT NULL,
    "responsive_images" text NOT NULL,
    "order_column" int8,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22061_primary ON public.media USING btree (id)
CREATE INDEX idx_22061_media_model_type_model_id_index ON public.media USING btree (model_type, model_id)
CREATE INDEX idx_22061_media_order_column_index ON public.media USING btree (order_column)
CREATE UNIQUE INDEX idx_22061_media_uuid_unique ON public.media USING btree (uuid);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS messages_id_seq;

-- Table Definition
CREATE TABLE "public"."messages" (
    "id" int8 NOT NULL DEFAULT nextval('messages_id_seq'::regclass),
    "user_id" numeric NOT NULL,
    "ticket_id" numeric NOT NULL,
    "message" text NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22071_primary ON public.messages USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS migrations_id_seq;

-- Table Definition
CREATE TABLE "public"."migrations" (
    "id" int8 NOT NULL DEFAULT nextval('migrations_id_seq'::regclass),
    "migration" varchar(255) NOT NULL,
    "batch" int8 NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22078_primary ON public.migrations USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."model_has_permissions" (
    "permission_id" numeric NOT NULL,
    "model_type" varchar(255) NOT NULL,
    "model_id" numeric NOT NULL,
    PRIMARY KEY ("permission_id","model_id","model_type")
);


-- Indices
CREATE UNIQUE INDEX idx_22082_primary ON public.model_has_permissions USING btree (permission_id, model_id, model_type)
CREATE INDEX idx_22082_model_has_permissions_model_id_model_type_index ON public.model_has_permissions USING btree (model_id, model_type);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."model_has_roles" (
    "role_id" numeric NOT NULL,
    "model_type" varchar(255) NOT NULL,
    "model_id" numeric NOT NULL,
    PRIMARY KEY ("role_id","model_id","model_type")
);


-- Indices
CREATE UNIQUE INDEX idx_22087_primary ON public.model_has_roles USING btree (role_id, model_id, model_type)
CREATE INDEX idx_22087_model_has_roles_model_id_model_type_index ON public.model_has_roles USING btree (model_id, model_type);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."notifications" (
    "id" varchar(255) NOT NULL,
    "type" varchar(255) NOT NULL,
    "notifiable_type" varchar(255) NOT NULL,
    "notifiable_id" int8 NOT NULL,
    "data" jsonb NOT NULL,
    "read_at" timestamptz,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22092_primary ON public.notifications USING btree (id)
CREATE INDEX idx_22092_notifications_notifiable_type_notifiable_id_index ON public.notifications USING btree (notifiable_type, notifiable_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS old_user_emails_id_seq;

-- Table Definition
CREATE TABLE "public"."old_user_emails" (
    "id" int8 NOT NULL DEFAULT nextval('old_user_emails_id_seq'::regclass),
    "user_type" varchar(255) NOT NULL,
    "user_id" numeric NOT NULL,
    "email" varchar(255) NOT NULL,
    "token" varchar(255) NOT NULL,
    "created_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22098_primary ON public.old_user_emails USING btree (id)
CREATE INDEX idx_22098_old_user_emails_email_index ON public.old_user_emails USING btree (email)
CREATE INDEX idx_22098_old_user_emails_user_type_user_id_index ON public.old_user_emails USING btree (user_type, user_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."password_reset_tokens" (
    "email" varchar(255) NOT NULL,
    "token" varchar(255) NOT NULL,
    "created_at" timestamptz,
    PRIMARY KEY ("email")
);


-- Indices
CREATE UNIQUE INDEX idx_22104_primary ON public.password_reset_tokens USING btree (email);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS pending_user_emails_id_seq;

-- Table Definition
CREATE TABLE "public"."pending_user_emails" (
    "id" int8 NOT NULL DEFAULT nextval('pending_user_emails_id_seq'::regclass),
    "user_type" varchar(255) NOT NULL,
    "user_id" numeric NOT NULL,
    "email" varchar(255) NOT NULL,
    "token" varchar(255) NOT NULL,
    "created_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22110_primary ON public.pending_user_emails USING btree (id)
CREATE INDEX idx_22110_pending_user_emails_email_index ON public.pending_user_emails USING btree (email)
CREATE INDEX idx_22110_pending_user_emails_user_type_user_id_index ON public.pending_user_emails USING btree (user_type, user_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS permission_type_id_seq;

-- Table Definition
CREATE TABLE "public"."permission_type" (
    "id" int8 NOT NULL DEFAULT nextval('permission_type_id_seq'::regclass),
    "permission_array" int8,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22124_primary ON public.permission_type USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS permissions_id_seq;

-- Table Definition
CREATE TABLE "public"."permissions" (
    "id" int8 NOT NULL DEFAULT nextval('permissions_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "guard_name" varchar(255) NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22117_primary ON public.permissions USING btree (id)
CREATE UNIQUE INDEX idx_22117_permissions_name_guard_name_unique ON public.permissions USING btree (name, guard_name);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS personal_access_tokens_id_seq;

-- Table Definition
CREATE TABLE "public"."personal_access_tokens" (
    "id" int8 NOT NULL DEFAULT nextval('personal_access_tokens_id_seq'::regclass),
    "tokenable_type" varchar(255) NOT NULL,
    "tokenable_id" numeric NOT NULL,
    "name" varchar(255) NOT NULL,
    "token" varchar(64) NOT NULL,
    "abilities" text,
    "last_used_at" timestamptz,
    "expires_at" timestamptz,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22129_primary ON public.personal_access_tokens USING btree (id)
CREATE UNIQUE INDEX idx_22129_personal_access_tokens_token_unique ON public.personal_access_tokens USING btree (token)
CREATE INDEX idx_22129_personal_access_tokens_tokenable_type_tokenable_id_in ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS process_approval_flow_steps_id_seq;
DROP TYPE IF EXISTS "public"."process_approval_flow_steps_action";
CREATE TYPE "public"."process_approval_flow_steps_action" AS ENUM ('APPROVE', 'VERIFY', 'CHECK');

-- Table Definition
CREATE TABLE "public"."process_approval_flow_steps" (
    "id" int8 NOT NULL DEFAULT nextval('process_approval_flow_steps_id_seq'::regclass),
    "process_approval_flow_id" numeric NOT NULL,
    "role_id" numeric NOT NULL,
    "permissions" text,
    "order" int8,
    "action" "public"."process_approval_flow_steps_action" NOT NULL DEFAULT 'APPROVE'::process_approval_flow_steps_action,
    "active" int2 NOT NULL DEFAULT '1'::smallint,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22136_primary ON public.process_approval_flow_steps USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS projects_id_seq;

-- Table Definition
CREATE TABLE "public"."projects" (
    "id" int8 NOT NULL DEFAULT nextval('projects_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "hourly_rate" numeric(8,2) NOT NULL,
    "client_id" numeric NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22145_primary ON public.projects USING btree (id)
CREATE INDEX idx_22145_projects_client_id_foreign ON public.projects USING btree (client_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS pulse_aggregates_id_seq;

-- Table Definition
CREATE TABLE "public"."pulse_aggregates" (
    "id" int8 NOT NULL DEFAULT nextval('pulse_aggregates_id_seq'::regclass),
    "bucket" int8 NOT NULL,
    "period" int8 NOT NULL,
    "type" varchar(255) NOT NULL,
    "key" text NOT NULL,
    "key_hash" varchar(255) NOT NULL,
    "aggregate" varchar(255) NOT NULL,
    "value" numeric(8,2) NOT NULL,
    "count" int8,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22152_primary ON public.pulse_aggregates USING btree (id)
CREATE UNIQUE INDEX idx_22152_pulse_aggregates_bucket_period_type_aggregate_key_has ON public.pulse_aggregates USING btree (bucket, period, type, aggregate, key_hash)
CREATE INDEX idx_22152_pulse_aggregates_period_bucket_index ON public.pulse_aggregates USING btree (period, bucket)
CREATE INDEX idx_22152_pulse_aggregates_period_type_aggregate_bucket_index ON public.pulse_aggregates USING btree (period, type, aggregate, bucket)
CREATE INDEX idx_22152_pulse_aggregates_type_index ON public.pulse_aggregates USING btree (type);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS pulse_entries_id_seq;

-- Table Definition
CREATE TABLE "public"."pulse_entries" (
    "id" int8 NOT NULL DEFAULT nextval('pulse_entries_id_seq'::regclass),
    "timestamp" int8 NOT NULL,
    "type" varchar(255) NOT NULL,
    "key" text NOT NULL,
    "key_hash" varchar(255) NOT NULL,
    "value" int8,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22159_primary ON public.pulse_entries USING btree (id)
CREATE INDEX idx_22159_pulse_entries_key_hash_index ON public.pulse_entries USING btree (key_hash)
CREATE INDEX idx_22159_pulse_entries_timestamp_index ON public.pulse_entries USING btree ("timestamp")
CREATE INDEX idx_22159_pulse_entries_timestamp_type_key_hash_value_index ON public.pulse_entries USING btree ("timestamp", type, key_hash, value)
CREATE INDEX idx_22159_pulse_entries_type_index ON public.pulse_entries USING btree (type);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS pulse_values_id_seq;

-- Table Definition
CREATE TABLE "public"."pulse_values" (
    "id" int8 NOT NULL DEFAULT nextval('pulse_values_id_seq'::regclass),
    "timestamp" int8 NOT NULL,
    "type" varchar(255) NOT NULL,
    "key" text NOT NULL,
    "key_hash" varchar(255) NOT NULL,
    "value" text NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22166_primary ON public.pulse_values USING btree (id)
CREATE INDEX idx_22166_pulse_values_timestamp_index ON public.pulse_values USING btree ("timestamp")
CREATE INDEX idx_22166_pulse_values_type_index ON public.pulse_values USING btree (type)
CREATE UNIQUE INDEX idx_22166_pulse_values_type_key_hash_unique ON public.pulse_values USING btree (type, key_hash);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS resource_logs_id_seq;

-- Table Definition
CREATE TABLE "public"."resource_logs" (
    "id" int8 NOT NULL DEFAULT nextval('resource_logs_id_seq'::regclass),
    "resource" varchar(255) NOT NULL,
    "log" varchar(255) NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22173_primary ON public.resource_logs USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS resources_id_seq;

-- Table Definition
CREATE TABLE "public"."resources" (
    "id" int8 NOT NULL DEFAULT nextval('resources_id_seq'::regclass),
    "resourceable_type" varchar(255) NOT NULL,
    "resourceable_id" int8 NOT NULL,
    "type" varchar(255) NOT NULL,
    "file_path" varchar(255) NOT NULL,
    "file_name" varchar(255) NOT NULL,
    "mime_type" varchar(255),
    "disk" varchar(255) NOT NULL DEFAULT 'public'::character varying,
    "file_size" int8,
    "metadata" json,
    "created_at" timestamp(0),
    "updated_at" timestamp(0),
    PRIMARY KEY ("id")
);


-- Indices
CREATE INDEX resources_resourceable_type_resourceable_id_index ON public.resources USING btree (resourceable_type, resourceable_id)
CREATE INDEX resources_resourceable_type_resourceable_id_type_index ON public.resources USING btree (resourceable_type, resourceable_id, type);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."role_has_permissions" (
    "permission_id" numeric NOT NULL,
    "role_id" numeric NOT NULL,
    PRIMARY KEY ("permission_id","role_id")
);


-- Indices
CREATE UNIQUE INDEX idx_22186_primary ON public.role_has_permissions USING btree (permission_id, role_id)
CREATE INDEX idx_22186_role_has_permissions_role_id_foreign ON public.role_has_permissions USING btree (role_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS roles_id_seq;

-- Table Definition
CREATE TABLE "public"."roles" (
    "id" int8 NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "guard_name" varchar(255) NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22180_primary ON public.roles USING btree (id)
CREATE UNIQUE INDEX idx_22180_roles_name_guard_name_unique ON public.roles USING btree (name, guard_name);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS rooms_id_seq;

-- Table Definition
CREATE TABLE "public"."rooms" (
    "id" int8 NOT NULL DEFAULT nextval('rooms_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "class_code" varchar(255) NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22192_primary ON public.rooms USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS route_statistics_id_seq;

-- Table Definition
CREATE TABLE "public"."route_statistics" (
    "id" int8 NOT NULL DEFAULT nextval('route_statistics_id_seq'::regclass),
    "user_id" int8,
    "team_id" int8,
    "method" varchar(255) DEFAULT NULL::character varying,
    "route" varchar(255) DEFAULT NULL::character varying,
    "status" int8,
    "ip" varchar(255) DEFAULT NULL::character varying,
    "date" timestamptz NOT NULL,
    "counter" int8 NOT NULL,
    CONSTRAINT "route_statistics_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22199_primary ON public.route_statistics USING btree (id)
CREATE INDEX idx_22199_route_statistics_date_index ON public.route_statistics USING btree (date)
CREATE INDEX idx_22199_route_statistics_route_method_date_index ON public.route_statistics USING btree (route, method, date)
CREATE INDEX idx_22199_route_statistics_team_id_date_route_method_index ON public.route_statistics USING btree (team_id, date, route, method)
CREATE INDEX idx_22199_route_statistics_user_id_date_route_method_index ON public.route_statistics USING btree (user_id, date, route, method);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS schedule_id_seq;

-- Table Definition
CREATE TABLE "public"."schedule" (
    "id" int8 NOT NULL DEFAULT nextval('schedule_id_seq'::regclass),
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" timestamptz,
    "day_of_week" varchar(255) NOT NULL,
    "start_time" time NOT NULL,
    "end_time" time NOT NULL,
    "class_id" int8,
    "room_id" int8,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22209_primary ON public.schedule USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS seo_id_seq;

-- Table Definition
CREATE TABLE "public"."seo" (
    "id" int8 NOT NULL DEFAULT nextval('seo_id_seq'::regclass),
    "model_type" varchar(255) NOT NULL,
    "model_id" numeric NOT NULL,
    "description" text,
    "title" varchar(255) DEFAULT NULL::character varying,
    "image" varchar(255) DEFAULT NULL::character varying,
    "author" varchar(255) DEFAULT NULL::character varying,
    "robots" varchar(255) DEFAULT NULL::character varying,
    "canonical_url" varchar(255) DEFAULT NULL::character varying,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22215_primary ON public.seo USING btree (id)
CREATE INDEX idx_22215_seo_model_type_model_id_index ON public.seo USING btree (model_type, model_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS server_metrics_id_seq;

-- Table Definition
CREATE TABLE "public"."server_metrics" (
    "id" int8 NOT NULL DEFAULT nextval('server_metrics_id_seq'::regclass),
    "cpu_load" int8 NOT NULL,
    "memory_usage" int8 NOT NULL,
    "disk_usage" text NOT NULL,
    "site_id" int8 NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22227_primary ON public.server_metrics USING btree (id)
CREATE INDEX idx_22227_server_metrics_site_id_foreign ON public.server_metrics USING btree (site_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."sessions" (
    "id" varchar(255) NOT NULL,
    "user_id" int8,
    "ip_address" varchar(255) DEFAULT NULL::character varying,
    "user_agent" text,
    "payload" text NOT NULL,
    "last_activity" int8 NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22233_primary ON public.sessions USING btree (id)
CREATE INDEX idx_22233_sessions_last_activity_index ON public.sessions USING btree (last_activity)
CREATE INDEX idx_22233_sessions_user_id_index ON public.sessions USING btree (user_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS settings_id_seq;

-- Table Definition
CREATE TABLE "public"."settings" (
    "id" int8 NOT NULL DEFAULT nextval('settings_id_seq'::regclass),
    "group" varchar(255) NOT NULL,
    "name" varchar(255) NOT NULL,
    "locked" bool NOT NULL DEFAULT false,
    "payload" text NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22240_primary ON public.settings USING btree (id)
CREATE UNIQUE INDEX idx_22240_settings_group_name_unique ON public.settings USING btree ("group", name);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS shetabit_visits_id_seq;

-- Table Definition
CREATE TABLE "public"."shetabit_visits" (
    "id" int8 NOT NULL DEFAULT nextval('shetabit_visits_id_seq'::regclass),
    "method" varchar(255) DEFAULT NULL::character varying,
    "request" text,
    "url" text,
    "referer" text,
    "languages" text,
    "useragent" text,
    "headers" text,
    "device" text,
    "platform" text,
    "browser" text,
    "ip" varchar(45) DEFAULT NULL::character varying,
    "visitable_type" varchar(255) DEFAULT NULL::character varying,
    "visitable_id" numeric,
    "visitor_type" varchar(255) DEFAULT NULL::character varying,
    "visitor_id" numeric,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22248_primary ON public.shetabit_visits USING btree (id)
CREATE INDEX idx_22248_shetabit_visits_visitable_type_visitable_id_index ON public.shetabit_visits USING btree (visitable_type, visitable_id)
CREATE INDEX idx_22248_shetabit_visits_visitor_type_visitor_id_index ON public.shetabit_visits USING btree (visitor_type, visitor_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS shs_students_id_seq;

-- Table Definition
CREATE TABLE "public"."shs_students" (
    "id" int8 NOT NULL DEFAULT nextval('shs_students_id_seq'::regclass),
    "student_lrn" varchar(255) DEFAULT NULL::character varying,
    "fullname" varchar(255) DEFAULT NULL::character varying,
    "civil_status" varchar(255) DEFAULT NULL::character varying,
    "religion" varchar(255) DEFAULT NULL::character varying,
    "nationality" varchar(255) DEFAULT NULL::character varying,
    "birthdate" varchar(11) DEFAULT NULL::character varying,
    "guardian_name" varchar(255) DEFAULT NULL::character varying,
    "guardian_contact" varchar(255) DEFAULT NULL::character varying,
    "student_contact" varchar(255) DEFAULT NULL::character varying,
    "complete_address" varchar(255) DEFAULT NULL::character varying,
    "grade_level" varchar(255) DEFAULT NULL::character varying,
    "track" varchar(255) DEFAULT NULL::character varying,
    "gender" varchar(255) DEFAULT NULL::character varying,
    "email" varchar(255) DEFAULT NULL::character varying,
    "remarks" varchar(255) DEFAULT NULL::character varying,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    "strand_id" int8,
    "track_id" int8,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22259_primary ON public.shs_students USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS shs_tracks_id_seq;

-- Table Definition
CREATE TABLE "public"."shs_tracks" (
    "id" int8 NOT NULL DEFAULT nextval('shs_tracks_id_seq'::regclass),
    "track_name" varchar(255) NOT NULL,
    "description" varchar(255) DEFAULT NULL::character varying,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22281_primary ON public.shs_tracks USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS sites_id_seq;

-- Table Definition
CREATE TABLE "public"."sites" (
    "id" int8 NOT NULL DEFAULT nextval('sites_id_seq'::regclass),
    "url" varchar(255) NOT NULL,
    "name" varchar(255) NOT NULL,
    "uptime_check_enabled" bool NOT NULL DEFAULT true,
    "ssl_certificate_check_enabled" bool NOT NULL DEFAULT true,
    "max_request_duration_ms" int8 NOT NULL DEFAULT '1000'::bigint,
    "down_for_maintenance_at" timestamptz,
    "server_monitoring_notification_enabled" bool NOT NULL DEFAULT false,
    "cpu_limit" int8,
    "ram_limit" int8,
    "disk_limit" int8,
    "api_token" varchar(255) DEFAULT NULL::character varying,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22289_primary ON public.sites USING btree (id)
CREATE UNIQUE INDEX idx_22289_sites_url_unique ON public.sites USING btree (url);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."social_provider_user" (
    "user_id" int8 NOT NULL,
    "provider_slug" varchar(255) NOT NULL,
    "provider_user_id" varchar(255) NOT NULL,
    "nickname" varchar(255) DEFAULT NULL::character varying,
    "name" varchar(255) DEFAULT NULL::character varying,
    "email" varchar(255) DEFAULT NULL::character varying,
    "avatar" varchar(255) DEFAULT NULL::character varying,
    "provider_data" text,
    "token" varchar(255) NOT NULL,
    "refresh_token" varchar(255) DEFAULT NULL::character varying,
    "token_expires_at" timestamptz,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("user_id","provider_slug")
);


-- Indices
CREATE UNIQUE INDEX idx_22300_primary ON public.social_provider_user USING btree (user_id, provider_slug);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS ssl_certificate_checks_id_seq;

-- Table Definition
CREATE TABLE "public"."ssl_certificate_checks" (
    "id" int8 NOT NULL DEFAULT nextval('ssl_certificate_checks_id_seq'::regclass),
    "status" varchar(255) NOT NULL DEFAULT 'not yet checked'::character varying,
    "issuer" varchar(255) DEFAULT NULL::character varying,
    "expiration_date" timestamptz,
    "check_failure_reason" varchar(255) DEFAULT NULL::character varying,
    "site_id" int8 NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22311_primary ON public.ssl_certificate_checks USING btree (id)
CREATE INDEX idx_22311_ssl_certificate_checks_site_id_foreign ON public.ssl_certificate_checks USING btree (site_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS strand_subjects_id_seq;

-- Table Definition
CREATE TABLE "public"."strand_subjects" (
    "id" int8 NOT NULL DEFAULT nextval('strand_subjects_id_seq'::regclass),
    "code" varchar(255) NOT NULL,
    "title" varchar(255) NOT NULL,
    "description" varchar(255) DEFAULT NULL::character varying,
    "grade_year" varchar(255) NOT NULL,
    "semester" varchar(255) NOT NULL,
    "strand_id" int8 NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22321_primary ON public.strand_subjects USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS student_contacts_id_seq;

-- Table Definition
CREATE TABLE "public"."student_contacts" (
    "id" int8 NOT NULL DEFAULT nextval('student_contacts_id_seq'::regclass),
    "emergency_contact_name" varchar(255) DEFAULT NULL::character varying,
    "emergency_contact_phone" varchar(255) DEFAULT NULL::character varying,
    "emergency_contact_address" varchar(255) DEFAULT NULL::character varying,
    "facebook_contact" varchar(255) DEFAULT NULL::character varying,
    "personal_contact" varchar(255) DEFAULT NULL::character varying,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22359_primary ON public.student_contacts USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS student_education_info_id_seq;

-- Table Definition
CREATE TABLE "public"."student_education_info" (
    "id" int8 NOT NULL DEFAULT nextval('student_education_info_id_seq'::regclass),
    "elementary_school" varchar(255) DEFAULT NULL::character varying,
    "elementary_graduate_year" int8,
    "senior_high_name" varchar(255) DEFAULT NULL::character varying,
    "senior_high_graduate_year" int8,
    "elementary_school_address" varchar(255) DEFAULT NULL::character varying,
    "senior_high_address" varchar(255) DEFAULT NULL::character varying,
    "junior_high_school_name" varchar(255) DEFAULT NULL::character varying,
    "junior_high_school_address" varchar(255) DEFAULT NULL::character varying,
    "junior_high_graduation_year" varchar(255) DEFAULT NULL::character varying,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22371_primary ON public.student_education_info USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS student_enrollment_id_seq;

-- Table Definition
CREATE TABLE "public"."student_enrollment" (
    "id" int8 NOT NULL DEFAULT nextval('student_enrollment_id_seq'::regclass),
    "student_id" varchar(255) NOT NULL,
    "course_id" varchar(255) NOT NULL,
    "status" varchar(255) NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    "semester" int8,
    "academic_year" int8,
    "school_year" varchar(255) DEFAULT NULL::character varying,
    "deleted_at" timestamptz,
    "downpayment" float4 DEFAULT '0'::bigint,
    "remarks" text,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22385_primary ON public.student_enrollment USING btree (id)
CREATE INDEX idx_created_at ON public.student_enrollment USING btree (created_at)
CREATE INDEX idx_deleted_at ON public.student_enrollment USING btree (deleted_at)
CREATE INDEX idx_student_enrollment_status ON public.student_enrollment USING btree (status)
CREATE INDEX idx_student_enrollment_semester ON public.student_enrollment USING btree (semester, school_year)
CREATE INDEX idx_student_enrollment_created_at ON public.student_enrollment USING btree (created_at)
CREATE INDEX idx_student_enrollment_school_year ON public.student_enrollment USING btree (school_year);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS student_parents_info_id_seq;

-- Table Definition
CREATE TABLE "public"."student_parents_info" (
    "id" int8 NOT NULL DEFAULT nextval('student_parents_info_id_seq'::regclass),
    "fathers_name" varchar(255) DEFAULT NULL::character varying,
    "mothers_name" varchar(255) DEFAULT NULL::character varying,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22394_primary ON public.student_parents_info USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS student_transactions_id_seq;

-- Table Definition
CREATE TABLE "public"."student_transactions" (
    "id" int8 NOT NULL DEFAULT nextval('student_transactions_id_seq'::regclass),
    "student_id" int8 NOT NULL,
    "transaction_id" int8 NOT NULL,
    "status" varchar(255) NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    "amount" int4,
    CONSTRAINT "student_transactions_student_id_foreign" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT "student_transactions_transaction_id_foreign" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22403_primary ON public.student_transactions USING btree (id)
CREATE INDEX idx_22403_student_transactions_student_id_foreign ON public.student_transactions USING btree (student_id)
CREATE INDEX idx_22403_student_transactions_transaction_id_foreign ON public.student_transactions USING btree (transaction_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS student_tuition_id_seq;

-- Table Definition
CREATE TABLE "public"."student_tuition" (
    "id" int8 NOT NULL DEFAULT nextval('student_tuition_id_seq'::regclass),
    "total_tuition" float4,
    "total_balance" float4,
    "total_lectures" float4,
    "total_laboratory" float4,
    "total_miscelaneous_fees" float4,
    "created_at" timestamptz,
    "updated_at" date,
    "status" varchar(255) DEFAULT NULL::character varying,
    "semester" int8,
    "school_year" varchar(255) DEFAULT NULL::character varying,
    "academic_year" int8,
    "student_id" int8,
    "enrollment_id" int8,
    "discount" int8,
    "deleted_at" timestamptz,
    "overall_tuition" float4,
    "paid" int8,
    "downpayment" int4,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22408_primary ON public.student_tuition USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

DROP TYPE IF EXISTS "public"."students_clearance_status";
CREATE TYPE "public"."students_clearance_status" AS ENUM ('pending', 'approved', 'rejected');

-- Table Definition
CREATE TABLE "public"."students" (
    "id" int8 NOT NULL,
    "first_name" varchar(255) NOT NULL,
    "last_name" varchar(255) NOT NULL,
    "middle_name" varchar(255) DEFAULT NULL::character varying,
    "gender" varchar(255) NOT NULL,
    "birth_date" date NOT NULL,
    "age" int8 NOT NULL,
    "address" varchar(255) DEFAULT NULL::character varying,
    "contacts" text,
    "course_id" int8 NOT NULL,
    "academic_year" int8,
    "email" varchar(255) DEFAULT NULL::character varying,
    "remarks" text,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profile_url" varchar(255) DEFAULT NULL::character varying,
    "student_contact_id" int8,
    "student_parent_info" int8,
    "student_education_id" int8,
    "student_personal_id" int8,
    "document_location_id" int8,
    "deleted_at" timestamptz,
    "student_id" int8,
    "status" varchar(255) DEFAULT NULL::character varying,
    "clearance_status" "public"."students_clearance_status" DEFAULT 'pending'::students_clearance_status,
    "year_graduated" varchar(255) DEFAULT NULL::character varying,
    "special_order" varchar(255) DEFAULT NULL::character varying,
    "issued_date" date,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22328_primary ON public.students USING btree (id)
CREATE INDEX idx_22328_fk_students_courses ON public.students USING btree (course_id)
CREATE INDEX idx_22328_fk_students_student_contacts ON public.students USING btree (student_contact_id)
CREATE INDEX idx_22328_idx_students_document_location_id ON public.students USING btree (document_location_id)
CREATE INDEX idx_22328_idx_students_student_education_id ON public.students USING btree (student_education_id)
CREATE INDEX idx_22328_idx_students_student_parent_info ON public.students USING btree (student_parent_info)
CREATE INDEX idx_22328_idx_students_student_personal_id ON public.students USING btree (student_personal_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS students_personal_info_id_seq;

-- Table Definition
CREATE TABLE "public"."students_personal_info" (
    "id" int8 NOT NULL DEFAULT nextval('students_personal_info_id_seq'::regclass),
    "birthplace" varchar(255) DEFAULT NULL::character varying,
    "civil_status" varchar(255) DEFAULT NULL::character varying,
    "citizenship" varchar(255) DEFAULT NULL::character varying,
    "religion" varchar(255) DEFAULT NULL::character varying,
    "weight" varchar(255) DEFAULT NULL::character varying,
    "height" varchar(255) DEFAULT NULL::character varying,
    "current_adress" varchar(255) DEFAULT NULL::character varying,
    "permanent_address" varchar(255) DEFAULT NULL::character varying,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22344_primary ON public.students_personal_info USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS subject_id_seq;
DROP TYPE IF EXISTS "public"."subject_classification";
CREATE TYPE "public"."subject_classification" AS ENUM ('credited', 'non_credited', 'internal');

-- Table Definition
CREATE TABLE "public"."subject" (
    "id" int8 NOT NULL DEFAULT nextval('subject_id_seq'::regclass),
    "classification" "public"."subject_classification" NOT NULL DEFAULT 'non_credited'::subject_classification,
    "code" varchar(255) NOT NULL,
    "title" varchar(255) NOT NULL,
    "units" int8,
    "lecture" int8,
    "laboratory" int8,
    "pre_riquisite" text,
    "academic_year" int8,
    "semester" int8,
    "course_id" int8,
    "group" varchar(255) DEFAULT NULL::character varying,
    "is_credited" bool NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22417_primary ON public.subject USING btree (id)
CREATE INDEX idx_22417_fk_subject_courses ON public.subject USING btree (course_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS subject_enrollments_id_seq;

-- Table Definition
CREATE TABLE "public"."subject_enrollments" (
    "id" int8 NOT NULL DEFAULT nextval('subject_enrollments_id_seq'::regclass),
    "subject_id" int8,
    "class_id" int4,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    "grade" float4,
    "instructor" varchar(255) DEFAULT NULL::character varying,
    "student_id" int4,
    "academic_year" varchar(255) DEFAULT NULL::character varying,
    "school_year" varchar(255) DEFAULT NULL::character varying,
    "semester" int2,
    "enrollment_id" int2,
    "remarks" varchar(255) DEFAULT NULL::character varying,
    "classification" varchar(255) DEFAULT NULL::character varying,
    "school_name" varchar(255) DEFAULT NULL::character varying,
    "is_credited" bool NOT NULL DEFAULT false,
    "credited_subject_id" int2,
    "section" varchar(255),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22427_primary ON public.subject_enrollments USING btree (id)
CREATE INDEX idx_22427_fk_subject_enrollments_subject ON public.subject_enrollments USING btree (subject_id)
CREATE INDEX idx_22427_fk_subject_enrollments_students ON public.subject_enrollments USING btree (student_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS table_cols_id_seq;

-- Table Definition
CREATE TABLE "public"."table_cols" (
    "id" int8 NOT NULL DEFAULT nextval('table_cols_id_seq'::regclass),
    "table_id" int8 NOT NULL,
    "name" varchar(255) NOT NULL,
    "type" varchar(255) DEFAULT 'varchar'::character varying,
    "length" int8 DEFAULT '255'::bigint,
    "default" varchar(255) DEFAULT NULL::character varying,
    "comment" varchar(255) DEFAULT NULL::character varying,
    "foreign_table" varchar(255) DEFAULT NULL::character varying,
    "foreign_col" varchar(255) DEFAULT NULL::character varying,
    "foreign_model" varchar(255) DEFAULT NULL::character varying,
    "nullable" bool DEFAULT false,
    "index" bool DEFAULT false,
    "auto_increment" bool DEFAULT false,
    "primary" bool DEFAULT false,
    "unique" bool DEFAULT false,
    "unsigned" bool DEFAULT false,
    "foreign" bool DEFAULT false,
    "foreign_on_delete_cascade" bool DEFAULT false,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22453_primary ON public.table_cols USING btree (id)
CREATE INDEX idx_22453_table_cols_table_id_foreign ON public.table_cols USING btree (table_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tables_id_seq;

-- Table Definition
CREATE TABLE "public"."tables" (
    "id" int8 NOT NULL DEFAULT nextval('tables_id_seq'::regclass),
    "module" varchar(255) NOT NULL,
    "name" varchar(255) NOT NULL,
    "comment" varchar(255) DEFAULT NULL::character varying,
    "timestamps" bool DEFAULT true,
    "soft_deletes" bool DEFAULT false,
    "migrated" bool DEFAULT false,
    "generated" bool DEFAULT false,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22441_primary ON public.tables USING btree (id)
CREATE UNIQUE INDEX idx_22441_tables_name_unique ON public.tables USING btree (name);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS team_invitations_id_seq;

-- Table Definition
CREATE TABLE "public"."team_invitations" (
    "id" int8 NOT NULL DEFAULT nextval('team_invitations_id_seq'::regclass),
    "team_id" int8 NOT NULL,
    "email" varchar(255) NOT NULL,
    "role" varchar(255) DEFAULT NULL::character varying,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22480_primary ON public.team_invitations USING btree (id)
CREATE UNIQUE INDEX idx_22480_team_invitations_team_id_email_unique ON public.team_invitations USING btree (team_id, email);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS team_user_id_seq;

-- Table Definition
CREATE TABLE "public"."team_user" (
    "id" int8 NOT NULL DEFAULT nextval('team_user_id_seq'::regclass),
    "team_id" int8 NOT NULL,
    "user_id" int8 NOT NULL,
    "role" varchar(255) DEFAULT NULL::character varying,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22488_primary ON public.team_user USING btree (id)
CREATE UNIQUE INDEX idx_22488_team_user_team_id_user_id_unique ON public.team_user USING btree (team_id, user_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS teams_id_seq;

-- Table Definition
CREATE TABLE "public"."teams" (
    "id" int8 NOT NULL DEFAULT nextval('teams_id_seq'::regclass),
    "user_id" int8 NOT NULL,
    "name" varchar(255) NOT NULL,
    "personal_team" bool NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22475_primary ON public.teams USING btree (id)
CREATE INDEX idx_22475_teams_user_id_index ON public.teams USING btree (user_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS telescope_entries_sequence_seq;

-- Table Definition
CREATE TABLE "public"."telescope_entries" (
    "sequence" int8 NOT NULL DEFAULT nextval('telescope_entries_sequence_seq'::regclass),
    "uuid" varchar(255) NOT NULL,
    "batch_id" varchar(255) NOT NULL,
    "family_hash" varchar(255) DEFAULT NULL::character varying,
    "should_display_on_index" bool NOT NULL DEFAULT true,
    "type" varchar(255) NOT NULL,
    "content" text NOT NULL,
    "created_at" timestamptz,
    PRIMARY KEY ("sequence")
);


-- Indices
CREATE UNIQUE INDEX idx_22494_primary ON public.telescope_entries USING btree (sequence)
CREATE INDEX idx_22494_telescope_entries_batch_id_index ON public.telescope_entries USING btree (batch_id)
CREATE INDEX idx_22494_telescope_entries_created_at_index ON public.telescope_entries USING btree (created_at)
CREATE INDEX idx_22494_telescope_entries_family_hash_index ON public.telescope_entries USING btree (family_hash)
CREATE INDEX idx_22494_telescope_entries_type_should_display_on_index_index ON public.telescope_entries USING btree (type, should_display_on_index)
CREATE UNIQUE INDEX idx_22494_telescope_entries_uuid_unique ON public.telescope_entries USING btree (uuid);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."telescope_entries_tags" (
    "entry_uuid" varchar(255) NOT NULL,
    "tag" varchar(255) NOT NULL,
    PRIMARY KEY ("entry_uuid","tag")
);


-- Indices
CREATE UNIQUE INDEX idx_22502_primary ON public.telescope_entries_tags USING btree (entry_uuid, tag)
CREATE INDEX idx_22502_telescope_entries_tags_tag_index ON public.telescope_entries_tags USING btree (tag);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."telescope_monitoring" (
    "tag" varchar(255) NOT NULL,
    PRIMARY KEY ("tag")
);


-- Indices
CREATE UNIQUE INDEX idx_22507_primary ON public.telescope_monitoring USING btree (tag);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS testda_students_id_seq;

-- Table Definition
CREATE TABLE "public"."testda_students" (
    "id" int8 NOT NULL DEFAULT nextval('testda_students_id_seq'::regclass),
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22511_primary ON public.testda_students USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tickets_id_seq;

-- Table Definition
CREATE TABLE "public"."tickets" (
    "id" int8 NOT NULL DEFAULT nextval('tickets_id_seq'::regclass),
    "uuid" bpchar(36) DEFAULT NULL::bpchar,
    "user_id" numeric NOT NULL,
    "title" varchar(255) NOT NULL,
    "message" varchar(255) DEFAULT NULL::character varying,
    "priority" varchar(255) NOT NULL DEFAULT 'low'::character varying,
    "status" varchar(255) NOT NULL DEFAULT 'open'::character varying,
    "is_resolved" bool NOT NULL DEFAULT false,
    "is_locked" bool NOT NULL DEFAULT false,
    "assigned_to" numeric,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22516_primary ON public.tickets USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS timesheets_id_seq;

-- Table Definition
CREATE TABLE "public"."timesheets" (
    "id" int8 NOT NULL DEFAULT nextval('timesheets_id_seq'::regclass),
    "date" date NOT NULL,
    "hours" float8 NOT NULL,
    "description" varchar(255) DEFAULT NULL::character varying,
    "project_id" numeric NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22529_primary ON public.timesheets USING btree (id)
CREATE INDEX idx_22529_timesheets_project_id_foreign ON public.timesheets USING btree (project_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tracks_strands_id_seq;

-- Table Definition
CREATE TABLE "public"."tracks_strands" (
    "id" int8 NOT NULL DEFAULT nextval('tracks_strands_id_seq'::regclass),
    "code" varchar(255) NOT NULL,
    "title" varchar(255) NOT NULL,
    "description" varchar(255) DEFAULT NULL::character varying,
    "track_id" int8 NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22537_primary ON public.tracks_strands USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS transactions_id_seq;

-- Table Definition
CREATE TABLE "public"."transactions" (
    "id" int8 NOT NULL DEFAULT nextval('transactions_id_seq'::regclass),
    "transaction_number" varchar(255) DEFAULT NULL::character varying,
    "description" varchar(255) NOT NULL,
    "status" varchar(255) NOT NULL,
    "transaction_date" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    "invoicenumber" varchar(255) DEFAULT NULL::character varying,
    "settlements" text DEFAULT '{"registration_fee":0,"tuition_fee":0,"miscelanous_fee":0,"diploma_or_certificate":0,"transcript_of_records":0,"certification":0,"special_exam":0,"others":0}'::text,
    "signature" text,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22545_primary ON public.transactions USING btree (id)
CREATE UNIQUE INDEX idx_22545_idx_transaction_number ON public.transactions USING btree (transaction_number);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."typables" (
    "type_id" numeric NOT NULL,
    "typables_id" numeric NOT NULL,
    "typables_type" varchar(255) NOT NULL
);


-- Indices
CREATE INDEX idx_22555_typables_type_id_foreign ON public.typables USING btree (type_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS types_id_seq;

-- Table Definition
CREATE TABLE "public"."types" (
    "id" int8 NOT NULL DEFAULT nextval('types_id_seq'::regclass),
    "order" int8 NOT NULL DEFAULT '0'::bigint,
    "parent_id" numeric,
    "model_type" varchar(255) DEFAULT NULL::character varying,
    "model_id" numeric,
    "for" varchar(255) DEFAULT 'posts'::character varying,
    "type" varchar(255) DEFAULT 'category'::character varying,
    "name" varchar(255) NOT NULL,
    "key" varchar(255) NOT NULL,
    "description" text,
    "color" varchar(255) DEFAULT NULL::character varying,
    "icon" varchar(255) DEFAULT NULL::character varying,
    "is_activated" bool DEFAULT true,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22561_primary ON public.types USING btree (id)
CREATE INDEX idx_22561_types_parent_id_foreign ON public.types USING btree (parent_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS types_metas_id_seq;

-- Table Definition
CREATE TABLE "public"."types_metas" (
    "id" int8 NOT NULL DEFAULT nextval('types_metas_id_seq'::regclass),
    "model_id" numeric,
    "model_type" varchar(255) DEFAULT NULL::character varying,
    "type_id" numeric NOT NULL,
    "key" varchar(255) NOT NULL,
    "value" text,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22575_primary ON public.types_metas USING btree (id)
CREATE INDEX idx_22575_types_metas_key_index ON public.types_metas USING btree (key)
CREATE INDEX idx_22575_types_metas_type_id_foreign ON public.types_metas USING btree (type_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS uptime_checks_id_seq;

-- Table Definition
CREATE TABLE "public"."uptime_checks" (
    "id" int8 NOT NULL DEFAULT nextval('uptime_checks_id_seq'::regclass),
    "look_for_string" varchar(255) NOT NULL DEFAULT ''::character varying,
    "status" varchar(255) NOT NULL DEFAULT 'not yet checked'::character varying,
    "check_failure_reason" text,
    "check_times_failed_in_a_row" int8 NOT NULL DEFAULT '0'::bigint,
    "status_last_change_date" timestamptz,
    "last_check_date" timestamptz,
    "check_failed_event_fired_on_date" timestamptz,
    "request_duration_ms" int8,
    "check_method" varchar(255) NOT NULL DEFAULT 'get'::character varying,
    "check_payload" text,
    "check_additional_headers" text,
    "check_response_checker" varchar(255) DEFAULT NULL::character varying,
    "site_id" int8 NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22583_primary ON public.uptime_checks USING btree (id)
CREATE INDEX idx_22583_uptime_checks_site_id_foreign ON public.uptime_checks USING btree (site_id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS user_activities_id_seq;

-- Table Definition
CREATE TABLE "public"."user_activities" (
    "id" int8 NOT NULL DEFAULT nextval('user_activities_id_seq'::regclass),
    "user_id" int8,
    "url" varchar(255) NOT NULL,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22613_primary ON public.user_activities USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int8 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "name" varchar(255) DEFAULT NULL::character varying,
    "email" varchar(255) NOT NULL,
    "email_verified_at" timestamptz,
    "password" varchar(255) DEFAULT NULL::character varying,
    "two_factor_secret" text,
    "two_factor_recovery_codes" text,
    "two_factor_confirmed_at" timestamptz,
    "remember_token" varchar(255) DEFAULT NULL::character varying,
    "current_team_id" int8,
    "avatar_url" varchar(255) DEFAULT NULL::character varying,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    "deleted_at" timestamptz,
    "theme" varchar(255) DEFAULT 'default'::character varying,
    "theme_color" varchar(255) DEFAULT NULL::character varying,
    "profile_photo_path" varchar(255) DEFAULT NULL::character varying,
    "active_status" bool NOT NULL DEFAULT false,
    "avatar" varchar(255) NOT NULL DEFAULT 'avatar.png'::character varying,
    "dark_mode" bool NOT NULL DEFAULT false,
    "messenger_color" varchar(255) DEFAULT NULL::character varying,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22595_primary ON public.users USING btree (id);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS webauthn_keys_id_seq;

-- Table Definition
CREATE TABLE "public"."webauthn_keys" (
    "id" int8 NOT NULL DEFAULT nextval('webauthn_keys_id_seq'::regclass),
    "user_id" int8 NOT NULL,
    "name" varchar(255) DEFAULT NULL::character varying,
    "credential_id" text NOT NULL,
    "public_key" text NOT NULL,
    "attachment_type" varchar(50) DEFAULT NULL::character varying,
    "is_passkey" bool NOT NULL DEFAULT false,
    "transports" text,
    "last_used_at" timestamptz,
    "created_at" timestamptz,
    "updated_at" timestamptz,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX idx_22618_primary ON public.webauthn_keys USING btree (id);

 SELECT school_year,
    semester,
    status,
    count(*) AS count
   FROM student_enrollment
  GROUP BY school_year, semester, status;

