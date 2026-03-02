from faker import Faker
import mysql.connector
import random
from datetime import datetime, timedelta

fake = Faker("en_IN")
ENROLL = "12202130601018"
TOTAL_APPLICANTS = 20000

# Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="job_applicants_v2"
)
cursor = conn.cursor()

# Predefined data
degrees = {1: '10th', 2: '12th', 3: 'UG', 4: 'PG'}
proficiencies = [1, 2, 3]  # Beginner, Intermediate, Expert
skills_list = ['Java', 'Python', 'SQL', 'React', 'PHP', 'HTML', 'CSS', 'NodeJS']
languages_list = ['English', 'Hindi', 'Gujarati', 'Tamil', 'Telugu', 'Kannada']

for i in range(TOTAL_APPLICANTS):
    # ---------- Applicants ----------
    first = fake.first_name() + "_" + ENROLL
    second = fake.last_name() + "_" + ENROLL
    father = fake.first_name() + "_" + ENROLL
    phone = f"9{fake.random_number(digits=9, fix_len=True)}"
    email = f"user{i}_{ENROLL}@example.com"

    cursor.execute("""
        INSERT INTO Applicants
        (first_name, second_name, father_name, phone, email, created_at)
        VALUES (%s,%s,%s,%s,%s,CURDATE())
    """, (first, second, father, phone, email))

    applicant_id = cursor.lastrowid

    # ---------- Address ----------
    cursor.execute("""
        INSERT INTO Address
        (applicant_id, locality, city, state, pin_code, created_at)
        VALUES (%s,%s,%s,%s,%s,CURDATE())
    """, (
        applicant_id,
        fake.street_name(),
        fake.city(),
        fake.state(),
        fake.postcode()
    ))

    # ---------- Education (10th,12th,UG,PG) ----------
    for degree_id in degrees.keys():
        marks = random.randint(50, 95) if degree_id <= 2 else random.randint(60, 100)
        year = random.randint(2005, 2023)  # random graduation/year
        board = fake.company() if degree_id <= 2 else None

        cursor.execute("""
            INSERT INTO Education
            (applicant_id, degree_id, marks, board, year, created_at)
            VALUES (%s,%s,%s,%s,%s,CURDATE())
        """, (applicant_id, degree_id, marks, board, year))

    # ---------- Experience (0-3 companies) ----------
    exp_count = random.randint(0, 3)
    for _ in range(exp_count):
        start_date = fake.date_between(start_date='-10y', end_date='-1y')
        end_date = fake.date_between(start_date=start_date, end_date='today')
        cursor.execute("""
            INSERT INTO Experience
            (applicant_id, company_name, position, role, start_date, end_date, created_at)
            VALUES (%s,%s,%s,%s,%s,%s,CURDATE())
        """, (
            applicant_id,
            fake.company(),
            fake.job(),
            fake.sentence(nb_words=6),
            start_date,
            end_date
        ))

    # ---------- Languages (1-3) ----------
    lang_count = random.randint(1, 3)
    selected_langs = random.sample(languages_list, lang_count)
    for lang in selected_langs:
        cursor.execute("""
            INSERT INTO Languages
            (applicant_id, name, reading, writing, speaking, created_at)
            VALUES (%s,%s,%s,%s,%s,CURDATE())
        """, (
            applicant_id,
            lang,
            random.choice(proficiencies),
            random.choice(proficiencies),
            random.choice(proficiencies)
        ))

    # ---------- Skills (3-6) ----------
    skill_count = random.randint(3, 6)
    selected_skills = random.sample(skills_list, skill_count)
    for skill in selected_skills:
        cursor.execute("""
            INSERT INTO Skills
            (applicant_id, name, proficiency, created_at)
            VALUES (%s,%s,%s,CURDATE())
        """, (
            applicant_id,
            skill,
            random.choice(proficiencies)
        ))

    # Commit every 500 rows to reduce memory pressure
    if (i+1) % 500 == 0:
        conn.commit()
        print(f"{i+1} applicants inserted")

# Final commit
conn.commit()
cursor.close()
conn.close()
print("All 20,000 applicants inserted successfully!")