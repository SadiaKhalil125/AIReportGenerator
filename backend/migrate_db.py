#!/usr/bin/env python3
"""
Database migration script to add generation_method field to reports table
"""

import sqlite3
import os

def migrate_database():
    """Migrate the database to add the generation_method column"""
    db_path = "./genai_reports.db"
    
    if not os.path.exists(db_path):
        print("Database file not found. It will be created when the application starts.")
        return
    
    try:
        # Connect to the database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Check if the generation_method column already exists
        cursor.execute("PRAGMA table_info(reports)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'generation_method' not in columns:
            print("Adding generation_method column to reports table...")
            cursor.execute("ALTER TABLE reports ADD COLUMN generation_method TEXT")
            conn.commit()
            print("✅ Migration completed successfully!")
        else:
            print("✅ generation_method column already exists.")
        
        conn.close()
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        if conn:
            conn.close()

if __name__ == "__main__":
    print("Running database migration...")
    migrate_database() 