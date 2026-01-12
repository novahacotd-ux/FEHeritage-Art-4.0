// src/components/AddressManager.jsx
import React, { useState, useEffect } from 'react';
import * as addressService from '../services/addressService';
import toast from 'react-hot-toast';

export default function AddressManager() {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState(null);
    const [formData, setFormData] = useState({
        street: '',
        ward: '',
        district: '',
        city: '',
        phone: '',
        is_default: false,
    });

    // Fetch addresses
    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const response = await addressService.getAddresses();
            if (response.success) {
                setAddresses(response.data.addresses || []);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            // Use empty array on error
            setAddresses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    // Handle form change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Open modal for new address
    const handleAddNew = () => {
        setEditingAddress(null);
        setFormData({
            street: '',
            ward: '',
            district: '',
            city: '',
            phone: '',
            is_default: addresses.length === 0, // First address is default
        });
        setShowModal(true);
    };

    // Open modal for editing
    const handleEdit = (address) => {
        setEditingAddress(address);
        // Parse address string back to parts (best effort)
        // Assuming format: "street, ward, district, city"
        const parts = (address.address || '').split(', ');
        setFormData({
            street: parts[0] || '',
            ward: parts[1] || '',
            district: parts[2] || '',
            city: parts[3] || parts[parts.length - 1] || '',
            phone: address.phone || '',
            is_default: address.is_default || false,
        });
        setShowModal(true);
    };

    // Save address
    const handleSave = async () => {
        if (!formData.street.trim() || !formData.city.trim()) {
            toast.error('Vui lòng nhập địa chỉ và thành phố');
            return;
        }

        // Validate phone (backend requires 10-20 chars)
        if (!formData.phone.trim() || formData.phone.trim().length < 10) {
            toast.error('Vui lòng nhập số điện thoại (ít nhất 10 số)');
            return;
        }

        // Combine fields into single address string
        const addressParts = [
            formData.street.trim(),
            formData.ward.trim(),
            formData.district.trim(),
            formData.city.trim()
        ].filter(Boolean);

        const apiData = {
            address: addressParts.join(', '),
            is_default: formData.is_default || false,
        };

        // Only include phone if provided
        if (formData.phone.trim()) {
            apiData.phone = formData.phone.trim();
        }

        console.log('📍 [AddressManager] Saving address:', apiData);

        try {
            if (editingAddress) {
                await addressService.updateAddress(editingAddress.address_id, apiData);
                toast.success('Cập nhật địa chỉ thành công!');
            } else {
                await addressService.createAddress(apiData);
                toast.success('Thêm địa chỉ thành công!');
            }
            setShowModal(false);
            fetchAddresses();
        } catch (error) {
            console.error('Error saving address:', error);
            // Show detailed error from backend
            const errorMsg = error.errors
                ? error.errors.map(e => e.msg || e.message || e).join(', ')
                : error.message || 'Có lỗi xảy ra';
            toast.error(errorMsg);
        }
    };

    // Request delete (open modal)
    const confirmDeleteRequest = (id) => {
        setAddressToDelete(id);
        setShowDeleteModal(true);
    };

    // Execute delete
    const executeDelete = async () => {
        if (!addressToDelete) return;

        try {
            await addressService.deleteAddress(addressToDelete);
            toast.success('Đã xóa địa chỉ');
            fetchAddresses();
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting address:', error);
            toast.error(error.message || 'Không thể xóa địa chỉ');
        } finally {
            setAddressToDelete(null);
        }
    };

    // Set as default
    const handleSetDefault = async (id) => {
        try {
            await addressService.setDefaultAddress(id);
            toast.success('Đã đặt làm địa chỉ mặc định');
            fetchAddresses();
        } catch (error) {
            console.error('Error setting default:', error);
            toast.error(error.message || 'Có lỗi xảy ra');
        }
    };

    // Format full address
    const formatAddress = (addr) => {
        // Backend returns single address string
        return addr.address || '';
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-2 text-gray-600">Đang tải địa chỉ...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">📍 Địa chỉ của tôi</h2>
                <button
                    onClick={handleAddNew}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition shadow"
                >
                    + Thêm địa chỉ mới
                </button>
            </div>

            {/* Address List */}
            {/* Address List */}
            {addresses.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <div className="text-5xl mb-4">🏠</div>
                    <p className="text-gray-600 mb-2">Chưa có địa chỉ nào</p>
                    <p className="text-gray-500 text-sm">Thêm địa chỉ để dễ dàng thanh toán</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {addresses.map((address) => (
                        <div
                            key={address.address_id}
                            className={`p-4 rounded-xl border-2 transition ${address.is_default
                                ? 'border-orange-400 bg-orange-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    {address.is_default && (
                                        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-orange-500 text-white rounded mb-2">
                                            Mặc định
                                        </span>
                                    )}
                                    <p className="font-medium text-gray-800">{formatAddress(address)}</p>
                                    {address.phone && (
                                        <p className="text-sm text-gray-600 mt-1">📞 {address.phone}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    {!address.is_default && (
                                        <button
                                            onClick={() => handleSetDefault(address.address_id)}
                                            className="text-sm text-orange-600 hover:underline"
                                        >
                                            Đặt mặc định
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleEdit(address)}
                                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                        title="Sửa"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => confirmDeleteRequest(address.address_id)}
                                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                        title="Xóa"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🗑️</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Xóa địa chỉ?</h3>
                            <p className="text-gray-600 mb-6">
                                Bạn có chắc chắn muốn xóa địa chỉ này không? Hành động này không thể hoàn tác.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    onClick={executeDelete}
                                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition shadow-lg shadow-red-500/30"
                                >
                                    Xóa ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
                        <div className="p-5 border-b">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {editingAddress ? 'Sửa địa chỉ' : 'Thêm địa chỉ mới'}
                            </h3>
                        </div>

                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Địa chỉ (số nhà, đường) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 outline-none"
                                    placeholder="VD: 123 Nguyễn Văn A"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phường/Xã
                                    </label>
                                    <input
                                        type="text"
                                        name="ward"
                                        value={formData.ward}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 outline-none"
                                        placeholder="Phường 1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Quận/Huyện
                                    </label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 outline-none"
                                        placeholder="Quận 1"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Thành phố <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 outline-none"
                                    placeholder="TP. Hồ Chí Minh"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 outline-none"
                                    placeholder="0901234567"
                                />
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="is_default"
                                    checked={formData.is_default}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                                />
                                <span className="text-sm text-gray-700">Đặt làm địa chỉ mặc định</span>
                            </label>
                        </div>

                        <div className="p-5 border-t flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition"
                            >
                                {editingAddress ? 'Cập nhật' : 'Thêm mới'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
