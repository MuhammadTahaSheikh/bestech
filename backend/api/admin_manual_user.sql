-- Fixed admin credentials (after cms_schema.sql has been applied).
-- Prefer: upload admin_apply_credentials.php, open it once with ?confirm=1, then DELETE that file.
-- Or run below in MySQL / phpMyAdmin on the same database as your blog tables.
--
-- Username: BetsechVision
-- Password: Limton123@
--
-- bcrypt hash verified for PHP password_verify(). Re-run anytime to reset the password.
-- If you already use a different username, either change the username below or delete old rows first.

INSERT INTO admin_users (username, password_hash)
VALUES (
  'BetsechVision',
  '$2b$10$G6OUpR.MmoXx1f7ibJ2O6.faa64hMYt4jHLdwR/TQLu/VZCL0vsfm'
)
ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash);
