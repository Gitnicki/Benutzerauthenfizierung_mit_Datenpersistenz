# Aufbauend auf die Aufgabe "Express Grundlagen 5: Benutzerauthentifizierung" erweitert bitte die Anwendung um eine Persitenzschicht (MongoDB) und eine Registerroute

# Funktionen:
- Register Route zum anlegen und speichern von Userinformationen in einer MongoDB (Username, Email, Password)
- Login Route zur Authentifizierung von Usern mit Benutzername/Email und Passwort
- Logout Route und den User zu De-Authentifizieren
# Hinweise:
- Nutze das mongoose Package um ein Datenmodel für den User zu erstellen
- Nutze bcrypt um die Passwörter verschlüsselt in der DB zu speichern
- Nutze brypt compare für Benutzername und Passwort-Überprüfung.
- Nutze Postman für die Tests für die Authentifizierung und Registrierung
- Exportiere die Postmann Collection und pushe sie in das Repo
- Ein User gilt nur dann als erfolgreich authentifiziert, wenn entweder ein Session Cookie übergeben wird oder ein Token
