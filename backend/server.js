const express = require('express');
const bcrypt = require("bcryptjs");
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// MySQL Connection Setup
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'skill_india_db',
    port: parseInt(process.env.DB_PORT) || 3306,
    ssl: {
        ca: fs.readFileSync(path.join(__dirname, 'ca.pem'))
    }
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('✅ Skill India Server Connected to MySQL Database');

    createTables(() => {
        setupDatabaseColumns();
    });
});

// In-memory OTP storage
const otpStore = new Map();

// Email configuration (Brevo SMTP - reliable on cloud servers)
const emailTransporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_KEY
    }
});

// ============================================================================
// HAVERSINE DISTANCE CALCULATION FUNCTION (NEW)
// ============================================================================
/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - First latitude
 * @param {number} lon1 - First longitude
 * @param {number} lat2 - Second latitude
 * @param {number} lon2 - Second longitude
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    
    const toRad = (degrees) => degrees * (Math.PI / 180);
    
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance;
}

// Auto-create all tables if they don't exist
function createTables(callback) {
    console.log("📋 Creating tables if not exist...");

    const tables = [
        `CREATE TABLE IF NOT EXISTS \`users\` (
            \`id\` int(11) NOT NULL AUTO_INCREMENT,
            \`full_name\` varchar(100) NOT NULL,
            \`email_id\` varchar(100) NOT NULL,
            \`mobile_no\` varchar(15) NOT NULL,
            \`password\` varchar(255) NOT NULL,
            \`state_name\` varchar(100) NOT NULL,
            \`city_name\` varchar(100) NOT NULL,
            \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`status\` varchar(20) DEFAULT 'Active',
            \`deactivated_at\` datetime DEFAULT NULL,
            \`pet_name\` varchar(255) DEFAULT NULL,
            \`teacher_name\` varchar(255) DEFAULT NULL,
            \`reset_token\` varchar(255) DEFAULT NULL,
            \`reset_token_expiry\` datetime DEFAULT NULL,
            \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`unique_email\` (\`email_id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

        `CREATE TABLE IF NOT EXISTS \`workers\` (
            \`city\` varchar(100) NOT NULL,
            \`latitude\` decimal(10,8) DEFAULT NULL,
            \`longitude\` decimal(11,8) DEFAULT NULL,
            \`worker_name\` varchar(100) NOT NULL,
            \`father_name\` varchar(100) DEFAULT NULL,
            \`mother_name\` varchar(100) DEFAULT NULL,
            \`contact\` varchar(15) NOT NULL,
            \`password\` varchar(255) NOT NULL,
            \`experience\` int(11) NOT NULL,
            \`state\` varchar(100) NOT NULL,
            \`work_type\` varchar(100) NOT NULL,
            \`other_work\` varchar(100) DEFAULT NULL,
            \`registration_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`deactivated_at\` datetime DEFAULT NULL,
            \`status\` varchar(20) DEFAULT 'Active',
            \`friend_name\` varchar(255) DEFAULT NULL,
            \`school_name\` varchar(255) DEFAULT NULL,
            \`birthplace\` varchar(255) DEFAULT NULL,
            \`completed_jobs\` int(11) DEFAULT 0,
            PRIMARY KEY (\`contact\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

        `CREATE TABLE IF NOT EXISTS \`tickets\` (
            \`id\` int(11) NOT NULL AUTO_INCREMENT,
            \`state\` varchar(100) NOT NULL,
            \`city\` varchar(100) NOT NULL,
            \`work_type\` varchar(100) NOT NULL,
            \`user_name\` varchar(100) NOT NULL,
            \`mobile_number\` varchar(10) NOT NULL,
            \`problem_description\` text NOT NULL,
            \`user_email\` varchar(255) NOT NULL DEFAULT 'guest@example.com',
            \`status\` enum('pending','accepted','rejected','completed') DEFAULT 'pending',
            \`accepted_worker_id\` int(11) DEFAULT NULL,
            \`accepted_worker_name\` varchar(100) DEFAULT NULL,
            \`accepted_worker_mobile\` varchar(10) DEFAULT NULL,
            \`accepted_worker_latitude\` decimal(10,8) DEFAULT NULL,
            \`accepted_worker_longitude\` decimal(11,8) DEFAULT NULL,
            \`accepted_worker_work_type\` varchar(100) DEFAULT NULL,
            \`accepted_at\` timestamp NULL DEFAULT NULL,
            \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`rating\` int(11) DEFAULT 0,
            \`completed_at\` datetime DEFAULT NULL,
            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

        `CREATE TABLE IF NOT EXISTS \`service_requests\` (
            \`id\` int(11) NOT NULL AUTO_INCREMENT,
            \`user_email\` varchar(255) NOT NULL,
            \`user_name\` varchar(255) DEFAULT NULL,
            \`mobile_number\` varchar(20) NOT NULL,
            \`worker_contact\` varchar(20) NOT NULL,
            \`worker_name\` varchar(255) DEFAULT NULL,
            \`worker_mobile\` varchar(20) DEFAULT NULL,
            \`worker_work_type\` varchar(100) DEFAULT NULL,
            \`work_type\` varchar(100) NOT NULL,
            \`problem_description\` text NOT NULL,
            \`city\` varchar(100) DEFAULT NULL,
            \`state\` varchar(100) DEFAULT NULL,
            \`status\` enum('pending','accepted','rejected','completed') DEFAULT 'pending',
            \`rating\` int(11) DEFAULT NULL,
            \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`accepted_at\` timestamp NULL DEFAULT NULL,
            \`completed_at\` timestamp NULL DEFAULT NULL,
            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

        `CREATE TABLE IF NOT EXISTS \`support_issues\` (
            \`id\` int(11) NOT NULL AUTO_INCREMENT,
            \`worker_contact\` varchar(15) DEFAULT NULL,
            \`city\` varchar(50) DEFAULT NULL,
            \`problem_description\` text,
            \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
    ];

    let done = 0;
    tables.forEach((sql, i) => {
        db.query(sql, (err) => {
            if (err) console.error(`❌ Table ${i + 1} error:`, err.message);
            else console.log(`✅ Table ${i + 1}/${tables.length} ready`);
            done++;
            if (done === tables.length) {
                console.log("✅ All tables ready!");
                if (callback) callback();
            }
        });
    });
}

// Database setup function
function setupDatabaseColumns() {
    console.log("🔧 Checking database structure...");
    
    const columns = [
        {
            table: "users",
            column: "status",
            sql: "ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'Active'"
        },
        {
            table: "users",
            column: "deactivated_at",
            sql: "ALTER TABLE users ADD COLUMN deactivated_at DATETIME DEFAULT NULL"
        },
        {
            table: "tickets",
            column: "rating",
            sql: "ALTER TABLE tickets ADD COLUMN rating INT DEFAULT 0"
        },
        {
            table: "tickets",
            column: "completed_at",
            sql: "ALTER TABLE tickets ADD COLUMN completed_at DATETIME DEFAULT NULL"
        },
        {
            table: "tickets",
            column: "user_email",
            sql: "ALTER TABLE tickets ADD COLUMN user_email VARCHAR(255) DEFAULT 'guest@example.com'"
        },
        {
            table: "tickets",
            column: "accepted_worker_name",
            sql: "ALTER TABLE tickets ADD COLUMN accepted_worker_name VARCHAR(255) DEFAULT NULL"
        },
        {
            table: "tickets",
            column: "accepted_worker_mobile",
            sql: "ALTER TABLE tickets ADD COLUMN accepted_worker_mobile VARCHAR(20) DEFAULT NULL"
        },
        {
            table: "tickets",
            column: "accepted_worker_work_type",
            sql: "ALTER TABLE tickets ADD COLUMN accepted_worker_work_type VARCHAR(255) DEFAULT NULL"
        },
        {
            table: "tickets",
            column: "accepted_at",
            sql: "ALTER TABLE tickets ADD COLUMN accepted_at DATETIME DEFAULT NULL"
        },
        {
            table: "workers",
            column: "friend_name",
            sql: "ALTER TABLE workers ADD COLUMN friend_name VARCHAR(255) DEFAULT NULL"
        },
        {
            table: "workers",
            column: "school_name",
            sql: "ALTER TABLE workers ADD COLUMN school_name VARCHAR(255) DEFAULT NULL"
        },
        {
            table: "workers",
            column: "birthplace",
            sql: "ALTER TABLE workers ADD COLUMN birthplace VARCHAR(255) DEFAULT NULL"
        },
        {
            table: "users",
            column: "pet_name",
            sql: "ALTER TABLE users ADD COLUMN pet_name VARCHAR(255) DEFAULT NULL"
        },
        {
            table: "users",
            column: "teacher_name",
            sql: "ALTER TABLE users ADD COLUMN teacher_name VARCHAR(255) DEFAULT NULL"
        },
        {
            table: "users",
            column: "reset_token",
            sql: "ALTER TABLE users ADD COLUMN reset_token VARCHAR(255) DEFAULT NULL"
        },
        {
            table: "users",
            column: "reset_token_expiry",
            sql: "ALTER TABLE users ADD COLUMN reset_token_expiry DATETIME DEFAULT NULL"
        }
    ];
    
    let checked = 0;
    let added = 0;
    
    columns.forEach(col => {
        const checkSql = `SHOW COLUMNS FROM ${col.table} LIKE '${col.column}'`;
        
        db.query(checkSql, (err, result) => {
            if (err) {
                console.error(`❌ Error checking ${col.table}.${col.column}:`, err.message);
            } else if (result.length === 0) {
                db.query(col.sql, (alterErr) => {
                    if (alterErr) {
                        console.error(`❌ Error adding ${col.table}.${col.column}:`, alterErr.message);
                    } else {
                        console.log(`✅ Added column: ${col.table}.${col.column}`);
                        added++;
                    }
                });
            }
            
            checked++;
            if (checked === columns.length) {
                if (added > 0) {
                    console.log(`🎉 Database structure updated! Added ${added} column(s).`);
                } else {
                    console.log("✅ Database structure is up to date!");
                }
            }
        });
    });
}

// ==================== WORKER ROUTES ====================

app.post("/register", async (req, res) => {
    try {
        const {
            worker_name, father_name, mother_name,
            contact, password,
            experience, state, city, work_type, other_work,
            latitude, longitude,
            friend_name, school_name, birthplace
        } = req.body;

        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password too short" });
        }

        if (!friend_name || !school_name || !birthplace) {
            return res.status(400).json({ 
                message: "All security questions must be answered for password recovery" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO workers
            (worker_name, father_name, mother_name, contact,
             password, experience, state, city,
             work_type, other_work, latitude, longitude,
             friend_name, school_name, birthplace)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            worker_name, father_name, mother_name, contact,
            hashedPassword, experience, state,
            city, work_type, other_work,
            latitude || null, longitude || null,
            friend_name.toLowerCase().trim(), 
            school_name.toLowerCase().trim(), 
            birthplace.toLowerCase().trim()
        ], (err, result) => {
            if (err) {
                console.error("❌ DATABASE ERROR:", err);
                return res.status(500).json({
                    message: "Database error",
                    error: err.sqlMessage
                });
            }
            console.log(`✅ Worker registered: ${contact} with security questions`);
            res.status(200).json({ message: "Worker Registered Successfully!" });
        });
    } catch (error) {
        console.error("❌ SERVER ERROR:", error);
        res.status(500).json({ message: "Server crash", error: error.message });
    }
});

app.post("/worker-login", (req, res) => {
    const { contact, password } = req.body;

    const sql = "SELECT * FROM workers WHERE contact = ?";

    db.query(sql, [contact], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Mobile number not registered" });
        }

        const worker = result[0];

        if (worker.status === 'Deactivated') {
            const cancelSql = "UPDATE workers SET status = 'Active', deactivated_at = NULL WHERE contact = ?";
            db.query(cancelSql, [contact], (cancelErr) => {
                if (cancelErr) {
                    console.error("Error canceling deactivation:", cancelErr);
                }
            });
            
            console.log(`✅ Deactivation canceled for worker: ${contact}`);
        }

        const isMatch = await bcrypt.compare(password, worker.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const workerData = {
            contact: worker.contact,
            city: worker.city,
            work_type: worker.work_type
        };

        // Set session cookie (7 days)
        res.cookie('worker_session', JSON.stringify(workerData), {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: false,
            sameSite: 'Lax'
        });

        res.status(200).json({
            message: "Login successful",
            worker: workerData
        });
    });
});

// ==================== PASSWORD RECOVERY ROUTES ====================

app.post('/verify-security-questions', (req, res) => {
    const { contact, friend_name, school_name, birthplace } = req.body;

    if (!contact || !friend_name || !school_name || !birthplace) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = `
        SELECT friend_name, school_name, birthplace 
        FROM workers 
        WHERE contact = ?
    `;

    db.query(sql, [contact], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Mobile number not found" });
        }

        const worker = result[0];

        const friendMatch = worker.friend_name && 
            worker.friend_name.toLowerCase() === friend_name.toLowerCase().trim();
        const schoolMatch = worker.school_name && 
            worker.school_name.toLowerCase() === school_name.toLowerCase().trim();
        const birthplaceMatch = worker.birthplace && 
            worker.birthplace.toLowerCase() === birthplace.toLowerCase().trim();

        if (friendMatch && schoolMatch && birthplaceMatch) {
            console.log(`✅ Security questions verified for: ${contact}`);
            res.json({ message: "Security questions verified successfully" });
        } else {
            console.log(`❌ Security questions failed for: ${contact}`);
            res.status(401).json({ 
                message: "Security answers do not match. Please try again." 
            });
        }
    });
});

app.post('/send-otp', (req, res) => {
    const { contact } = req.body;

    if (!contact || contact.length !== 10) {
        return res.status(400).json({ message: "Valid 10-digit mobile number required" });
    }

    const checkSql = "SELECT contact FROM workers WHERE contact = ?";
    
    db.query(checkSql, [contact], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Mobile number not registered" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = Date.now() + (2 * 60 * 1000);
        otpStore.set(contact, { otp, expiry });

        console.log(`📱 OTP for ${contact}: ${otp} (expires in 2 minutes)`);

        res.json({ 
            message: "OTP sent successfully to your mobile number",
            dev_otp: otp 
        });
    });
});

app.post('/verify-otp', (req, res) => {
    const { contact, otp } = req.body;

    if (!contact || !otp) {
        return res.status(400).json({ message: "Mobile number and OTP required" });
    }

    const storedData = otpStore.get(contact);

    if (!storedData) {
        return res.status(400).json({ message: "No OTP found. Please request a new one." });
    }

    if (Date.now() > storedData.expiry) {
        otpStore.delete(contact);
        return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    if (storedData.otp !== otp) {
        return res.status(401).json({ message: "Invalid OTP. Please try again." });
    }

    otpStore.delete(contact);
    console.log(`✅ OTP verified for: ${contact}`);
    
    res.json({ message: "OTP verified successfully" });
});

app.post('/reset-password', async (req, res) => {
    const { contact, new_password } = req.body;

    if (!contact || !new_password) {
        return res.status(400).json({ message: "Mobile number and new password required" });
    }

    if (new_password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    try {
        const hashedPassword = await bcrypt.hash(new_password, 10);

        const updateSql = "UPDATE workers SET password = ? WHERE contact = ?";

        db.query(updateSql, [hashedPassword, contact], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Failed to reset password" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Worker not found" });
            }

            console.log(`✅ Password reset successful for: ${contact}`);
            res.json({ message: "Password reset successfully" });
        });
    } catch (error) {
        console.error("Hashing error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ==================== EXISTING WORKER ROUTES ====================

app.post('/worker-profile', (req, res) => {
    const { contact } = req.body;
    
    if (!contact) {
        return res.status(400).json({ message: "Contact is required" });
    }
    
    const sql = "SELECT * FROM workers WHERE contact = ?";
    
    db.query(sql, [contact], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database Error" });
        }
        
        if (result.length === 0) {
            return res.status(404).json({ message: "Worker not found" });
        }
        
        const worker = result[0];
        
        const statsSql = `
            SELECT 
                COUNT(*) as completed_jobs,
                AVG(CASE WHEN rating > 0 THEN rating END) as average_rating
            FROM tickets 
            WHERE accepted_worker_mobile = ? 
            AND status = 'completed'
            AND rating IS NOT NULL
            AND rating > 0
        `;
        
        db.query(statsSql, [contact], (statErr, statResult) => {
            if (statErr) {
                console.error("Stats error:", statErr);
                return res.json({
                    ...worker,
                    completed_jobs: worker.completed_jobs || 0,
                    average_rating: 0
                });
            }
            
            if (statResult && statResult.length > 0) {
                worker.completed_jobs = statResult[0].completed_jobs || 0;
                worker.average_rating = statResult[0].average_rating || 0;
            } else {
                worker.completed_jobs = 0;
                worker.average_rating = 0;
            }
            
            console.log(`📊 Worker ${contact} profile stats:`, {
                completed_jobs: worker.completed_jobs,
                average_rating: worker.average_rating
            });
            
            res.json(worker);
        });
    });
});

app.post('/update-worker-profile', (req, res) => {
    const { contact, worker_name, father_name, mother_name, experience, work_type, other_work } = req.body;
    
    const sql = `UPDATE workers 
                 SET worker_name = ?, father_name = ?, mother_name = ?, experience = ?, work_type = ?, other_work = ? 
                 WHERE contact = ?`;
    
    db.query(sql, [worker_name, father_name, mother_name, experience, work_type, other_work, contact], (err, result) => {
        if (err) return res.status(500).json({ message: "Update Failed" });
        res.json({ message: "Profile updated successfully" });
    });
});

app.post('/worker-schedule-deactivation', (req, res) => {
    const { contact } = req.body;
    
    const sql = "UPDATE workers SET status = 'Deactivated', deactivated_at = NOW() WHERE contact = ?";
    
    db.query(sql, [contact], (err, result) => {
        if (err) return res.status(500).json({ message: "Server error" });
        res.json({ message: "Account deactivated. It will be permanently deleted in 1 hour." });
    });
});

app.get('/worker-check-deactivation', (req, res) => {
    const { contact } = req.query;
    
    const sql = "SELECT status, deactivated_at FROM workers WHERE contact = ?";
    
    db.query(sql, [contact], (err, result) => {
        if (err) return res.status(500).json({ message: "Server error" });
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: "Worker not found" });
        }
    });
});

app.get('/worker-notifications', (req, res) => {
    const { city, work_type, worker_contact } = req.query;

    if (worker_contact) {
        console.log("🔔 Fetching all notifications for worker:", worker_contact);

        const workerQuery = `SELECT city, work_type FROM workers WHERE contact = ?`;
        
        db.query(workerQuery, [worker_contact], (workerErr, workerResult) => {
            if (workerErr || workerResult.length === 0) {
                console.error("❌ Worker not found:", worker_contact);
                return res.status(404).json({ message: "Worker not found" });
            }

            const worker = workerResult[0];
            
            const query = `
                SELECT 
                    id, user_name, mobile_number, work_type,
                    problem_description, city, state, created_at,
                    accepted_worker_mobile
                FROM tickets
                WHERE status = 'pending' 
                AND (
                    accepted_worker_mobile = ?
                    OR (city = ? AND work_type = ? AND accepted_worker_mobile IS NULL)
                )
                ORDER BY 
                    CASE WHEN accepted_worker_mobile = ? THEN 0 ELSE 1 END,
                    created_at DESC
            `;

            db.query(query, [worker_contact, worker.city, worker.work_type, worker_contact], (err, results) => {
                if (err) {
                    console.error("❌ Database error:", err);
                    return res.status(500).json({ 
                        message: "Database error",
                        error: err.message 
                    });
                }
                
                console.log(`✅ Found ${results.length} total notifications for worker`);
                res.json(results);
            });
        });
    } else if (city && work_type) {
        console.log("📋 Fetching notifications for:", city, work_type);

        const query = `
            SELECT 
                id, user_name, mobile_number, state, city,
                work_type, problem_description, created_at
            FROM tickets
            WHERE city = ? AND work_type = ? AND status = 'pending'
            ORDER BY created_at DESC
        `;

        db.query(query, [city, work_type], (err, results) => {
            if (err) {
                console.error("❌ Database error:", err);
                return res.status(500).json({ 
                    message: "Database error",
                    error: err.message 
                });
            }
            
            console.log(`✅ Found ${results.length} pending tickets`);
            res.json(results);
        });
    } else {
        return res.status(400).json({ 
            message: "Either (city AND work_type) OR worker_contact is required" 
        });
    }
});

app.get('/worker-ongoing', (req, res) => {
    const { worker_mobile } = req.query;

    if (!worker_mobile) {
        return res.status(400).json({ message: "Worker mobile is required" });
    }

    console.log("📋 Fetching ongoing work for:", worker_mobile);

    const query = `
        SELECT 
            id,
            user_name,
            mobile_number,
            state,
            city,
            work_type,
            problem_description,
            status,
            created_at,
            accepted_at
        FROM tickets
        WHERE accepted_worker_mobile = ? AND status = 'accepted'
        ORDER BY accepted_at DESC
    `;

    db.query(query, [worker_mobile], (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ 
                message: "Database error",
                error: err.message 
            });
        }
        
        console.log(`✅ Found ${results.length} ongoing tickets`);
        res.json(results);
    });
});

app.get('/worker-profile-detail', (req, res) => {
    const { contact } = req.query;

    if (!contact) {
        return res.status(400).json({ message: "Contact is required" });
    }

    const workerSql = "SELECT * FROM workers WHERE contact = ?";
    
    db.query(workerSql, [contact], (err, workerResult) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (workerResult.length === 0) {
            return res.status(404).json({ message: "Worker not found" });
        }

        const worker = workerResult[0];

        const statsSql = `
            SELECT 
                COUNT(*) as completed_jobs,
                AVG(rating) as average_rating
            FROM tickets 
            WHERE accepted_worker_mobile = ? AND status = 'completed' AND rating IS NOT NULL
        `;

        db.query(statsSql, [contact], (statErr, statResult) => {
            if (statErr) {
                console.error("❌ Stats error:", statErr);
            }

            if (statResult && statResult.length > 0) {
                worker.completed_jobs = statResult[0].completed_jobs || 0;
                worker.average_rating = statResult[0].average_rating || 0;
            } else {
                worker.completed_jobs = 0;
                worker.average_rating = 0;
            }

            const historySql = `
                SELECT 
                    id, work_type, problem_description, city, state, 
                    user_name, created_at, accepted_at, completed_at, rating
                FROM tickets
                WHERE accepted_worker_mobile = ? AND status = 'completed' AND rating IS NOT NULL
                ORDER BY completed_at DESC
                LIMIT 50
            `;

            db.query(historySql, [contact], (histErr, historyResult) => {
                if (histErr) {
                    console.error("❌ History error:", histErr);
                    return res.json({
                        worker: worker,
                        history: []
                    });
                }

                res.json({
                    worker: worker,
                    history: historyResult
                });
            });
        });
    });
});

app.post('/send-request', (req, res) => {
    const { user_email, worker_contact, work_type, problem_description, mobile_number } = req.body;

    console.log("📩 User sending request:", req.body);

    if (!user_email || !worker_contact || !work_type || !problem_description || !mobile_number) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userSql = "SELECT full_name FROM users WHERE email_id = ?";
    
    db.query(userSql, [user_email], (userErr, userResult) => {
        if (userErr) {
            console.error("❌ User query error:", userErr);
            return res.status(500).json({ message: "Database error" });
        }

        const userName = userResult.length > 0 ? userResult[0].full_name : 'User';

        const workerSql = "SELECT worker_name, city, state, work_type FROM workers WHERE contact = ?";
        
        db.query(workerSql, [worker_contact], (err, workerResult) => {
            if (err || workerResult.length === 0) {
                return res.status(404).json({ message: "Worker not found" });
            }

            const worker = workerResult[0];

            const insertSql = `
                INSERT INTO tickets 
                (state, city, work_type, user_name, mobile_number, problem_description, user_email, status, 
                 accepted_worker_name, accepted_worker_mobile, accepted_worker_work_type) 
                VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?)
            `;

            db.query(insertSql, 
                [worker.state, worker.city, work_type, userName, mobile_number, problem_description, user_email, 
                 worker.worker_name, worker_contact, worker.work_type],
                (insertErr, result) => {
                    if (insertErr) {
                        console.error("❌ Insert error:", insertErr);
                        return res.status(500).json({ message: "Failed to send request" });
                    }

                    console.log(`✅ Request #${result.insertId} sent to worker ${worker_contact}`);
                    res.status(201).json({ 
                        message: "Request sent successfully",
                        request_id: result.insertId
                    });
                }
            );
        });
    });
});

