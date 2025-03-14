# A Mobile and Web based Event Management System with Aspect-based Sentiment Analysis_

  **Description:** Lorem Ipsum solom not bor ode

  ## Table of Contents

  1. Prerequisites
  2. Backend Setup (Laravel) - Clone Repository - Install Dependencies - Environment Configuration - Database Setup - Run Migrations - Start Laravel Server with specific channel 
  
  3. Frontend Setup (React Native) - Clone Repository - Install Dependencies - Environment Configuration - Run the App with specific channel

  ##

  ## Prerequisites Ensure you have the following installed on your computer:

  - **Node.js** (v14.x or higher)
  - **npm** (v6.x or higher) or **Yarn** (v1.22.x or higher)
  - **PHP** (v7.4 or higher)
  - **Composer**
  - **Laravel Installer**
  - **MySQL**
  - **React Native Expo**
  - **Android Studio**
  - **expo** client version 2.31.2 (supported SDKs: 51)
  ##

  ## Backend Setup
  ## ⚠️**Outdated Backend** 
The backend repository inside this monorepo is no longer maintained. Please use the updated repository instead:

🔗 Updated Repository:
👉 GitHub - [CAPSTONE_EMS_LARAVEL_BACKEND ](https://github.com/BunjanMark/CAPSTONE_EMS_LARAVEL_BACKEND.git)(Updated)

  
### 1.  Clone Repository
-  `git clone https://github.com/BunjanMark/CAPSTONE_EMS_LARAVEL_BACKEND.git`

### 2.  Install Dependencies
- run command `composer install`

### 3.  Environment Configuration
-  `cp .env.example .env` then configure the .env and run `php artisan key:generate`

### 4.  Start Laravel Server with specific channel
 -  `php artisan app:serve-project <IPv4> <port>`

### 5.  Start XAMPP application
 - start/run **Apache** and **MySQL** modules

### 6.  Update `.env` 
 - uncomment lines these inside `.env` file line 22-27 and put value in `DB_DATABASE` variable

        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE= <db_name>
        DB_USERNAME=root
        DB_PASSWORD=`
			
### 7.  Run migration
 -  execute command `php artisan migrate`
### 8.  Seed the database
 - execude command `php artisan db:refresh-seed`

  ## Fontend Setup (React Native)

### 1.  Clone repository
 - `git clone https://github.com/BunjanMark/CAPSTONE_EMS.git` then `cd eventwise_main`
### 2.  Install Dependencies
 - `npm install`
### 3.  Environment Configuration
 - Navigate to src/constants/constant.js then change `const API_URL ="your IP and port here";`
 - create `.env` file and configure the following


        EXPO_SUPABASE_URL=https://<your_url>.supabase.co
        EXPO_SUPABASE_KEY=<your_key>

### 4.  Run the app `npm start`