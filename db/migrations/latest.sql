-- Struktur-Updates für die users Tabelle
ALTER TABLE users
ADD COLUMN IF NOT EXISTS email_verified_at timestamp NULL,
ADD COLUMN IF NOT EXISTS verification_token varchar(255) NULL,
ADD COLUMN IF NOT EXISTS reset_password_token varchar(255) NULL,
ADD COLUMN IF NOT EXISTS reset_password_expires timestamp NULL;
