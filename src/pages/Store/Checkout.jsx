import React, { useState, useMemo, useContext, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import PaymentMethods from "../../components/PaymentMethods";
import AddressSelector from "../../components/AddressSelector";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import * as orderService from "../../services/orderService";
import toast, { Toaster } from "react-hot-toast";

export default function Checkout() {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const {
		getCheckoutItems,
		getCheckoutTotal,
		clearCart,
		clearBuyNow,
		buyNowItem,
		isAuthenticated
	} = useCart();

	// Get items for this checkout (either buy now item or selected cart items)
	const checkoutItems = useMemo(() => getCheckoutItems(), [getCheckoutItems, buyNowItem]);

	// Selected address for authenticated users
	const [selectedAddress, setSelectedAddress] = useState(null);

	const [customer, setCustomer] = useState({
		name: user?.name || "",
		email: user?.email || "",
		phone: user?.phone || "",
		address: "",
		note: "",
	});
	const [loading, setLoading] = useState(false);

	// Update customer info when address is selected
	const handleAddressSelect = (address) => {
		setSelectedAddress(address);
		if (address) {
			setCustomer(prev => ({
				...prev,
				address: address.address || '',
				phone: address.phone || prev.phone,
			}));
		}
	};

	// Calculate totals from checkout items
	const subtotal = useMemo(() => getCheckoutTotal(), [getCheckoutTotal, buyNowItem]);
	const shipping = 0;
	const total = subtotal + shipping;

	// Check if we have items to checkout
	const hasItems = checkoutItems.length > 0;

	// Redirect if no items
	useEffect(() => {
		if (!hasItems) {
			// Small delay to allow state to settle
			const timer = setTimeout(() => {
				if (getCheckoutItems().length === 0) {
					navigate('/cart');
				}
			}, 100);
			return () => clearTimeout(timer);
		}
	}, [hasItems, navigate, getCheckoutItems]);

	const isValid = () =>
		customer.name.trim() && customer.phone.trim() && customer.address.trim();

	// Create order via API
	const handleCreateOrder = async (paymentMethod, paymentDetails) => {
		if (!isValid()) {
			toast.error("Vui lòng điền đầy đủ thông tin nhận hàng.");
			return;
		}

		setLoading(true);
		try {
			const orderData = {
				id: `ORD-${Date.now()}`,
				createdAt: new Date().toISOString(),
				items: checkoutItems, // Use checkout items, not cart
				amounts: { subtotal, shipping, total },
				customer,
				payment: {
					amount: paymentDetails.amount,
					method: paymentDetails.method,
					status: paymentDetails.status,
				},
				source: buyNowItem ? "buy-now" : "cart-checkout",
			};

			if (isAuthenticated) {
				try {
					const response = await orderService.createOrder(1, customer.note);

					if (response.success) {
						await orderService.createPayment(
							response.data.order.order_id,
							paymentDetails.method,
							total
						);

						localStorage.setItem("lastOrder", JSON.stringify(response.data.order));
					}
				} catch (apiError) {
					console.error("API order creation failed, storing locally:", apiError);
					localStorage.setItem("lastOrder", JSON.stringify(orderData));
				}

				// Only clear cart if not buy now
				if (!buyNowItem) {
					await clearCart();
				}
				clearBuyNow(); // Always clear buy now item
				toast.success("Đặt hàng thành công!");

			} else {
				// Guest checkout - store locally
				localStorage.setItem("lastOrder", JSON.stringify(orderData));

				// Only clear cart if not buy now
				if (!buyNowItem) {
					await clearCart();
				}
				clearBuyNow();
				toast.success("Đặt hàng thành công!");
			}
		} catch (error) {
			console.error("Error creating order:", error);
			toast.error(error.message || "Có lỗi xảy ra khi đặt hàng");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<Toaster position="top-right" />
			<div className="mx-auto max-w-6xl px-4 py-8">
				<h1 className="mb-6 text-2xl font-bold text-gray-800">
					{buyNowItem ? "Thanh toán - Mua ngay" : "Thanh toán"}
				</h1>

				{!hasItems ? (
					<div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
						<p className="mb-4 text-gray-600">
							Không có sản phẩm nào để thanh toán.
						</p>
						<Link
							to="/mua-tranh-in"
							className="inline-block rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 font-medium text-white shadow hover:from-orange-600 hover:to-amber-600"
						>
							Tiếp tục mua sắm
						</Link>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
						{/* Customer Info */}
						<div className="lg:col-span-2 space-y-6">
							<div className="rounded-xl border bg-white p-5 shadow-sm">
								<h2 className="mb-4 text-lg font-semibold text-gray-800">
									Thông tin người nhận
								</h2>

								{!isAuthenticated && (
									<div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
										<p className="text-sm text-orange-700">
											💡 <Link to="/login" className="font-medium underline">Đăng nhập</Link> để lưu thông tin đơn hàng và theo dõi trạng thái.
										</p>
									</div>
								)}

								{/* Address Selector for authenticated users */}
								{isAuthenticated && (
									<div className="mb-4">
										<label className="mb-2 block text-sm font-medium text-gray-700">
											📍 Chọn địa chỉ giao hàng
										</label>
										<AddressSelector
											selectedAddressId={selectedAddress?.address_id}
											onSelect={handleAddressSelect}
											onAddNew={() => navigate('/info')}
										/>
									</div>
								)}

								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div className="md:col-span-2">
										<label className="mb-1 block text-sm font-medium text-gray-700">
											Họ và tên <span className="text-red-500">*</span>
										</label>
										<input
											className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
											value={customer.name}
											onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
											placeholder="Nhập họ và tên"
										/>
									</div>
									<div>
										<label className="mb-1 block text-sm font-medium text-gray-700">
											Số điện thoại <span className="text-red-500">*</span>
										</label>
										<input
											className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
											value={customer.phone}
											onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
											placeholder="Nhập số điện thoại"
										/>
									</div>
									<div>
										<label className="mb-1 block text-sm font-medium text-gray-700">
											Email
										</label>
										<input
											className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
											value={customer.email}
											onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
											placeholder="Nhập email"
										/>
									</div>
									<div className="md:col-span-2">
										<label className="mb-1 block text-sm font-medium text-gray-700">
											Địa chỉ nhận hàng <span className="text-red-500">*</span>
										</label>
										<input
											className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
											value={customer.address}
											onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
											placeholder="Nhập địa chỉ"
										/>
									</div>
									<div className="md:col-span-2">
										<label className="mb-1 block text-sm font-medium text-gray-700">
											Ghi chú
										</label>
										<textarea
											className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
											rows={3}
											value={customer.note}
											onChange={(e) => setCustomer({ ...customer, note: e.target.value })}
											placeholder="Ghi chú cho đơn hàng (nếu có)"
										/>
									</div>
								</div>

								{!isValid() && (
									<p className="mt-3 text-sm text-red-600">
										Vui lòng nhập Họ tên, Số điện thoại và Địa chỉ trước khi thanh toán.
									</p>
								)}
							</div>

							{/* Payment Methods */}
							<div className="rounded-xl border bg-white p-5 shadow-sm">
								<h2 className="mb-4 text-lg font-semibold text-gray-800">
									Phương thức thanh toán
								</h2>
								<PaymentMethods
									total={total}
									onPay={(method, details) => {
										if (!isValid()) {
											toast.error("Vui lòng điền đầy đủ thông tin nhận hàng.");
											return;
										}
										handleCreateOrder(method, details);
									}}
									disabled={loading}
								/>
							</div>
						</div>

						{/* Order Summary */}
						<div className="h-max rounded-xl border bg-white p-5 shadow-sm">
							<h2 className="mb-3 text-lg font-semibold text-gray-800">
								{buyNowItem ? "Sản phẩm mua ngay" : "Đơn hàng của bạn"}
							</h2>
							<div className="space-y-3">
								{checkoutItems.map((item) => (
									<div
										key={`${item.id || item.product_id}-${item.selectedType}`}
										className="flex items-center gap-3"
									>
										<img
											src={item.image || "https://placehold.co/56x56?text=No+Image"}
											alt={item.title || item.name}
											className="h-14 w-14 rounded-lg object-cover"
										/>
										<div className="flex-1">
											<div className="text-sm font-medium text-gray-800 line-clamp-1">
												{item.title || item.name}
											</div>
											<div className="text-xs text-gray-500">
												× {item.quantity}
											</div>
										</div>
										<div className="text-sm font-semibold text-gray-700">
											{(item.price * item.quantity).toLocaleString()}₫
										</div>
									</div>
								))}
							</div>

							<div className="my-3 border-t" />
							<div className="space-y-1 text-sm">
								<div className="flex items-center justify-between">
									<span>Tạm tính</span>
									<span className="font-medium">{subtotal.toLocaleString()}₫</span>
								</div>
								<div className="flex items-center justify-between text-gray-500">
									<span>Vận chuyển</span>
									<span>{shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString()}₫`}</span>
								</div>
								<div className="my-2 border-t" />
								<div className="flex items-center justify-between text-base">
									<span className="font-semibold">Tổng cộng</span>
									<span className="font-bold text-orange-600">
										{total.toLocaleString()}₫
									</span>
								</div>
							</div>

							<Link
								to="/mua-tranh-in"
								className="mt-4 block text-center text-sm font-medium text-orange-600 hover:underline"
							>
								← Tiếp tục mua sắm
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
