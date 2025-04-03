# Authentification - LiveCampus

## Utilisateurs par défaut
Lors de l'installation initiale, deux utilisateurs sont créés par défaut dans la base de données :

1. **Administrateur (admin)** :
   - **Nom d'utilisateur** : `admin`
   - **Mot de passe** : `admin`
   - **Rôle** : Admin (`role_id = 1`)

2. **Invité (guest)** :
   - **Nom d'utilisateur** : `guest`
   - **Mot de passe** : `guest`
   - **Rôle** : Guest (`role_id = 2`)

Ces utilisateurs sont définis dans le fichier `structure.sql` et sont insérés automatiquement lors de l'initialisation de la base de données.

---

## Création d'un utilisateur
- Lorsqu'un utilisateur s'inscrit sur le site via le formulaire d'inscription, il est créé avec le rôle **guest** par défaut (`role_id = 2`).

---