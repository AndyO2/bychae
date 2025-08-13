# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm start` - Start development server (http://localhost:3000)
- `npm run build` - Build production bundle
- `npm run eject` - Eject from Create React App (irreversible)

### Configuration Management
- `npm run switch-config` - Switch between food cart configurations
- `npm run migrate-to-firebase` - Migrate static menu data to Firebase
- `npm run populate-tenant-menu` - Populate tenant menu data

### Testing & Quality
- No test framework is currently configured
- No linting commands are available
- TypeScript compilation is handled by react-scripts

## Architecture Overview

### Multi-Tenant Food Cart System
This is a React/TypeScript application designed to support multiple food cart configurations from a single codebase. The system supports both static configuration and Firebase-based dynamic data loading.

### Core Architecture Patterns

**Context-Based State Management:**
- `TenantContext` - Manages current food cart tenant data from Firebase
- `CartContext` - Shopping cart state with reducer pattern
- `OrderContext` - Order management and Square API integration

**Configuration System:**
- `src/config/foodCartConfig.ts` - Multi-cart configuration definitions
- `currentConfig` export determines active configuration
- Scripts in `/scripts` folder handle configuration switching

**Data Layer:**
- Static data: `src/data/menuData.ts`
- Firebase integration: `src/services/firebaseMenuService.ts`
- Square API: `src/services/squareApi.ts`

### Key Components Structure

**Pages:** Home, Menu, Hours, Catering, About, Checkout, OrderConfirmation
**Components:** Header, Footer, CartSidebar, MenuItemCard, ImageCarousel
**Services:** Firebase menu service, Square API integration
**Hooks:** `useMenuData`, `useScrollToTop`

### Environment Configuration

Required environment variables in `.env.local`:
- Firebase: `REACT_APP_FIREBASE_*` keys
- Square API: `REACT_APP_SQUARE_*` keys  
- Google Maps: `REACT_APP_GOOGLE_MAPS_API_KEY`

### Firebase Integration

**Collections:**
- `tenants` - Food cart business data
- `menuItems` - Menu items with categories and pricing

**Tenant Context loads specific tenant:** `cVWbSMdGNtciwCpGQZNYUP7mB0K3`

### Multi-Configuration Support

The system supports multiple deployment strategies:
1. **Single tenant mode** - Hardcoded tenant ID in TenantContext
2. **Configuration switching** - Using npm scripts to change configs
3. **Environment-based** - Dynamic tenant selection via env vars

### Square API Integration

**Order Flow:**
1. Cart items collected via CartContext
2. Customer info gathered on Checkout page
3. Orders created via Square API with tax/tips
4. Payment processing through Square Web Payments SDK

### Asset Management

Images stored in `public/images/` with category-based organization. Menu item images referenced via relative paths in configuration.

### Routing

React Router v7 with standard SPA routing. All routes defined in App.tsx with nested provider structure.

## Important Implementation Notes

- The application uses React 19 with the new react-router v7
- Firebase integration is optional - falls back to static data
- Square integration requires proper environment setup
- Tenant context currently hardcoded to specific tenant ID
- No authentication system - relies on Firebase security rules
- Images are static assets, not Firebase Storage integration