app.get('/user-requests', (req, res) => {
    const { email, status } = req.query;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    let query = `
        SELECT 
            id, user_name, mobile_number, state, city, work_type,
            problem_description, status, created_at,
            accepted_worker_name, accepted_worker_mobile,
            accepted_worker_work_type, accepted_at
        FROM tickets
        WHERE user_email = ?
    `;

    const params = [email];

    if (status) {
        query += ' AND status = ?';
        params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    db.query(query, params, (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }
        
        res.json(results);
    });
});

app.post('/worker-accept-request', (req, res) => {
    const { request_id, worker_mobile } = req.body;

    console.log("✅ Worker accepting request:", request_id, "Worker:", worker_mobile);

    if (!request_id || !worker_mobile) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const getWorkerSql = `
        SELECT worker_name, contact, work_type, city, state, latitude, longitude 
        FROM workers 
        WHERE contact = ?
    `;

    db.query(getWorkerSql, [worker_mobile], (workerErr, workerResult) => {
        if (workerErr || workerResult.length === 0) {
            console.error("❌ Worker not found:", workerErr);
            return res.status(404).json({ message: "Worker not found" });
        }

        const worker = workerResult[0];

        const checkQuery = `SELECT id, status FROM tickets WHERE id = ?`;
        
        db.query(checkQuery, [request_id], (checkErr, checkResults) => {
            if (checkErr) {
                console.error("❌ Check error:", checkErr);
                return res.status(500).json({ message: "Database error" });
            }

            if (checkResults.length === 0) {
                return res.status(404).json({ message: "Request not found" });
            }

            if (checkResults[0].status !== 'pending') {
                return res.status(400).json({ message: "This request has already been processed" });
            }

            const updateQuery = `
                UPDATE tickets 
                SET 
                    status = 'accepted',
                    accepted_worker_name = ?,
                    accepted_worker_mobile = ?,
                    accepted_worker_work_type = ?,
                    accepted_at = NOW(),
                    city = ?,
                    state = ?
                WHERE id = ? AND status = 'pending'
            `;

            db.query(updateQuery, [
                worker.worker_name,
                worker.contact,
                worker.work_type,
                worker.city,
                worker.state,
                request_id
            ], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error("❌ Update error:", updateErr);
                    return res.status(500).json({ message: "Database error" });
                }

                if (updateResult.affectedRows === 0) {
                    return res.status(400).json({ message: "Request not found or already processed" });
                }

                console.log(`✅ Request #${request_id} accepted by worker with location: ${worker.city}, ${worker.state}`);
                res.json({ 
                    message: "Request accepted successfully",
                    worker_location: {
                        city: worker.city,
                        state: worker.state,
                        latitude: worker.latitude,
                        longitude: worker.longitude
                    }
                });
            });
        });
    });
});

