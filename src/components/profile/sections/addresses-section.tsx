'use client';

import { useState } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { profileClasses } from '../constants/profile-theme';
import { ADDRESSES } from '../constants/profile-data';
import { Address } from '../types/profile';

// NOTE: confirm this endpoint path against your actual backend — it follows
// the same convention as the existing delete-profile call.
const UPDATE_ADDRESS_ENDPOINT =
  'https://tapbookme.com/wp-json/custom/v1/update-address';

export function AddressesSection() {
  const [addresses, setAddresses] = useState<Address[]>(ADDRESSES);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [form, setForm] = useState<Omit<Address, 'id' | 'type'>>({
    label: '',
    fullName: '',
    street: '',
    postalCode: '',
    city: '',
    country: '',
    phone: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openEdit(address: Address) {
    setEditingAddress(address);
    setForm({
      label: address.label,
      fullName: address.fullName,
      street: address.street,
      postalCode: address.postalCode,
      city: address.city,
      country: address.country,
      phone: address.phone,
    });
    setError(null);
  }

  function closeEdit() {
    setEditingAddress(null);
    setError(null);
  }

  function handleChange(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editingAddress) return;
    setError(null);

    const token = localStorage.getItem('auth_token');
    if (!token) {
      setError('You must be logged in to update an address.');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(UPDATE_ADDRESS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: editingAddress.type,
          ...form,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Could not update the address.');
      }

      setAddresses((prev) =>
        prev.map((a) => (a.id === editingAddress.id ? { ...a, ...form } : a)),
      );
      closeEdit();
    } catch (err: any) {
      setError(err.message || 'Could not update the address.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h2 className={cn('text-2xl mb-1', profileClasses.textPrimary)}>
            Your <span className={profileClasses.serifItalic}>Addresses</span>
          </h2>
          <p className={cn('text-sm', profileClasses.textSecondary)}>
            Used for billing and delivery of your orders
          </p>
        </div>
        <Button
          className={cn(profileClasses.buttonDark, 'gap-1.5 w-full sm:w-auto')}
        >
          <Plus className="h-4 w-4" />
          Add new address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={cn(profileClasses.surfaceCard, 'p-5')}
          >
            <h3
              className={cn(
                'text-sm font-semibold mb-3',
                profileClasses.textPrimary,
              )}
            >
              {address.label}
            </h3>
            <div
              className={cn(
                'text-sm space-y-0.5 mb-4',
                profileClasses.textSecondary,
              )}
            >
              <p className={profileClasses.textPrimary}>{address.fullName}</p>
              <p>{address.street}</p>
              <p>
                {address.postalCode} {address.city}
              </p>
              <p>{address.country}</p>
              <p>{address.phone}</p>
            </div>
            <button
              type="button"
              onClick={() => openEdit(address)}
              className={cn(
                'text-sm font-medium underline underline-offset-2 cursor-pointer',
                profileClasses.textPrimary,
              )}
            >
              Edit address →
            </button>
          </div>
        ))}
      </div>

      {editingAddress && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={closeEdit}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#EAE1D3] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Edit {editingAddress.label}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className={profileClasses.textSecondary}>
                    Full name
                  </Label>
                  <Input
                    value={form.fullName}
                    onChange={handleChange('fullName')}
                    className="bg-[#FAF6F0] border-[#EAE1D3]"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className={profileClasses.textSecondary}>
                    Street address
                  </Label>
                  <Input
                    value={form.street}
                    onChange={handleChange('street')}
                    className="bg-[#FAF6F0] border-[#EAE1D3]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className={profileClasses.textSecondary}>
                    Postal code
                  </Label>
                  <Input
                    value={form.postalCode}
                    onChange={handleChange('postalCode')}
                    className="bg-[#FAF6F0] border-[#EAE1D3]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className={profileClasses.textSecondary}>City</Label>
                  <Input
                    value={form.city}
                    onChange={handleChange('city')}
                    className="bg-[#FAF6F0] border-[#EAE1D3]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className={profileClasses.textSecondary}>
                    Country
                  </Label>
                  <Input
                    value={form.country}
                    onChange={handleChange('country')}
                    className="bg-[#FAF6F0] border-[#EAE1D3]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className={profileClasses.textSecondary}>
                    Phone number
                  </Label>
                  <Input
                    value={form.phone}
                    onChange={handleChange('phone')}
                    className="bg-[#FAF6F0] border-[#EAE1D3]"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-rose-600">{error}</p>}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={closeEdit}
                  className="rounded-full px-5 text-sm font-medium text-neutral-500 hover:bg-neutral-100"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className={cn(profileClasses.buttonDark, 'px-5 py-5')}
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                    </span>
                  ) : (
                    'Save address'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
