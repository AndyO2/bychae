# Firebase Integration Setup Guide

This guide will help you set up Firebase to load food cart data from a database instead of using static data.

## Prerequisites

1. A Firebase project (create one at [Firebase Console](https://console.firebase.google.com/))
2. Node.js and npm installed
3. Basic knowledge of Firebase services

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard
4. Enable Firestore Database (Cloud Firestore)

## Step 2: Get Firebase Configuration

1. In your Firebase project, click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>) to add a web app
5. Register your app with a nickname
6. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## Step 3: Set Up Environment Variables

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add your Firebase configuration:

```bash
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

3. Replace the placeholder values with your actual Firebase configuration

## Step 4: Set Up Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development (you can secure it later)
4. Select a location close to your users
5. Click "Done"

## Step 5: Create Database Collection

1. In Firestore Database, click "Start collection"
2. Collection ID: `menuItems`
3. Document ID: Leave as auto-generated
4. Add the following fields for your first menu item:

```
name: "Classic Matcha"
description: ""
price: 6.00
category: "matcha"
popular: true
image: "/images/matcha.png"
createdAt: [timestamp]
updatedAt: [timestamp]
```

## Step 6: Migrate Existing Data (Optional)

If you want to migrate your existing menu data:

1. Make sure your `.env` file is set up with Firebase credentials
2. Run the migration script:

```bash
npm run migrate-to-firebase
```

This will automatically add all your existing menu items to Firebase.

## Step 7: Test the Integration

1. Start your development server: `npm start`
2. Navigate to the Menu page
3. You should see your menu items loading from Firebase
4. Check the browser console for any errors

## Step 8: Secure Your Database (Production)

Before deploying to production:

1. In Firebase Console, go to "Firestore Database" → "Rules"
2. Update the security rules to restrict access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /menuItems/{document} {
      allow read: if true;  // Anyone can read menu items
      allow write: if false; // No one can write (admin only)
    }
  }
}
```

## File Structure

The Firebase integration adds these new files:

- `src/config/firebase.ts` - Firebase configuration and initialization
- `src/services/firebaseMenuService.ts` - Service layer for menu operations
- `src/hooks/useMenuData.ts` - React hook for managing menu data
- `scripts/migrate-to-firebase.js` - Migration script for existing data

## Available Functions

The Firebase service provides these functions:

- `getAllMenuItems()` - Get all menu items
- `getMenuItemsByCategory(category)` - Get items by category
- `getPopularMenuItems()` - Get popular items
- `getMenuItemById(id)` - Get a specific item
- `addMenuItem(item)` - Add a new item
- `updateMenuItem(id, updates)` - Update an item
- `deleteMenuItem(id)` - Delete an item

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/unauthorized)"**
   - Check your Firebase configuration in `.env`
   - Verify your Firebase project ID is correct

2. **"Firestore: Missing or insufficient permissions"**
   - Check your Firestore security rules
   - Ensure you're in test mode for development

3. **"Module not found: 'firebase'"**
   - Run `npm install firebase` to install dependencies

4. **Environment variables not loading**
   - Restart your development server after adding `.env`
   - Make sure variable names start with `REACT_APP_`

### Debug Mode

To enable Firebase debug mode, add this to your browser console:

```javascript
localStorage.setItem('debug', 'firebase:*');
```

## Next Steps

After setting up Firebase:

1. **Real-time Updates**: Implement real-time listeners for live menu updates
2. **Admin Panel**: Create an admin interface to manage menu items
3. **Image Storage**: Use Firebase Storage for menu item images
4. **User Authentication**: Add user management for admin access
5. **Analytics**: Track menu item popularity and user behavior

## Support

If you encounter issues:

1. Check the [Firebase Documentation](https://firebase.google.com/docs)
2. Review the [React Firebase Hooks documentation](https://github.com/CSFrequency/react-firebase-hooks)
3. Check the browser console for error messages
4. Verify your Firebase project settings

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables for all sensitive configuration
- Regularly review and update your Firestore security rules
- Consider implementing rate limiting for production use