app.post('/worker-reject-request', (req, res) => {
    const { request_id } = req.body;

    const updateQuery = `
        UPDATE tickets
        SET status = 'rejected'
        WHERE id = ? AND status = 'pending'
    `;

    db.query(updateQuery, [request_id], (err, result) => {
        if (err) {
            console.error("❌ Update error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        res.json({ message: "Request declined" });
    });
});

app.get('/worker-accepted-work', (req, res) => {
    const { worker_mobile } = req.query;

    if (!worker_mobile) {
        return res.status(400).json({ message: "Worker mobile is required" });
    }

    const query = `
        SELECT 
            id, user_name, mobile_number, work_type, 
            problem_description, city, state,
            created_at, accepted_at
        FROM tickets
        WHERE accepted_worker_mobile = ? AND status = 'accepted'
        ORDER BY accepted_at DESC
    `;

    db.query(query, [worker_mobile], (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }
        
        res.json(results);
    });
});

app.get('/worker-history', (req, res) => {
    const { worker_mobile } = req.query;

    if (!worker_mobile) {
        return res.status(400).json({ message: "Worker mobile is required" });
    }

    const query = `
        SELECT 
            id, user_name, work_type, problem_description,
            city, state, created_at, accepted_at, rating, completed_at
        FROM tickets
        WHERE accepted_worker_mobile = ? AND status = 'completed' AND rating IS NOT NULL
        ORDER BY completed_at DESC
    `;

    db.query(query, [worker_mobile], (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }
        
        res.json(results);
    });
});

