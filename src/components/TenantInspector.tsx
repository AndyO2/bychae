import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const TenantInspector: React.FC = () => {
    const [tenants, setTenants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'tenants'));
                const tenantData: any[] = [];
                querySnapshot.forEach((doc) => {
                    tenantData.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                setTenants(tenantData);
            } catch (error) {
                console.error('Error fetching tenants:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTenants();
    }, []);

    if (loading) {
        return <div>Loading tenant data...</div>;
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', margin: '20px 0' }}>
            <h3>🔍 Tenant Data Structure</h3>
            <p>Found {tenants.length} tenant(s) in your database:</p>

            {tenants.map((tenant, index) => (
                <div key={tenant.id} style={{
                    backgroundColor: 'white',
                    padding: '15px',
                    margin: '10px 0',
                    borderRadius: '6px',
                    border: '1px solid #dee2e6'
                }}>
                    <h4>Tenant: {tenant.name || tenant.id || `Tenant ${index + 1}`}</h4>
                    <p><strong>Document ID:</strong> {tenant.id}</p>

                    <h5>Available Fields:</h5>
                    <div style={{
                        backgroundColor: '#f1f3f4',
                        padding: '10px',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        fontSize: '14px'
                    }}>
                        {Object.entries(tenant).map(([key, value]) => (
                            <div key={key} style={{ margin: '5px 0' }}>
                                <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div style={{
                backgroundColor: '#e8f5e8',
                padding: '15px',
                borderRadius: '6px',
                marginTop: '20px'
            }}>
                <h4>📋 Next Steps:</h4>
                <p>Based on the fields above, we can create components to display:</p>
                <ul>
                    <li><strong>Tenant Name/Logo</strong> in headers or footers</li>
                    <li><strong>Contact Information</strong> on contact pages</li>
                    <li><strong>Business Hours</strong> on hours pages</li>
                    <li><strong>Location/Address</strong> on location pages</li>
                    <li><strong>Custom Styling</strong> based on tenant brand colors</li>
                </ul>
            </div>
        </div>
    );
};

export default TenantInspector;
