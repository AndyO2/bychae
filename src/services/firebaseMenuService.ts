import {
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { MenuItem, Category } from '../data/menuData';

const COLLECTION_NAME = 'menuItems';

export interface FirebaseMenuItem extends Omit<MenuItem, 'id'> {
    id?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Convert Firebase document to MenuItem
const docToMenuItem = (doc: any): MenuItem => {
    const data = doc.data();
    return {
        id: parseInt(doc.id) || doc.id,
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        popular: data.popular || false,
        options: data.options,
        image: data.image
    };
};

// Convert MenuItem to Firebase document
const menuItemToDoc = (item: MenuItem): Omit<FirebaseMenuItem, 'id' | 'createdAt' | 'updatedAt'> => {
    return {
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        popular: item.popular || false,
        options: item.options,
        image: item.image
    };
};

// Get all menu items
export const getAllMenuItems = async (): Promise<MenuItem[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        return querySnapshot.docs.map(docToMenuItem);
    } catch (error) {
        console.error('Error getting menu items:', error);
        throw error;
    }
};

// Get menu items by category
export const getMenuItemsByCategory = async (category: Category): Promise<MenuItem[]> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('category', '==', category),
            orderBy('name')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(docToMenuItem);
    } catch (error) {
        console.error('Error getting menu items by category:', error);
        throw error;
    }
};

// Get popular menu items
export const getPopularMenuItems = async (): Promise<MenuItem[]> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('popular', '==', true),
            orderBy('name')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(docToMenuItem);
    } catch (error) {
        console.error('Error getting popular menu items:', error);
        throw error;
    }
};

// Get a single menu item by ID
export const getMenuItemById = async (id: string): Promise<MenuItem | null> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docToMenuItem(docSnap);
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error getting menu item:', error);
        throw error;
    }
};

// Add a new menu item
export const addMenuItem = async (item: Omit<MenuItem, 'id'>): Promise<string> => {
    try {
        const docData = {
            ...menuItemToDoc(item as MenuItem),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
        return docRef.id;
    } catch (error) {
        console.error('Error adding menu item:', error);
        throw error;
    }
};

// Update a menu item
export const updateMenuItem = async (id: string, updates: Partial<MenuItem>): Promise<void> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const updateData = {
            ...updates,
            updatedAt: new Date()
        };

        await updateDoc(docRef, updateData);
    } catch (error) {
        console.error('Error updating menu item:', error);
        throw error;
    }
};

// Delete a menu item
export const deleteMenuItem = async (id: string): Promise<void> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting menu item:', error);
        throw error;
    }
};
