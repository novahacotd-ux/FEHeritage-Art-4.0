import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import * as storeService from '../services/storeService';

const ProductContext = createContext();

export function ProductProvider({ children }) {
    // Products state
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 12,
        totalPages: 0,
    });

    // Filter data
    const [categories, setCategories] = useState([]);
    const [topics, setTopics] = useState([]);
    const [styles, setStyles] = useState([]);
    const [filtersLoading, setFiltersLoading] = useState(false);

    // Fetch products with filters
    const fetchProducts = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await storeService.getProducts({
                page: params.page || 1,
                limit: params.limit || 12,
                ...params,
            });

            if (response.success) {
                setProducts(response.data.products || []);
                setPagination(response.data.pagination || {
                    total: 0,
                    page: 1,
                    limit: 12,
                    totalPages: 0,
                });
            } else {
                throw new Error(response.message || 'Failed to fetch products');
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.message || 'Lỗi tải danh sách sản phẩm');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch a single product by ID
    const fetchProductById = useCallback(async (id) => {
        try {
            const response = await storeService.getProductById(id);
            if (response.success) {
                return response.data.product;
            }
            return null;
        } catch (err) {
            console.error('Error fetching product:', err);
            return null;
        }
    }, []);

    // Fetch filter options (categories, topics, styles) - handle each separately
    const fetchFilters = useCallback(async () => {
        setFiltersLoading(true);

        // Fetch categories
        try {
            const catRes = await storeService.getCategories({ limit: 100, status: 'Active' });
            if (catRes.success) {
                setCategories(catRes.data.categories || []);
            }
        } catch (err) {
            console.warn('Error fetching categories:', err);
            setCategories([]);
        }

        // Fetch topics - handle error separately
        try {
            const topicRes = await storeService.getTopics({ limit: 100, status: 'Active' });
            if (topicRes.success) {
                setTopics(topicRes.data.topics || []);
            }
        } catch (err) {
            console.warn('Error fetching topics:', err);
            setTopics([]);
        }

        // Fetch styles - handle error separately
        try {
            const styleRes = await storeService.getStyles({ limit: 100, status: 'Active' });
            if (styleRes.success) {
                setStyles(styleRes.data.styles || []);
            }
        } catch (err) {
            console.warn('Error fetching styles:', err);
            setStyles([]);
        }

        setFiltersLoading(false);
    }, []);

    // Load filters on mount
    useEffect(() => {
        fetchFilters();
    }, [fetchFilters]);

    // Load products on mount
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const value = {
        // Products
        products,
        loading,
        error,
        pagination,
        fetchProducts,
        fetchProductById,
        // Filters
        categories,
        topics,
        styles,
        filtersLoading,
        fetchFilters,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

export default ProductContext;