app.post('/complete-job', (req, res) => {
    const { ticket_id, rating } = req.body;

    console.log("✅ User completing job - Ticket ID:", ticket_id, "Rating:", rating);

    if (!ticket_id) {
        return res.status(400).json({ message: "Ticket ID is required" });
    }

    const getTicketQuery = `SELECT * FROM tickets WHERE id = ?`;
    
    db.query(getTicketQuery, [ticket_id], (err, results) => {
        if (err) {
            console.error("❌ Database SELECT error:", err);
            return res.status(500).json({ 
                message: "Database error: " + err.message
            });
        }
        
        if (results.length === 0) {
            console.log("❌ Ticket not found:", ticket_id);
            return res.status(404).json({ message: "Ticket not found" });
        }

        const ticket = results[0];
        console.log("📋 Current ticket status:", ticket.status);
        console.log("👷 Worker mobile:", ticket.accepted_worker_mobile);

        if (ticket.rating !== null && ticket.rating !== 0 && ticket.rating !== undefined) {
            console.log("⚠️ Already rated with:", ticket.rating);
            return res.status(400).json({ 
                message: "This job has already been rated" 
            });
        }

        if (ticket.status !== 'accepted' && ticket.status !== 'completed') {
            console.log("❌ Invalid status for completion:", ticket.status);
            return res.status(400).json({ 
                message: "This ticket cannot be completed. Current status: " + ticket.status 
            });
        }

        const updateQuery = `
            UPDATE tickets 
            SET status = 'completed', 
                completed_at = NOW(),
                rating = ?
            WHERE id = ?
        `;

        db.query(updateQuery, [rating || 0, ticket_id], (updateErr, updateResult) => {
            if (updateErr) {
                console.error("❌ UPDATE error:", updateErr);
                return res.status(500).json({ 
                    message: "Database update failed",
                    error: updateErr.message
                });
            }

            if (updateResult.affectedRows === 0) {
                console.log("⚠️ No rows affected");
                return res.status(400).json({ message: "Job not found or already updated" });
            }

            console.log(`✅ Ticket #${ticket_id} marked as completed with rating: ${rating || 0}`);
            
            const message = rating > 0 
                ? `Job marked as completed with ${rating} star${rating > 1 ? 's' : ''}!` 
                : 'Job marked as completed!';
            
            res.json({ 
                message: message, 
                success: true,
                worker_mobile: ticket.accepted_worker_mobile
            });
        });
    });
});

