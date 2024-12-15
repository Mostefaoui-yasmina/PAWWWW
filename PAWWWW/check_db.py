import sqlite3

# Connexion à la base de données
conn = sqlite3.connect('todo.db')
cursor = conn.cursor()

# Liste les tables existantes
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
print("Tables dans la base de données :", cursor.fetchall())

# Affiche le contenu de la table 'user'
cursor.execute("SELECT * FROM user;")
print("Contenu de la table User :", cursor.fetchall())

# Affiche le contenu de la table 'task'
cursor.execute("SELECT * FROM task;")
print("Contenu de la table Task :", cursor.fetchall())

conn.close()