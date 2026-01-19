// src/components/PaymentMethods.jsx
import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import momoQR from "../assets/momo.jpg";

export default function PaymentMethods({ total = 0, onPay, defaultMethod = "momo" }) {
  const navigate = useNavigate();
  const [method, setMethod] = useState(defaultMethod);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const [card, setCard] = useState({ name: "", number: "", exp: "", cvv: "" });
  const [bankInfo] = useState({
    accountName: "NGUYEN HOANG ANH",
    accountNumber: "9632234567",
    bankName: "VIETCOMBANK",
  });

  const validateCard = () => card.name && card.number.length >= 12 && card.exp && card.cvv.length >= 3;

  const handlePay = () => {
    if (method === "card" && !validateCard()) {
      alert("Vui lòng nhập đầy đủ thông tin thẻ (demo).");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      const details = { amount: total, method, card, bankInfo, status: "success" };
      onPay && onPay(method, details);

      // Đếm ngược chuyển hướng
      let time = 3;
      const timer = setInterval(() => {
        time--;
        setCountdown(time);
        if (time === 0) {
          clearInterval(timer);
          navigate("/thank-you");
        }
      }, 1000);
    }, 1500);
  };

  // ✅ Hiệu ứng sau thanh toán
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-3 text-center animate-fade-in">
        <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
        <div className="text-2xl font-semibold text-green-600">Thanh toán thành công!</div>
        <div className="text-gray-600">Cảm ơn bạn đã mua hàng 💖</div>
        <div className="text-sm text-gray-500">Tự động chuyển sau {countdown}s...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid md:grid-cols-3 gap-3">
        {/* 🟣 Ví MoMo */}
        <label
          className={`p-3 rounded-lg border transition transform hover:scale-105 cursor-pointer ${
            method === "momo" ? "border-pink-500 bg-pink-50 shadow-md" : "border-gray-200"
          }`}
        >
          <input
            type="radio"
            name="pay"
            value="momo"
            checked={method === "momo"}
            onChange={() => setMethod("momo")}
            className="hidden"
          />
          <div className="font-semibold">🟣 Ví MoMo</div>
          <div className="text-sm text-gray-600 mt-2">Quét mã QR để thanh toán</div>
          <div className="mt-3 flex justify-center">
            <img
              src={momoQR}
              alt="QR MoMo"
              className="w-36 h-36 border rounded shadow-sm"
            />
          </div>
        </label>

        {/* 🏦 Chuyển khoản ngân hàng - luôn hiển thị */}
        <div
          className={`p-3 rounded-lg border border-amber-400 bg-amber-50 shadow-md transition transform hover:scale-105`}
        >
          <div className="font-semibold mb-2">🏦 Chuyển khoản ngân hàng</div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Tên chủ tài khoản:</span>
              <span className="text-gray-900">{bankInfo.accountName}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Số tài khoản:</span>
              <span
                className="text-gray-900 cursor-pointer hover:text-blue-600"
                onClick={() => navigator.clipboard.writeText(bankInfo.accountNumber)}
                title="Sao chép số tài khoản"
              >
                {bankInfo.accountNumber} 📋
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Ngân hàng:</span>
              <span className="text-gray-900">{bankInfo.bankName}</span>
            </div>
          </div>

          <div className="mt-3 flex justify-center">
            <img
              src={momoQR} // 👉 thêm ảnh QR của bạn tại public/images/
              alt="QR ngân hàng"
              className="w-40 h-40 border rounded-lg shadow-sm"
            />
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Quét mã VietQR để chuyển khoản nhanh chóng
          </p>
        </div>

        {/* 💳 Thẻ quốc tế */}
        <label
          className={`p-3 rounded-lg border transition transform hover:scale-105 cursor-pointer ${
            method === "card" ? "border-blue-400 bg-blue-50 shadow-md" : "border-gray-200"
          }`}
        >
          <input
            type="radio"
            name="pay"
            value="card"
            checked={method === "card"}
            onChange={() => setMethod("card")}
            className="hidden"
          />
          <div className="font-semibold">💳 Thẻ quốc tế / nội địa</div>
          <div className="text-sm text-gray-600 mt-2">Nhập thông tin thẻ (demo)</div>

          {method === "card" && (
            <div className="mt-3 space-y-2">
              <input
                placeholder="Tên trên thẻ"
                value={card.name}
                onChange={(e) => setCard({ ...card, name: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                placeholder="Số thẻ"
                value={card.number}
                onChange={(e) => setCard({ ...card, number: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex gap-2">
                <input
                  placeholder="MM/YY"
                  value={card.exp}
                  onChange={(e) => setCard({ ...card, exp: e.target.value })}
                  className="w-1/2 border px-3 py-2 rounded"
                />
                <input
                  placeholder="CVV"
                  value={card.cvv}
                  onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                  className="w-1/2 border px-3 py-2 rounded"
                />
              </div>
            </div>
          )}
        </label>
      </div>

      {/* Tổng + nút thanh toán */}
      <div className="flex items-center justify-between mt-6">
        <div>
          <div className="text-sm text-gray-600">Tổng thanh toán</div>
          <div className="text-xl font-bold text-orange-600">
            {total.toLocaleString()}₫
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-md hover:shadow-lg disabled:opacity-60"
        >
          {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
        </button>
      </div>
    </div>
  );
}
