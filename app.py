from flask import Flask, request, render_template, jsonify
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# Load database configuration
import config as config

@app.route('/')
def index():
    return render_template('/index.html')

@app.route('/register', methods=['POST'])
def register():
    try:
        # Retrieve form data
        data = request.json
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        email = data.get('email')
        password = data.get('password')
        phone_number = data.get('phoneNumber')
        address = data.get('address')
        city = data.get('city')
        province = data.get('province')
        country = data.get('country')

        return jsonify(message="Registration successful!"), 200

        # Sample Database connection
        # connection = mysql.connector.connect(
        #     host=config.DB_HOST,
        #     database=config.DB_NAME,
        #     user=config.DB_USER,
        #     password=config.DB_PASSWORD
        # )

        # if connection.is_connected():
        #     cursor = connection.cursor()
        #     sql_insert_query = """INSERT INTO users (first_name, last_name, email, password, phone_number, address, city, province, country) 
        #                           VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        #     record = (first_name, last_name, email, password, phone_number, address, city, province, country)
        #     cursor.execute(sql_insert_query, record)
        #     connection.commit()
        #     return jsonify(message="Registration successful!"), 200
    except Error as e:
        return jsonify(message=str(e)), 500
    finally:
        print("Success")
        # Sample Database connection
        # if (connection.is_connected()):
        #     cursor.close()
        #     connection.close()

if __name__ == '__main__':
    app.run()
