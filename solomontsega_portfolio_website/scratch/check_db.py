import sqlite3

def check_db():
    try:
        conn = sqlite3.connect('portfolio.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM credentials")
        rows = cursor.fetchall()
        for row in rows:
            print(row)
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_db()
