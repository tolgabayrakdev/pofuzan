-- Users Table (Admin ve User rolleri)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user')),
    access_lvl INTEGER DEFAULT 1 CHECK (access_lvl IN (1, 2, 3)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Registration Codes Table
CREATE TABLE registration_codes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    code_type VARCHAR(20) NOT NULL CHECK (code_type IN ('lvl1', 'lvl2', 'lvl3')),
    is_active BOOLEAN DEFAULT TRUE,
    used_count INTEGER DEFAULT 0,
    max_uses INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
);

-- Kişiler (Persons) Tablosu - Ana tablo
CREATE TABLE persons (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    view_level INTEGER DEFAULT 1 CHECK (view_level IN (1, 2, 3)),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kişi Temel Bilgiler
CREATE TABLE person_basic_info (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    birth_date DATE,
    birth_place VARCHAR(100),
    gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'other')),
    nationality VARCHAR(50),
    identity_number VARCHAR(20) UNIQUE,
    blood_type VARCHAR(5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- İletişim Bilgileri
CREATE TABLE person_contact (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    phone VARCHAR(20),
    phone_secondary VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    city VARCHAR(50),
    country VARCHAR(50),
    postal_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Eğitim Bilgileri
CREATE TABLE person_education (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    school_name VARCHAR(100),
    department VARCHAR(100),
    degree VARCHAR(50),
    start_date DATE,
    end_date DATE,
    is_ongoing BOOLEAN DEFAULT FALSE,
    grade VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- İş Deneyimi
CREATE TABLE person_work (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    company_name VARCHAR(100),
    position VARCHAR(100),
    sector VARCHAR(50),
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    job_description TEXT,
    salary_range VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Aile Bilgileri
CREATE TABLE person_family (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    relation_type VARCHAR(30) CHECK (relation_type IN ('spouse', 'child', 'parent', 'sibling', 'other')),
    full_name VARCHAR(100),
    birth_date DATE,
    profession VARCHAR(100),
    phone VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medeni Hal ve Evlilik
CREATE TABLE person_marriage (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    marital_status VARCHAR(20) CHECK (marital_status IN ('single', 'married', 'divorced', 'widowed', 'separated')),
    spouse_name VARCHAR(100),
    marriage_date DATE,
    marriage_place VARCHAR(100),
    divorce_date DATE,
    divorce_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Çocuk Bilgileri
CREATE TABLE person_children (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    child_name VARCHAR(100),
    birth_date DATE,
    gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'other')),
    education_level VARCHAR(50),
    profession VARCHAR(100),
    is_living BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sağlık Bilgileri
CREATE TABLE person_health (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    chronic_diseases TEXT,
    disabilities TEXT,
    allergies TEXT,
    regular_medications TEXT,
    blood_pressure VARCHAR(20),
    diabetes_status VARCHAR(20),
    mental_health_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Önceki Yaşam / Geçmiş Deneyimler
CREATE TABLE person_past_life (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    category VARCHAR(50) CHECK (category IN ('residence', 'travel', 'work', 'education', 'incident', 'milestone', 'other')),
    title VARCHAR(200),
    description TEXT,
    location VARCHAR(100),
    start_date DATE,
    end_date DATE,
    impact_level VARCHAR(20) CHECK (impact_level IN ('low', 'medium', 'high', 'critical')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kişisel Özellikler ve Tercihler
CREATE TABLE person_personality (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    personality_type VARCHAR(20),
    hobbies TEXT,
    interests TEXT,
    languages TEXT,
    sports TEXT,
    food_preferences TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kişi Notları (Admin/User notları)
CREATE TABLE person_notes (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id),
    note_type VARCHAR(30) CHECK (note_type IN ('general', 'important', 'private', 'warning')),
    content TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kişi Fotoğrafları
CREATE TABLE person_media (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    media_type VARCHAR(20) CHECK (media_type IN ('photo', 'document', 'video', 'audio')),
    file_name VARCHAR(255),
    file_path VARCHAR(500),
    description TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Arama Logları (Audit)
CREATE TABLE search_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    search_query VARCHAR(255),
    filters JSONB,
    results_count INTEGER,
    searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better search performance
CREATE INDEX idx_persons_name ON persons(LOWER(first_name), LOWER(last_name));
CREATE INDEX idx_persons_created_by ON persons(created_by);
CREATE INDEX idx_person_basic_birth ON person_basic_info(birth_date);
CREATE INDEX idx_person_contact_phone ON person_contact(phone);
CREATE INDEX idx_person_contact_email ON person_contact(LOWER(email));
CREATE INDEX idx_person_work_company ON person_work(company_name);
CREATE INDEX idx_person_work_position ON person_work(position);
CREATE INDEX idx_person_family_relation ON person_family(relation_type);
CREATE INDEX idx_person_past_life_category ON person_past_life(category);
CREATE INDEX idx_person_notes_person ON person_notes(person_id);
CREATE INDEX idx_search_logs_user ON search_logs(user_id);
CREATE INDEX idx_search_logs_date ON search_logs(searched_at DESC);

-- Sessions Table
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    refresh_token_hash VARCHAR(64),
    ip_address VARCHAR(45),
    user_agent TEXT,
    device_info VARCHAR(255),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    duration_minutes INTEGER,
    is_active BOOLEAN DEFAULT TRUE
);

-- Indexes
CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_started ON sessions(started_at DESC);
CREATE INDEX idx_sessions_active ON sessions(is_active);

-- Seed Data (Test Users)
-- Admin: admin@pofuzan.com / admin123 (lvl3)
-- User: user@pofuzan.com / user123 (lvl1)
INSERT INTO users (email, password, role, access_lvl) VALUES
('admin@pofuzan.com', '$2b$10$rQZ9Qf1x5M5V8H3K5L6N7O.hash.fake.hash.for.development', 'admin', 3),
('user@pofuzan.com', '$2b$10$rQZ9Qf1x5M5V8H3K5L6N7O.hash.fake.hash.for.development', 'user', 1);

-- Seed Registration Codes
INSERT INTO registration_codes (code, code_type, max_uses) VALUES
('LVL1-2024', 'lvl1', 100),
('LVL1-DEMO', 'lvl1', 10),
('LVL1-TEST', 'lvl1', 5),
('LVL2-2024', 'lvl2', 50),
('LVL2-ADMIN', 'lvl2', 20),
('LVL3-2024', 'lvl3', 10),
('LVL3-MASTER', 'lvl3', 3);
