import { useState, useEffect, useCallback } from 'react';
import { MenuItem, Category } from '../data/menuData';
import {
    getAllMenuItems,
    getMenuItemsByCategory,
    getPopularMenuItems,
    getMenuItemById
} from '../services/firebaseMenuService';

interface UseMenuDataReturn {
    menuItems: MenuItem[];
    popularItems: MenuItem[];
    loading: boolean;
    error: string | null;
    refreshMenu: () => Promise<void>;
    getItemsByCategory: (category: Category) => Promise<MenuItem[]>;
    getItemById: (id: string) => Promise<MenuItem | null>;
}

export const useMenuData = (): UseMenuDataReturn => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [popularItems, setPopularItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAllMenuItems = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const items = await getAllMenuItems();
            setMenuItems(items);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch menu items');
            console.error('Error fetching menu items:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchPopularItems = useCallback(async () => {
        try {
            const items = await getPopularMenuItems();
            setPopularItems(items);
        } catch (err) {
            console.error('Error fetching popular items:', err);
            // Don't set error for popular items as it's not critical
        }
    }, []);

    const refreshMenu = useCallback(async () => {
        await Promise.all([fetchAllMenuItems(), fetchPopularItems()]);
    }, [fetchAllMenuItems, fetchPopularItems]);

    const getItemsByCategory = useCallback(async (category: Category): Promise<MenuItem[]> => {
        try {
            return await getMenuItemsByCategory(category);
        } catch (err) {
            console.error('Error fetching items by category:', err);
            throw err;
        }
    }, []);

    const getItemById = useCallback(async (id: string): Promise<MenuItem | null> => {
        try {
            return await getMenuItemById(id);
        } catch (err) {
            console.error('Error fetching item by ID:', err);
            throw err;
        }
    }, []);

    useEffect(() => {
        refreshMenu();
    }, [refreshMenu]);

    return {
        menuItems,
        popularItems,
        loading,
        error,
        refreshMenu,
        getItemsByCategory,
        getItemById
    };
};
