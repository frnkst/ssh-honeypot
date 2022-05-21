import psycopg2

try:
    connection = psycopg2.connect(user="honey",
                                  password="45432dfdf*dfdfl",
                                  host="127.0.0.1",
                                  port="5432",
                                  database="honey")
    cursor = connection.cursor()

    postgres_insert_query = """ INSERT INTO logins (ID, NAME) VALUES (%s,%s)"""
    record_to_insert = (1, 'One Plus')
    cursor.execute(postgres_insert_query, record_to_insert)

    connection.commit()
    count = cursor.rowcount
    print(count, "Record inserted successfully into mobile table")

except (Exception, psycopg2.Error) as error:
    print("Failed to insert record into mobile table", error)

finally:
    # closing database connection.
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")
