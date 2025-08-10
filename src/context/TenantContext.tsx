import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

interface Tenant {
    id: string;
    name?: string;
    about?: string;
    menuItems?: any[];
    menu_categories?: any[];
    businessHours?: any;
    instagram?: string;
    tiktok?: string;
    logo?: string;
    domain?: string;
    email?: string;
    [key: string]: any;
}

interface TenantContextType {
    currentTenant: Tenant | null;
    loading: boolean;
    error: string | null;
    setCurrentTenant: (tenant: Tenant) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const useTenant = () => {
    const context = useContext(TenantContext);
    if (context === undefined) {
        throw new Error('useTenant must be used within a TenantProvider');
    }
    return context;
};

interface TenantProviderProps {
    children: ReactNode;
}

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
    const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load specific tenant by ID
    useEffect(() => {
        const loadTenant = async () => {
            try {
                setLoading(true);
                setError(null);

                // Query for the specific tenant ID
                const tenantDoc = await getDoc(doc(db, 'tenants', 'cVWbSMdGNtciwCpGQZNYUP7mB0K3'));

                if (tenantDoc.exists()) {
                    const tenantData = {
                        id: tenantDoc.id,
                        ...tenantDoc.data()
                    } as Tenant;

                    setCurrentTenant(tenantData);
                    console.log('Loaded specific tenant:', tenantData);
                } else {
                    setError('Tenant not found');
                    console.error('Tenant document does not exist');
                }

            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                setError(errorMessage);
                console.error('Error loading tenant:', err);
            } finally {
                setLoading(false);
            }
        };

        loadTenant();
    }, []);

    const value: TenantContextType = {
        currentTenant,
        loading,
        error,
        setCurrentTenant
    };

    return (
        <TenantContext.Provider value={value}>
            {children}
        </TenantContext.Provider>
    );
};
