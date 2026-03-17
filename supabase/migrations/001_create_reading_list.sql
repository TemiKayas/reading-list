-- Reading list items table
CREATE TABLE IF NOT EXISTS reading_list (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT        NOT NULL,
  author     TEXT        NOT NULL,
  notes      TEXT,
  is_read    BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_updated_at
BEFORE UPDATE ON reading_list
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security
ALTER TABLE reading_list ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (no auth required)
CREATE POLICY "Allow all" ON reading_list FOR ALL USING (true) WITH CHECK (true);
