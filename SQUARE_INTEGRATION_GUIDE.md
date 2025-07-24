# Square Order API Integration Guide

This guide explains how to integrate Square's Order API into your food cart website.

## Overview

The integration includes:
- **Order Creation**: Create orders in Square with line items, taxes, and service charges
- **Payment Processing**: Process payments through Square's payment system
- **Order Management**: Track order status and manage order lifecycle
- **Customer Information**: Collect and store customer details for pickup

## Setup Instructions

### 1. Square Developer Account Setup

1. **Create a Square Developer Account**
   - Go to [Square Developer Dashboard](https://developer.squareup.com/)
   - Sign up for a developer account
   - Create a new application

2. **Get Your Credentials**
   - **Application ID**: Found in your application dashboard
   - **Location ID**: Found in your Square Dashboard under Locations
   - **Access Token**: Generate in your application dashboard (use sandbox for testing)

3. **Configure Environment Variables**
   - Copy `env.example` to `.env.local`
   - Fill in your Square credentials:
   ```bash
   REACT_APP_SQUARE_APPLICATION_ID=your_app_id
   REACT_APP_SQUARE_LOCATION_ID=your_location_id
   REACT_APP_SQUARE_ACCESS_TOKEN=your_access_token
   REACT_APP_SQUARE_ENVIRONMENT=sandbox
   ```

### 2. Install Dependencies

The Square SDK is already installed:
```bash
npm install square
```

### 3. Configuration

The integration uses the following configuration files:

- **`src/config/squareConfig.ts`**: Square API configuration
- **`src/config/foodCartConfig.ts`**: Food cart business settings

## Architecture

### Core Components

1. **SquareApiService** (`src/services/squareApi.ts`)
   - Handles all Square API interactions
   - Creates orders, processes payments
   - Manages order lifecycle

2. **OrderContext** (`src/context/OrderContext.tsx`)
   - React context for order state management
   - Provides order creation and payment methods
   - Handles loading states and errors

3. **Checkout Page** (`src/pages/Checkout.tsx`)
   - Collects customer information
   - Creates orders via Square API
   - Handles tip calculations and tax

### Order Flow

1. **Customer adds items to cart**
2. **Customer proceeds to checkout**
3. **Customer fills out pickup information**
4. **Order is created in Square** (via `createOrder`)
5. **Customer is redirected to confirmation page**
6. **Payment can be processed** (via `processPayment`)

## API Methods

### Creating Orders

```typescript
const orderResponse = await createOrder(
  cartItems,           // Array of CartItem
  customerInfo,        // { name, email, phone }
  pickupTime,          // ISO string (optional)
  specialInstructions, // string (optional)
  tipAmount           // number (optional)
);
```

### Processing Payments

```typescript
const paymentResponse = await processPayment(
  orderId,           // string
  paymentMethod,     // 'CARD' | 'CASH' | 'DIGITAL_WALLET'
  cardToken,         // string (for card payments)
  tipAmount         // number (optional)
);
```

## Features

### Order Management
- ✅ Create orders with line items
- ✅ Calculate taxes and service charges
- ✅ Handle tips
- ✅ Set pickup times
- ✅ Add special instructions

### Payment Processing
- ✅ Process card payments
- ✅ Handle cash payments
- ✅ Support digital wallets
- ✅ Process tips separately

### Customer Experience
- ✅ Real-time order confirmation
- ✅ Order number generation
- ✅ Estimated pickup times
- ✅ Contact information display

## Configuration Options

### Tax and Service Charges

Configure in `src/config/squareConfig.ts`:

```typescript
order: {
  taxRate: 0.085,           // 8.5% tax
  serviceChargeRate: 0.05,  // 5% service charge
  tipOptions: [0, 0.15, 0.18, 0.20], // Tip percentages
}
```

### Business Information

Update in `src/config/foodCartConfig.ts`:

```typescript
{
  name: "Your Food Cart Name",
  phone: "(555) 123-4567",
  email: "info@yourfoodcart.com",
  address: "123 Main St, City, State 12345",
}
```

## Testing

### Sandbox Environment

1. Use sandbox credentials for testing
2. Test with Square's test card numbers:
   - **Success**: `4111 1111 1111 1111`
   - **Decline**: `4000 0000 0000 0002`

### Test Order Flow

1. Add items to cart
2. Proceed to checkout
3. Fill out customer information
4. Select pickup time and tip
5. Submit order
6. Verify order appears in Square Dashboard

## Production Deployment

### Environment Variables

For production, update your environment variables:

```bash
REACT_APP_SQUARE_ENVIRONMENT=production
REACT_APP_SQUARE_ACCESS_TOKEN=your_production_access_token
```

### Security Considerations

- ✅ Never commit access tokens to version control
- ✅ Use environment variables for sensitive data
- ✅ Implement proper error handling
- ✅ Validate all user inputs

## Troubleshooting

### Common Issues

1. **"Square configuration is incomplete"**
   - Check that all environment variables are set
   - Verify credentials in Square Developer Dashboard

2. **"Failed to create order"**
   - Check Square API logs
   - Verify location ID is correct
   - Ensure access token has proper permissions

3. **Payment processing errors**
   - Verify card token is valid
   - Check Square payment logs
   - Ensure order exists before processing payment

### Debug Mode

Enable debug logging by adding to your environment:

```bash
REACT_APP_DEBUG=true
```

## Support

- **Square Developer Documentation**: [https://developer.squareup.com/docs](https://developer.squareup.com/docs)
- **Square Support**: [https://squareup.com/help](https://squareup.com/help)
- **API Reference**: [https://developer.squareup.com/reference](https://developer.squareup.com/reference)

## Next Steps

### Advanced Features

Consider implementing:
- **Order Status Tracking**: Real-time order updates
- **Inventory Management**: Track item availability
- **Customer Accounts**: Save customer preferences
- **Loyalty Program**: Points and rewards system
- **Analytics**: Order and sales reporting

### Payment Enhancements

- **Apple Pay/Google Pay**: Digital wallet integration
- **Gift Cards**: Square gift card support
- **Split Payments**: Multiple payment methods
- **Refunds**: Handle order cancellations 