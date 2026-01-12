// src/components/AddressSelector.jsx
import React, { useState, useEffect } from 'react';
import * as addressService from '../services/addressService';

export default function AddressSelector({ selectedAddressId, onSelect, onAddNew }) {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await addressService.getAddresses();
                if (response.success) {
                    const addrs = response.data.addresses || [];
                    setAddresses(addrs);

                    // Auto-select default if none selected
                    if (!selectedAddressId && addrs.length > 0) {
                        const defaultAddr = addrs.find(a => a.is_default) || addrs[0];
                        onSelect(defaultAddr);
                    }
                }
            } catch (error) {
                console.error('Error fetching addresses:', error);
                setAddresses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    // Format address
    const formatAddress = (addr) => {
        // Backend returns single address string
        return addr.address || '';
    };

    if (loading) {
        return (
            <div className="text-center py-4">
                <div className="inline-block w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2 text-gray-600">Đang tải địa chỉ...</span>
            </div>
        );
    }

    if (addresses.length === 0) {
        return (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <p className="text-gray-600 mb-2">Bạn chưa có địa chỉ nào</p>
                <button
                    onClick={onAddNew}
                    className="text-orange-600 font-medium hover:underline"
                >
                    + Thêm địa chỉ mới
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {addresses.map((address) => (
                <label
                    key={address.address_id}
                    className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition ${selectedAddressId === address.address_id
                        ? 'border-orange-400 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                >
                    <input
                        type="radio"
                        name="address"
                        checked={selectedAddressId === address.address_id}
                        onChange={() => onSelect(address)}
                        className="mt-1 w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            {address.is_default && (
                                <span className="text-xs font-medium bg-orange-500 text-white px-1.5 py-0.5 rounded">
                                    Mặc định
                                </span>
                            )}
                        </div>
                        <p className="font-medium text-gray-800">{formatAddress(address)}</p>
                        {address.phone && (
                            <p className="text-sm text-gray-500">📞 {address.phone}</p>
                        )}
                    </div>
                </label>
            ))}

            <button
                onClick={onAddNew}
                className="w-full py-2 text-center text-orange-600 font-medium hover:bg-orange-50 rounded-lg border border-orange-200 transition"
            >
                + Thêm địa chỉ khác
            </button>
        </div>
    );
}
