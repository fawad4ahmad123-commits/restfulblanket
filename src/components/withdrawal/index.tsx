'use client';

import { useState } from 'react';
import { X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LineItem {
  id: number;
  productId: number;
  name: string;
  quantity: number;
  total: string;
  sku?: string;
}

interface Props {
  orderId: string;
  orderKey: string;
  orderNumber: string | number;
  orderDate: string;
  orderStatus: string;
  currency?: string;
  products: LineItem[];
  onClose?: () => void;
}

export default function WithdrawForm({
  orderId,
  orderKey,
  orderNumber,
  orderDate,
  orderStatus,
  currency = 'kr.',
  products,
  onClose,
}: Props) {
  const [selectedQty, setSelectedQty] = useState<Record<number, number>>(
    () =>
      Object.fromEntries(products.map((p) => [p.id, 0])) as Record<
        number,
        number
      >,
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const unitPrice = (item: LineItem) =>
    item.quantity > 0 ? parseFloat(item.total) / item.quantity : 0;

  const toggleItem = (item: LineItem) => {
    setSelectedQty((prev) => ({
      ...prev,
      [item.id]: prev[item.id] > 0 ? 0 : item.quantity,
    }));
  };

  const changeQty = (item: LineItem, qty: number) => {
    const clamped = Math.max(0, Math.min(item.quantity, qty));
    setSelectedQty((prev) => ({ ...prev, [item.id]: clamped }));
  };

  const selectedItems = products.filter((p) => (selectedQty[p.id] || 0) > 0);

  const allFullySelected =
    products.length > 0 &&
    products.every((p) => (selectedQty[p.id] || 0) === p.quantity);

  const withdrawalTotal = products.reduce(
    (sum, item) => sum + unitPrice(item) * (selectedQty[item.id] || 0),
    0,
  );

  const handleSubmit = async () => {
    if (selectedItems.length === 0) {
      setStatus('error');
      setMessage('Vælg venligst mindst én vare at fortryde.');
      return;
    }

    try {
      setLoading(true);
      setStatus('idle');
      setMessage('');

      const response = await fetch('/api/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          orderKey,
          cancelFullOrder: allFullySelected,
          lineItems: selectedItems.map((item) => ({
            id: item.id,
            productId: item.productId,
            quantity: selectedQty[item.id],
          })),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus('error');
        setMessage(data?.message || 'Noget gik galt. Prøv venligst igen.');
        return;
      }

      setStatus('success');
      setMessage(data?.message || 'Din fortrydelsesanmodning er blevet sendt.');
    } catch {
      setStatus('error');
      setMessage('Noget gik galt. Prøv venligst igen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1a1a1a]">Fortryd ordre</h2>
          <p className="mt-2 text-sm text-gray-500">
            I henhold til EU-lovgivningen har du ret til at fortryde dit
            onlinekøb inden for 90 dage. Udfyld venligst oplysningerne nedenfor.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-pink-200 text-pink-500 hover:bg-pink-50"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <h3 className="mt-6 text-lg font-bold text-[#1a1a1a]">
        Du fortryder ordre #{orderNumber}
      </h3>

      <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <span className="font-semibold text-[#1a1a1a]">{orderDate}</span>
          <span className="font-medium text-gray-700">{orderStatus}</span>
        </div>

        <div className="px-5 pt-4 text-sm text-gray-500">
          Vælg de varer, du fortryder. Juster antallet for kun at fortryde en
          del af en vare.
        </div>

        <div className="space-y-3 px-5 py-4">
          {products.map((item) => {
            const qty = selectedQty[item.id] || 0;
            const checked = qty > 0;

            return (
              <div key={item.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleItem(item)}
                  className="h-5 w-5 shrink-0 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <span className="flex-1 text-sm text-[#1a1a1a]">
                  {item.name}
                </span>

                {item.quantity > 1 ? (
                  <input
                    type="number"
                    min={0}
                    max={item.quantity}
                    value={qty}
                    onChange={(e) =>
                      changeQty(item, parseInt(e.target.value, 10) || 0)
                    }
                    className="h-8 w-14 rounded border border-gray-300 text-center text-sm"
                  />
                ) : (
                  <span className="w-6 text-center text-sm text-gray-500">
                    {item.quantity}
                  </span>
                )}

                <span className="w-24 text-right text-sm font-semibold text-[#1a1a1a]">
                  {parseFloat(item.total).toFixed(2)} {currency}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
          <span className="font-bold text-[#1a1a1a]">Fortrydelsestotal</span>
          <span className="font-bold text-[#1a1a1a]">
            {withdrawalTotal.toFixed(2)} {currency}
          </span>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => router.push('/')}
          disabled={loading}
          className="h-11 flex-1 rounded-lg border border-pink-300 font-medium text-pink-600 hover:bg-pink-50 disabled:opacity-50"
        >
          Gå tilbage
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="h-11 flex-1 rounded-lg border border-pink-300 font-medium text-pink-600 hover:bg-pink-50 disabled:opacity-50"
        >
          Bekræft fortrydelse
        </button>
      </div>

      {loading && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Indsender fortrydelse...
        </div>
      )}

      {!loading && status === 'success' && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {message}
        </div>
      )}

      {!loading && status === 'error' && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {message}
        </div>
      )}
    </div>
  );
}
