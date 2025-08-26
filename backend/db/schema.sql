CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    uid TEXT UNIQUE NOT NULL,
    name TEXT,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS mock_question (
    mock_id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    mock_type VARCHAR(50) NOT NULL,
    mock_json JSONB NOT NULL,
    job_pos VARCHAR(255) NOT NULL,
    job_desc TEXT,
    job_exp VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attempted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(uid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS feedback (
    mock_id VARCHAR(255) NOT NULL,
    question_no varchar(1) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    user_ans TEXT NOT NULL,
    rating varchar(10) NOT NULL,
    feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mock_id) REFERENCES mock_question(mock_id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION set_attempted_on_feedback()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE mock_question
  SET attempted = TRUE
  WHERE mock_id = NEW.mock_id AND attempted = FALSE;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_attempted
AFTER INSERT ON feedback
FOR EACH ROW
EXECUTE FUNCTION set_attempted_on_feedback();