// ==================== USER ROUTES ====================

app.post('/register-user', async (req, res) => {
    try {
        const { name, email, mobile, password, state, city, pet_name, teacher_name } = req.body;

        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!mobile || mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
            return res.status(400).json({ message: "Mobile number must be exactly 10 digits" });
        }

        if (!pet_name || !teacher_name) {
            return res.status(400).json({ 
                message: "Please answer both security questions for password recovery" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users 
            (full_name, email_id, mobile_no, password, state_name, city_name, pet_name, teacher_name) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            name, email, mobile, hashedPassword, state, city,
            pet_name.toLowerCase().trim(),
            teacher_name.toLowerCase().trim()
        ], (err, result) => {
            if (err) {
                console.error(err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ 
                        message: "This email is already registered." 
                    });
                }
                return res.status(500).json({ message: "Database Error", error: err });
            }
            
            console.log(`✅ User registered: ${email} with security questions`);
            res.status(200).json({ message: "User Registered Successfully!" });
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.post("/user-login", (req, res) => {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: "Please enter a valid email address" });
    }

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    const sql = "SELECT * FROM users WHERE email_id = ?";

    db.query(sql, [email], async (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Email not registered. Please sign up first." });
        }

        const user = result[0];

        if (user.hasOwnProperty('status') && user.status === 'Deactivated') {
            const cancelDeactivationSql = "UPDATE users SET status = 'Active', deactivated_at = NULL WHERE email_id = ?";
            db.query(cancelDeactivationSql, [email], (cancelErr) => {
                if (cancelErr) {
                    console.error("Error canceling deactivation:", cancelErr);
                } else {
                    console.log(`✅ User deactivation canceled for: ${email}`);
                }
            });
        }

        try {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: "Incorrect password. Please try again." });
            }

            const userData = {
                name: user.full_name || 'User',
                email: user.email_id,
                city: user.city_name || '',
                state: user.state_name || '',
                mobile: user.mobile_no || ''
            };

            console.log("✅ User login successful:", email);
            console.log("📋 User data:", userData);

            // Set session cookie (7 days)
            res.cookie('user_session', JSON.stringify(userData), {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: false,
                sameSite: 'Lax'
            });

            res.status(200).json({
                message: "Login successful",
                user: userData
            });
        } catch (bcryptError) {
            console.error("Password Compare Error:", bcryptError);
            res.status(500).json({ message: "Authentication error" });
        }
    });
});

app.post('/check-user-email', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    const sql = "SELECT email_id FROM users WHERE email_id = ?";
    
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Email not found. Please check and try again." });
        }

        console.log(`✅ Email verified: ${email}`);
        res.json({ message: "Email found" });
    });
});

app.post('/verify-user-security-questions', (req, res) => {
    const { email, pet_name, teacher_name } = req.body;

    if (!email || !pet_name || !teacher_name) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = `
        SELECT pet_name, teacher_name 
        FROM users 
        WHERE email_id = ?
    `;

    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result[0];

        const petMatch = user.pet_name && 
            user.pet_name.toLowerCase() === pet_name.toLowerCase().trim();
        const teacherMatch = user.teacher_name && 
            user.teacher_name.toLowerCase() === teacher_name.toLowerCase().trim();

        if (petMatch && teacherMatch) {
            console.log(`✅ Security questions verified for user: ${email}`);
            res.json({ message: "Security questions verified successfully" });
        } else {
            console.log(`❌ Security questions failed for user: ${email}`);
            res.status(401).json({ 
                message: "Your answers do not match our records. Please try again or use email recovery." 
            });
        }
    });
});

app.post('/send-reset-email', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    const checkSql = "SELECT email_id FROM users WHERE email_id = ?";
    
    db.query(checkSql, [email], async (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Email not found. Please check and try again." });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const updateSql = `
            UPDATE users 
            SET reset_token = ?, reset_token_expiry = ? 
            WHERE email_id = ?
        `;

        db.query(updateSql, [resetToken, tokenExpiry, email], async (updateErr) => {
            if (updateErr) {
                console.error("Token storage error:", updateErr);
                return res.status(500).json({ message: "Failed to generate reset link" });
            }

            const baseUrl = process.env.APP_URL || 'http://localhost:3000';
            const resetLink = `${baseUrl}/user.html?token=${resetToken}`;

            const mailOptions = {
                from: `"QuickKaam" <${process.env.BREVO_SMTP_USER}>`,
                to: email,
                subject: 'QuickKaam - Password Reset Link',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 30px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #ff9933;">QuickKaam Password Reset</h2>
                        <p>Hello,</p>
                        <p>We received a request to reset your password. Click the button below to set a new password:</p>
                        <a href="${resetLink}" style="display: inline-block; margin: 20px 0; padding: 12px 30px; background: #ff9933; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">Reset Password</a>
                        <p>This link will expire in <strong>10 minutes</strong>.</p>
                        <p>If you did not request this, please ignore this email.</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                        <p style="color: #999; font-size: 12px;">QuickKaam - Connecting Skilled Workers with Opportunities</p>
                    </div>
                `
            };

            // Respond immediately so client doesn't hang
            res.json({ message: "Password reset link sent to your email. Please check your inbox (and spam folder)." });

            // Send email in background
            emailTransporter.sendMail(mailOptions, (mailErr) => {
                if (mailErr) {
                    console.error('❌ Email send error:', mailErr.message);
                } else {
                    console.log(`📧 Reset email sent to ${email}`);
                }
            });
        });
    });
});

