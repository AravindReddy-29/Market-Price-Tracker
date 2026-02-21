================= Problem Statement =================

Farmers often sell crops without awareness of current market price trends.
This lack of transparency can lead to poor selling decisions and reduced profits.

There is a need for a system that:

Displays crop prices clearly

Shows price trends visually

Provides analytical insights

Supports better decision-making

================= Solution Overview =================

Crop Market Tracker is a full-stack web application that:

Displays crop prices across markets

Visualizes price trends using charts

Calculates percentage change

Provides intelligent recommendations (Hold / Sell / Monitor)

Supports user authentication

Enables filtering by crop and market

The system converts raw market price data into actionable insights.

================= Technology Stack =================
Frontend

HTML

TailwindCSS

JavaScript

Chart.js

Backend

Node.js

Express.js (REST API)

Database

MySQL

================= System Architecture =================

The system follows a 3-tier architecture:

1. Presentation Layer

Handles UI rendering and user interaction.

2. Application Layer

Handles API routing and business logic.

3. Data Layer

Handles structured data storage in MySQL.

Data Flow

Frontend → REST API → MySQL → JSON Response → Frontend Update

================= Database Design =================

Normalized relational schema:

users (Authentication data)

crops (Crop information)

markets (Market information)

prices (Price records with foreign keys)

This ensures:

Data integrity

Scalability

Clean relationships

================= Key Features =================
Authentication

User Signup

User Login

REST-based secure flow

Market Analysis

Crop selection

Market filtering

Dynamic chart visualization

Real-time API integration

Trend Calculation

The system compares the latest two prices and calculates:

Price direction

Percentage change

Decision Support

Based on trend:

If price increases → Suggest holding crop

If price decreases → Suggest selling

If stable → Suggest monitoring

================= Installation & Setup =================
Step 1: Clone Repository
git clone <repository-link>
Step 2: Install Dependencies
npm install
Step 3: Configure Database

Create MySQL database: agri_tracker

Create required tables

Update credentials in server.js

Step 4: Run Server
node server.js
Step 5: Access Application
http://localhost:5000
================= Functional Flow =================

User logs in

Dashboard overview is displayed

User navigates to Market Prices

Select crop and market

Backend retrieves price data

Chart updates dynamically

System provides recommendation

================= Impact =================

Improves market transparency

Supports informed selling decisions

Encourages data-driven agriculture

Converts price data into strategic insights

================= Future Enhancements =================

Government live API integration

Moving average trend analysis

Best market recommendation

Data export functionality

Admin price update panel

Predictive price modeling