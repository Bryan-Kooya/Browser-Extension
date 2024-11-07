# Browser-Extension

Project Architecture Document
1. Overview
1.1 Project Name
LinkedIn Message Scanner Extension

1.2 Purpose
The browser extension will enable users to log in, scan their LinkedIn messages, and save relevant data (such as message content, attachments, and contact details) to a database. It will prevent duplicate messages from being saved.

2. High-Level Architecture
2.1 Components
The solution is divided into three primary components:

Frontend (React.js Extension)

A Chrome/Edge extension built with React.js.
Allows users to log in and interact with the LinkedIn message scanning features.
Backend (Node.js/Express Server)

Manages user authentication and interaction with the database.
Provides API endpoints for user login, saving messages, and checking for duplicates.
Communicates with GCP services for data storage (Firestore and Cloud Storage).
Google Cloud Platform (GCP)

Firebase Authentication for user management.
Cloud Firestore to store user data and LinkedIn message details.
Cloud Storage for storing attachments like files and images.
Cloud Functions or Cloud Run for serverless deployment of the backend.
3. Detailed Architecture
3.1 Frontend (React.js Extension)
Features:

Login Page: Users log in with their credentials.
Extension Popup: After login, users can click the extension to trigger the message scanning process.
LinkedIn Interaction: The extension will interact with the LinkedIn page, specifically the messages section.
Flow:

User installs the extension from the Chrome Web Store.
User logs in (via Firebase Authentication).
Once logged in, the extension can scan LinkedIn messages by activating a button in the popup.
The extension sends the message data to the backend for processing.
Technologies:

React.js (Frontend Framework)
Chrome Extensions API (Background scripts, popup)
Firebase SDK (for interacting with Firebase Authentication)
3.2 Backend (Node.js/Express)
Features:

Authentication: Handles login and session management using Firebase Authentication.
API Endpoints:
/login: Handles user login via email/password.
/save-message: Receives data from the frontend (LinkedIn messages) and saves it to Firestore, checking for duplicates.
Cloud Integration:
Firestore: Stores message data (full name, content, phone, email, and attachment URL).
Cloud Storage: Saves message attachments (files, images) and links them in the Firestore record.
Flow:

User logs in through the extension, which sends credentials to the backend.
The backend authenticates the user via Firebase.
When the user scans LinkedIn messages, the extension sends the data to the backend.
The backend processes the message data, checks for duplicates in Firestore, and stores the new message data, including any attachments in Cloud Storage.
Technologies:

Node.js + Express (Backend Framework)
Firebase Admin SDK (for Firebase Authentication)
Google Cloud SDK (for Firestore and Cloud Storage)
3.3 GCP Integration
Firebase Authentication:

Manages user sign-up and login with email/password.
Provides a secure authentication system without managing passwords manually.
Cloud Firestore:

Stores data related to each user’s messages (e.g., full name, message content, attachments, phone numbers, and emails).
Ensures scalable storage for user-related data.
Cloud Storage:

Stores any message attachments (e.g., files or images).
Saves URLs of the attachments in the Firestore database.
Google Cloud Run or Cloud Functions:

Deploys the backend as serverless microservices that scale based on demand.
Handles API requests such as saving messages and authenticating users.
4. Data Flow Diagram
4.1 User Interaction Flow
Login:
User installs the extension and logs in using Firebase Authentication.
Scanning LinkedIn Messages:
The extension identifies the user’s LinkedIn account.
Scans the messages on the LinkedIn page and extracts relevant data.
Sends the data to the backend for storage in Firestore and Cloud Storage.
4.2 Backend Data Flow
Login Request: The backend verifies the user credentials via Firebase Authentication.
Message Storage:
The backend receives the scanned message data (full name, email, content, attachments).
It checks if the message already exists in Firestore (to prevent duplication).
If the message is new, the backend saves it to Firestore and uploads any attachments to Cloud Storage.
5. Deployment and Hosting
5.1 Frontend (Extension) Deployment
The extension is packaged and uploaded to the Chrome Web Store for installation by users.
It will communicate with the backend via secure HTTPS API calls.
5.2 Backend Deployment
The backend will be deployed on Google Cloud Run or Google App Engine for scalability.
The backend will communicate with Firebase Authentication, Firestore, and Cloud Storage via secure service accounts.
5.3 Environment Management
Use Google Secret Manager to securely manage environment variables and API keys for Firebase, Firestore, and Cloud Storage.
Configuration (such as Firebase credentials, GCP keys) will be stored in .env files and accessed securely via Google Cloud IAM.
6. Security Considerations
Data Privacy: Ensure that all user data is stored securely and follows GDPR or other applicable data protection regulations.
Authentication: All API endpoints requiring user interaction will be protected by Firebase Authentication and JWT tokens to ensure secure access.
CORS: Implement Cross-Origin Resource Sharing (CORS) on the backend to allow only valid requests from the frontend extension.
7. Next Steps
7.1 Planning the Development Phases
Phase 1: Set up GCP services, Firebase, and Cloud Storage. Implement basic login and user registration.
Phase 2: Build out the extension UI and communication with the backend.
Phase 3: Implement message scanning and storage logic in the backend.
Phase 4: Set up Cloud Run or App Engine for backend deployment.
Phase 5: Test integration and deploy the extension to the Chrome Web Store.
8. Conclusion
This architecture outlines a scalable solution for the LinkedIn message scanning extension. It leverages React for the frontend, Node.js/Express for the backend, and GCP services (Firebase, Firestore, Cloud Storage) for authentication, data storage, and file management. The next steps involve implementing the solution in phases, with careful attention to security and user experience.