app.post('/verify-reset-token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    const sql = `
        SELECT email_id, reset_token_expiry 
        FROM users 
        WHERE reset_token = ?
    `;

    db.query(sql, [token], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Invalid reset link" });
        }

        const user = result[0];
        const now = new Date();
        const expiry = new Date(user.reset_token_expiry);

        if (now > expiry) {
            return res.status(400).json({ 
                message: "Reset link has expired. Please request a new one." 
            });
        }

        console.log(`✅ Reset token verified for: ${user.email_id}`);
        res.json({ 
            message: "Token valid",
            email: user.email_id
        });
    });
});

app.post('/reset-user-password', async (req, res) => {
    const { email, new_password } = req.body;

    if (!email || !new_password) {
        return res.status(400).json({ message: "Email and new password required" });
    }

    if (new_password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    try {
        const hashedPassword = await bcrypt.hash(new_password, 10);

        const updateSql = `
            UPDATE users 
            SET password = ?, reset_token = NULL, reset_token_expiry = NULL 
            WHERE email_id = ?
        `;

        db.query(updateSql, [hashedPassword, email], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Failed to reset password" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            console.log(`✅ Password reset successful for user: ${email}`);
            res.json({ message: "Password reset successfully" });
        });
    } catch (error) {
        console.error("Hashing error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.put('/update-user', (req, res) => {
    const { email, name, mobile } = req.body;

    const sql = `UPDATE users SET full_name=?, mobile_no=? WHERE email_id=?`;

    db.query(sql, [name, mobile, email], (err, result) => {
        if (err) return res.status(500).json({ message: "Database Error" });
        if (result.affectedRows > 0) {
            res.json({ message: "Success" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    });
});

app.get('/user-profile', (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const sql = "SELECT full_name as name, email_id as email, mobile_no as mobile, city_name as city, state_name as state FROM users WHERE email_id = ?";

    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const userData = result[0];
        console.log("✅ User profile fetched:", userData);
        
        res.json(userData);
    });
});

app.post('/user-schedule-deactivation', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    
    const checkColumnsSql = "SHOW COLUMNS FROM users LIKE 'status'";
    
    db.query(checkColumnsSql, (checkErr, checkResult) => {
        if (checkErr) {
            console.error("❌ Column check error:", checkErr);
            return res.status(500).json({ message: "Database error checking columns" });
        }
        
        if (checkResult.length === 0) {
            console.log("⚠️ status column doesn't exist, creating it...");
            
            const alterSql = `
                ALTER TABLE users 
                ADD COLUMN status VARCHAR(20) DEFAULT 'Active',
                ADD COLUMN deactivated_at DATETIME DEFAULT NULL
            `;
            
            db.query(alterSql, (alterErr) => {
                if (alterErr) {
                    console.error("❌ Error creating columns:", alterErr);
                    return res.status(500).json({ 
                        message: "Database structure error. Please run /setup-database endpoint first." 
                    });
                }
                
                console.log("✅ Columns created successfully");
                performDeactivation(email, res);
            });
        } else {
            performDeactivation(email, res);
        }
    });
    
    function performDeactivation(email, res) {
        const sql = "UPDATE users SET status = 'Deactivated', deactivated_at = NOW() WHERE email_id = ?";
        
        db.query(sql, [email], (err, result) => {
            if (err) {
                console.error("❌ Deactivation error:", err);
                return res.status(500).json({ 
                    message: "Server error during deactivation",
                    error: err.message 
                });
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            
            console.log(`⚠️ User account scheduled for deletion: ${email}`);
            res.json({ message: "Account deactivated. It will be permanently deleted in 24 hours." });
        });
    }
});

app.get('/check-deactivation', (req, res) => {
    const { email } = req.query;
    
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    
    const checkColumnsSql = "SHOW COLUMNS FROM users LIKE 'status'";
    
    db.query(checkColumnsSql, (checkErr, checkResult) => {
        if (checkErr) {
            console.error("❌ Column check error:", checkErr);
            return res.status(500).json({ message: "Database error" });
        }
        
        if (checkResult.length === 0) {
            console.log("⚠️ status column doesn't exist in users table");
            return res.json({ status: 'Active', deactivated_at: null });
        }
        
        const sql = "SELECT status, deactivated_at FROM users WHERE email_id = ?";
        
        db.query(sql, [email], (err, result) => {
            if (err) {
                console.error("❌ Database error:", err);
                return res.json({ status: 'Active', deactivated_at: null });
            }
            
            if (result.length > 0) {
                const userData = {
                    status: result[0].status || 'Active',
                    deactivated_at: result[0].deactivated_at || null
                };
                res.json(userData);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        });
    });
});

// ==================== TICKET ROUTES ====================

app.post('/raise-ticket', (req, res) => {
    console.log('\n📨 Received ticket request:', req.body);

    const { user_name, mobile_number, state, city, work_type, problem, user_email } = req.body;

    if (!state || !city || !work_type || !problem || !user_email) {
        console.log('❌ Missing required fields');
        return res.status(400).json({ message: 'State, city, work type, problem, and email are required' });
    }

    if (problem.trim().length < 10) {
        return res.status(400).json({ message: 'Problem description must be at least 10 characters' });
    }

    const getUserSql = "SELECT full_name, mobile_no FROM users WHERE email_id = ?";
    
    db.query(getUserSql, [user_email], (userErr, userResult) => {
        if (userErr) {
            console.error('❌ Error fetching user:', userErr);
            return res.status(500).json({ message: 'Database error' });
        }
        
        if (userResult.length === 0) {
            return res.status(404).json({ message: 'User not found. Please login again.' });
        }
        
        const userData = userResult[0];
        const finalUserName = user_name || userData.full_name || 'User';
        const finalMobileNumber = mobile_number || userData.mobile_no || '';
        
        if (!finalMobileNumber || !/^[0-9]{10}$/.test(finalMobileNumber)) {
            return res.status(400).json({ 
                message: 'Invalid mobile number. Please update your profile with a valid 10-digit mobile number.' 
            });
        }

        const query = `
            INSERT INTO tickets 
            (state, city, work_type, user_name, mobile_number, problem_description, user_email, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
        `;

        const params = [state, city, work_type, finalUserName.trim(), finalMobileNumber, problem.trim(), user_email];

        db.query(query, params, (err, result) => {
            if (err) {
                console.error('❌ Insert error:', err);
                return res.status(500).json({ 
                    message: 'Failed to raise ticket',
                    error: err.message
                });
            }

            console.log(`✅ Ticket #${result.insertId} created successfully!`);
            
            res.status(201).json({ 
                message: 'Ticket raised successfully!', 
                ticket_id: result.insertId,
                user_name: finalUserName,
                mobile_number: finalMobileNumber
            });
        });
    });
});

