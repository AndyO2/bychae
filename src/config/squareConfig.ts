export interface SquareConfig {
  // Square API Configuration
  square: {
    applicationId: string;
    locationId: string;
    accessToken: string;
    environment: 'sandbox' | 'production';
  };
  
  // Order Configuration
  order: {
    currency: string;
    taxRate?: number;
    serviceChargeRate?: number;
    tipOptions?: number[];
  };
  
  // Payment Configuration
  payment: {
    enableCardPayments: boolean;
    enableCashPayments: boolean;
    enableDigitalWallets: boolean;
  };
}

// Default Square configuration
export const defaultSquareConfig: SquareConfig = {
  square: {
    applicationId: process.env.REACT_APP_SQUARE_APPLICATION_ID || '',
    locationId: process.env.REACT_APP_SQUARE_LOCATION_ID || '',
    accessToken: process.env.REACT_APP_SQUARE_ACCESS_TOKEN || '',
    environment: (process.env.REACT_APP_SQUARE_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
  },
  order: {
    currency: 'USD',
    taxRate: 0.085, // 8.5% tax rate (adjust for your location)
    serviceChargeRate: 0.05, // 5% service charge
    tipOptions: [0, 0.15, 0.18, 0.20], // 0%, 15%, 18%, 20%
  },
  payment: {
    enableCardPayments: true,
    enableCashPayments: true,
    enableDigitalWallets: true,
  },
};

// Export the current Square configuration
export const squareConfig: SquareConfig = defaultSquareConfig; 