app.post('/accept-ticket', (req, res) => {
    const { ticket_id, worker_mobile } = req.body;

    console.log("🎫 Accept ticket request - Ticket ID:", ticket_id, "Worker Mobile:", worker_mobile);

    if (!ticket_id || !worker_mobile) {
        return res.status(400).json({ 
            message: "Missing required fields: ticket_id and worker_mobile are required" 
        });
    }

    const getWorkerSql = `
        SELECT worker_name, contact, work_type, city, state, latitude, longitude 
        FROM workers 
        WHERE contact = ?
    `;

    db.query(getWorkerSql, [worker_mobile], (workerErr, workerResult) => {
        if (workerErr) {
            console.error("❌ Error fetching worker:", workerErr);
            return res.status(500).json({ 
                message: "Database error fetching worker details",
                error: workerErr.message 
            });
        }

        if (workerResult.length === 0) {
            return res.status(404).json({ message: "Worker not found" });
        }

        const worker = workerResult[0];
        console.log("✅ Worker details fetched:", worker);

        const checkQuery = `SELECT id, status FROM tickets WHERE id = ?`;
        
        db.query(checkQuery, [ticket_id], (checkErr, checkResults) => {
            if (checkErr) {
                console.error("❌ Check error:", checkErr);
                return res.status(500).json({ 
                    message: "Database error",
                    error: checkErr.message 
                });
            }

            if (checkResults.length === 0) {
                return res.status(404).json({ message: "Ticket not found" });
            }

            if (checkResults[0].status !== 'pending') {
                return res.status(400).json({ 
                    message: "This ticket has already been accepted by another worker" 
                });
            }

            const updateQuery = `
                UPDATE tickets 
                SET 
                    status = 'accepted',
                    accepted_worker_name = ?,
                    accepted_worker_mobile = ?,
                    accepted_worker_work_type = ?,
                    accepted_at = NOW(),
                    city = ?,
                    state = ?
                WHERE id = ? AND status = 'pending'
            `;

            db.query(updateQuery, [
                worker.worker_name,
                worker.contact,
                worker.work_type,
                worker.city,
                worker.state,
                ticket_id
            ], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error("❌ Update error:", updateErr);
                    return res.status(500).json({ 
                        message: "Failed to update ticket",
                        error: updateErr.message 
                    });
                }

                if (updateResult.affectedRows === 0) {
                    return res.status(400).json({ 
                        message: "Ticket was already accepted by another worker" 
                    });
                }

                console.log(`✅ Ticket #${ticket_id} accepted by ${worker.worker_name} (${worker.contact})`);
                console.log(`📍 Worker location: ${worker.city}, ${worker.state} (${worker.latitude}, ${worker.longitude})`);
                
                res.json({ 
                    message: "Ticket accepted successfully!",
                    ticket_id: ticket_id,
                    worker: {
                        name: worker.worker_name,
                        mobile: worker.contact,
                        work_type: worker.work_type,
                        city: worker.city,
                        state: worker.state,
                        latitude: worker.latitude,
                        longitude: worker.longitude
                    }
                });
            });
        });
    });
});

app.get('/user-tickets', (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const query = `
        SELECT 
            id,
            user_name,
            mobile_number,
            state,
            city,
            work_type,
            problem_description,
            status,
            created_at,
            accepted_worker_name,
            accepted_worker_mobile,
            accepted_worker_work_type,
            accepted_at,
            rating,
            completed_at
        FROM tickets
        WHERE user_email = ?
        ORDER BY created_at DESC
    `;

    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }
        
        console.log(`📋 Found ${results.length} tickets for ${email}`);
        results.forEach(ticket => {
            if (ticket.status === 'accepted') {
                console.log(`   Ticket #${ticket.id}: Worker=${ticket.accepted_worker_name || 'NULL'}, Mobile=${ticket.accepted_worker_mobile || 'NULL'}`);
            }
        });
        
        res.json(results);
    });
});

app.get('/verify-ticket', (req, res) => {
    const { ticket_id } = req.query;

    if (!ticket_id) {
        return res.status(400).json({ message: "ticket_id is required" });
    }

    const sql = `
        SELECT 
            id, status, 
            accepted_worker_name, 
            accepted_worker_mobile, 
            accepted_worker_work_type,
            accepted_at
        FROM tickets 
        WHERE id = ?
    `;

    db.query(sql, [ticket_id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.json({
            ticket_id: result[0].id,
            status: result[0].status,
            worker_name: result[0].accepted_worker_name,
            worker_mobile: result[0].accepted_worker_mobile,
            worker_work_type: result[0].accepted_worker_work_type,
            accepted_at: result[0].accepted_at
        });
    });
});

app.get('/pending-tickets', (req, res) => {
    const { city, work_type } = req.query;

    let query = `
        SELECT id, state, city, work_type, user_name, mobile_number, problem_description, created_at 
        FROM tickets 
        WHERE status = 'pending'
    `;

    const params = [];

    if (city) {
        query += ' AND city = ?';
        params.push(city);
    }

    if (work_type) {
        query += ' AND work_type = ?';
        params.push(work_type);
    }

    query += ' ORDER BY created_at DESC';

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('❌ Query error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
});

// ============================================================================
// UPDATED: SEARCH WORKERS WITH LOCATION-BASED SORTING (ONLY MODIFIED ENDPOINT)
// ============================================================================
app.get('/search-workers', (req, res) => {
    const { city, work, user_lat, user_lng } = req.query;

    if (!city || !work) {
        return res.status(400).json({ message: "City and work are required" });
    }

    console.log("🔍 Search workers request:", { city, work, user_lat, user_lng });

    const sql = `
        SELECT 
            worker_name,
            contact,
            work_type,
            experience,
            latitude,
            longitude,
            city,
            state
        FROM workers
        WHERE city = ? AND work_type = ? AND status != 'Deactivated'
        ORDER BY (latitude IS NULL), worker_name
    `;

    db.query(sql, [city, work], (err, results) => {
        if (err) {
            console.error("❌ SQL ERROR:", err.sqlMessage);
            return res.status(500).json({ message: "Database Error" });
        }
        
        // Add stats to each worker
        const workersWithStats = results.map(worker => {
            return new Promise((resolve) => {
                const statsSql = `
                    SELECT 
                        COUNT(*) as completed_jobs,
                        AVG(rating) as average_rating
                    FROM tickets 
                    WHERE accepted_worker_mobile = ? AND status = 'completed' AND rating IS NOT NULL
                `;
                
                db.query(statsSql, [worker.contact], (statErr, statResult) => {
                    if (!statErr && statResult.length > 0) {
                        worker.completed_jobs = statResult[0].completed_jobs || 0;
                        worker.average_rating = statResult[0].average_rating || 0;
                    } else {
                        worker.completed_jobs = 0;
                        worker.average_rating = 0;
                    }

                    // ============================================================================
                    // NEW: Calculate distance if user location is provided
                    // ============================================================================
                    if (user_lat && user_lng && worker.latitude && worker.longitude) {
                        const userLat = parseFloat(user_lat);
                        const userLng = parseFloat(user_lng);
                        const workerLat = parseFloat(worker.latitude);
                        const workerLng = parseFloat(worker.longitude);
                        
                        // Calculate distance using Haversine formula
                        worker.distance = calculateDistance(userLat, userLng, workerLat, workerLng);
                        
                        console.log(`📍 Distance to ${worker.worker_name}: ${worker.distance.toFixed(2)} km`);
                    } else {
                        // No distance calculation if coordinates missing
                        worker.distance = null;
                    }
                    // ============================================================================
                    
                    resolve(worker);
                });
            });
        });

        Promise.all(workersWithStats).then(workers => {
            // ============================================================================
            // NEW: Sort by distance if location was provided
            // ============================================================================
            if (user_lat && user_lng) {
                workers.sort((a, b) => {
                    // Workers without coordinates go to the end
                    if (a.distance === null && b.distance === null) return 0;
                    if (a.distance === null) return 1;
                    if (b.distance === null) return -1;
                    
                    // Sort by distance (nearest first)
                    return a.distance - b.distance;
                });
                
                console.log(`✅ Found ${workers.length} workers, sorted by proximity`);
            } else {
                console.log(`✅ Found ${workers.length} workers (city-based search)`);
            }
            // ============================================================================
            
            res.json(workers);
        });
    });
});
// ============================================================================
// END OF MODIFIED SEARCH WORKERS ENDPOINT
// ============================================================================

app.get('/worker-location', (req, res) => {
    const { contact } = req.query;

    if (!contact) {
        return res.status(400).json({ message: "Contact is required" });
    }

    const sql = `
        SELECT city, state, latitude, longitude 
        FROM workers 
        WHERE contact = ?
    `;

    db.query(sql, [contact], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Worker not found" });
        }

        const worker = result[0];
        res.json({
            city: worker.city,
            state: worker.state,
            latitude: worker.latitude,
            longitude: worker.longitude
        });
    });
});

// ==================== CLEANUP & UTILITIES ====================

app.post('/setup-database', (req, res) => {
    console.log("🔧 Setting up database columns...");
    
    const queries = [
        {
            check: "SHOW COLUMNS FROM tickets LIKE 'rating'",
            alter: "ALTER TABLE tickets ADD COLUMN rating INT DEFAULT 0",
            name: "rating"
        },
        {
            check: "SHOW COLUMNS FROM tickets LIKE 'completed_at'",
            alter: "ALTER TABLE tickets ADD COLUMN completed_at DATETIME DEFAULT NULL",
            name: "completed_at"
        },
        {
            check: "SHOW COLUMNS FROM users LIKE 'status'",
            alter: "ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'Active'",
            name: "users.status"
        },
        {
            check: "SHOW COLUMNS FROM users LIKE 'deactivated_at'",
            alter: "ALTER TABLE users ADD COLUMN deactivated_at DATETIME DEFAULT NULL",
            name: "users.deactivated_at"
        },
        {
            check: "SHOW COLUMNS FROM workers LIKE 'friend_name'",
            alter: "ALTER TABLE workers ADD COLUMN friend_name VARCHAR(255) DEFAULT NULL",
            name: "workers.friend_name"
        },
        {
            check: "SHOW COLUMNS FROM workers LIKE 'school_name'",
            alter: "ALTER TABLE workers ADD COLUMN school_name VARCHAR(255) DEFAULT NULL",
            name: "workers.school_name"
        },
        {
            check: "SHOW COLUMNS FROM workers LIKE 'birthplace'",
            alter: "ALTER TABLE workers ADD COLUMN birthplace VARCHAR(255) DEFAULT NULL",
            name: "workers.birthplace"
        },
        {
            check: "SHOW COLUMNS FROM users LIKE 'pet_name'",
            alter: "ALTER TABLE users ADD COLUMN pet_name VARCHAR(255) DEFAULT NULL",
            name: "users.pet_name"
        },
        {
            check: "SHOW COLUMNS FROM users LIKE 'teacher_name'",
            alter: "ALTER TABLE users ADD COLUMN teacher_name VARCHAR(255) DEFAULT NULL",
            name: "users.teacher_name"
        },
        {
            check: "SHOW COLUMNS FROM users LIKE 'reset_token'",
            alter: "ALTER TABLE users ADD COLUMN reset_token VARCHAR(255) DEFAULT NULL",
            name: "users.reset_token"
        },
        {
            check: "SHOW COLUMNS FROM users LIKE 'reset_token_expiry'",
            alter: "ALTER TABLE users ADD COLUMN reset_token_expiry DATETIME DEFAULT NULL",
            name: "users.reset_token_expiry"
        }
    ];
    
    let results = [];
    let processedCount = 0;
    
    queries.forEach(query => {
        db.query(query.check, (checkErr, checkResult) => {
            if (checkErr) {
                results.push({ column: query.name, status: 'error', error: checkErr.message });
                processedCount++;
            } else if (checkResult.length === 0) {
                db.query(query.alter, (alterErr, alterResult) => {
                    if (alterErr) {
                        results.push({ column: query.name, status: 'failed', error: alterErr.message });
                    } else {
                        results.push({ column: query.name, status: 'added' });
                    }
                    processedCount++;
                    
                    if (processedCount === queries.length) {
                        res.json({ message: "Database setup complete", results });
                    }
                });
            } else {
                results.push({ column: query.name, status: 'exists' });
                processedCount++;
                
                if (processedCount === queries.length) {
                    res.json({ message: "Database setup complete", results });
                }
            }
        });
    });
});

app.post('/logout', (req, res) => {
    const { email } = req.body;
    console.log(`👋 User logged out: ${email || 'unknown'}`);
    res.clearCookie('user_session');
    res.clearCookie('worker_session');
    res.json({ message: "Logged out successfully" });
});

// Cleanup Deactivated Accounts (runs every 5 minutes)
setInterval(() => {
    console.log("🧹 Running scheduled cleanup...");
    
    const deleteUsersSql = `
        DELETE FROM users 
        WHERE status = 'Deactivated' 
        AND deactivated_at <= NOW() - INTERVAL 24 HOUR
    `;
    
    db.query(deleteUsersSql, (err, result) => {
        if (err) {
            console.error("User Cleanup Error:", err);
        } else if (result.affectedRows > 0) {
            console.log(`🗑️ ${result.affectedRows} user account(s) permanently deleted.`);
        }
    });
    
    const deleteWorkersSql = `
        DELETE FROM workers 
        WHERE status = 'Deactivated' 
        AND deactivated_at <= NOW() - INTERVAL 1 HOUR
    `;

    db.query(deleteWorkersSql, (err, result) => {
        if (err) {
            console.error("Worker Cleanup Error:", err);
        } else if (result.affectedRows > 0) {
            console.log(`🗑️ ${result.affectedRows} worker account(s) permanently deleted.`);
        }
    });
    
    const now = Date.now();
    for (const [mobile, data] of otpStore.entries()) {
        if (now > data.expiry) {
            otpStore.delete(mobile);
            console.log(`🗑️ Expired OTP cleaned for: ${mobile}`);
        }
    }
    
    const cleanTokensSql = `
        UPDATE users 
        SET reset_token = NULL, reset_token_expiry = NULL 
        WHERE reset_token_expiry < NOW()
    `;
    
    db.query(cleanTokensSql, (err, result) => {
        if (err) {
            console.error("Token cleanup error:", err);
        } else if (result.affectedRows > 0) {
            console.log(`🗑️ ${result.affectedRows} expired reset token(s) cleaned.`);
        }
    });
}, 300000);

app.get('/', (req, res) => {
    res.redirect('/home.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log('📊 Database: skill_india_db');
    console.log('🔧 Features: Worker profiles, User accounts, Service requests, Ratings, Deactivation timers');
    console.log('📍 NEW: Location-based worker search with proximity sorting');
    console.log('🔐 User Password Recovery (Security Questions + Email)');
    console.log('🧹 Cleanup job: Every 5 minutes');
    console.log('⏰ User deactivation: 24 hours | Worker deactivation: 1 hour');
    console.log('');
    console.log('📧 Email: Brevo SMTP (smtp-relay.brevo.com:587)');
});