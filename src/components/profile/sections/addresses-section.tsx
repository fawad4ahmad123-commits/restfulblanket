'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { profileClasses } from '../constants/profile-theme';
import { Address } from '../types/profile';

const GET_ADDRESSES_ENDPOINT =
  'https://tapbookme.com/wp-json/custom/v1/get-addresses';
const UPDATE_ADDRESS_ENDPOINT =
  'https://tapbookme.com/wp-json/custom/v1/update-address';
const ADD_ADDRESS_ENDPOINT =
  'https://tapbookme.com/wp-json/custom/v1/add-address';

type ModalMode = 'add' | 'edit' | null;

const EMPTY_FORM: Omit<Address, 'id'> = {
  type: 'delivery',
  label: '',
  fullName: '',
  street: '',
  postalCode: '',
  city: '',
  country: '',
  phone: '',
};

export function AddressesSection() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Address, 'id'>>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  async function fetchAddresses() {
    setIsLoading(true);
    setLoadError(null);

    const token = localStorage.getItem('auth_token');
    if (!token) {
      setIsLoading(false);
      setLoadError('You must be logged in to view addresses.');
      return;
    }

    try {
      const response = await fetch(GET_ADDRESSES_ENDPOINT, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not fetch addresses.');
      }

      let addressesData = data;
      if (data.data && Array.isArray(data.data)) {
        addressesData = data.data;
      } else if (data.addresses && Array.isArray(data.addresses)) {
        addressesData = data.addresses;
      } else if (!Array.isArray(data)) {
        addressesData = data.addresses || data.address || [];
        if (!Array.isArray(addressesData)) {
          addressesData = [];
        }
      }

      setAddresses(addressesData);
    } catch (err: any) {
      console.error('Error fetching addresses:', err);
      setLoadError(err.message || 'Failed to load addresses.');
    } finally {
      setIsLoading(false);
    }
  }

  function openEdit(address: Address) {
    setModalMode('edit');
    setEditingId(address.id);
    setForm({
      type: address.type,
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

  function openAdd() {
    setModalMode('add');
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError(null);
  }

  function closeModal() {
    setModalMode(null);
    setError(null);
  }

  function handleChange(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, type: e.target.value as Address['type'] }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem('auth_token');
    if (!token) {
      setError('Du skal være logget ind for at administrere adresser.');
      return;
    }

    setIsSaving(true);
    try {
      if (modalMode === 'edit' && editingId) {
        const response = await fetch(UPDATE_ADDRESS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: editingId, ...form }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Could not update the address.');
        }

        setAddresses((prev) =>
          prev.map((a) => (a.id === editingId ? { ...a, ...form } : a)),
        );
      } else {
        const response = await fetch(ADD_ADDRESS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Could not add the address.');
        }

        const newId =
          data.id !== undefined && data.id !== null
            ? String(data.id)
            : `addr-${Date.now()}`;

        let newAddress: Address;
        if (data.address && typeof data.address === 'object') {
          newAddress = { id: newId, ...data.address };
        } else {
          newAddress = { id: newId, ...form };
        }

        setAddresses((prev) => [...prev, newAddress]);
      }

      closeModal();
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#2B2420]" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="text-center py-8">
        <p className="text-rose-600 text-sm mb-3">{loadError}</p>
        <Button
          onClick={fetchAddresses}
          className={cn(profileClasses.buttonDark)}
        >
          Prøv igen
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h2 className={cn('text-2xl mb-1', profileClasses.textPrimary)}>
            Dine <span className={profileClasses.serifItalic}>adresser</span>
          </h2>
          <p className={cn('text-sm', profileClasses.textSecondary)}>
            Bruges til fakturering og levering af dine ordrer
          </p>
        </div>
        <Button
          type="button"
          onClick={openAdd}
          className={cn(profileClasses.buttonDark, 'gap-1.5 w-full sm:w-auto')}
        >
          <Plus className="h-4 w-4" />
          Tilføj ny adresse
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.length > 0 ? (
          addresses.map((address) => (
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
                {address.label || address.type}
              </h3>
              <div
                className={cn(
                  'text-sm space-y-0.5 mb-4',
                  profileClasses.textSecondary,
                )}
              >
                <p className={profileClasses.textPrimary}>
                  {address.fullName || 'No name'}
                </p>
                <p>{address.street || 'No street address'}</p>
                <p>
                  {address.postalCode || ''} {address.city || ''}
                </p>
                <p>{address.country || 'No country'}</p>
                <p>{address.phone || 'No phone'}</p>
              </div>
              <button
                type="button"
                onClick={() => openEdit(address)}
                className={cn(
                  'text-sm font-medium underline underline-offset-2 cursor-pointer',
                  profileClasses.textPrimary,
                )}
              >
                Rediger adresse →
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center">
            <p className={cn('text-sm mb-3', profileClasses.textSecondary)}>
              Du har ikke tilføjet nogen adresser endnu.
            </p>
            <Button
              type="button"
              onClick={openAdd}
              variant="outline"
              className="border-[#EAE1D3] text-[#2B2420]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tilføj din første adresse
            </Button>
          </div>
        )}
      </div>

      {modalMode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#EAE1D3] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              {modalMode === 'add'
                ? 'Tilføj ny adresse'
                : `Rediger ${form.label || 'adresse'}`}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {modalMode === 'add' && (
                  <>
                    <div className="space-y-1.5">
                      <Label className={profileClasses.textSecondary}>
                        Adresse type
                      </Label>
                      <select
                        value={form.type}
                        onChange={handleTypeChange}
                        className="w-full rounded-md border border-[#EAE1D3] bg-[#FAF6F0] px-3 py-2 text-sm text-[#2B2420]"
                      >
                        <option value="delivery">Levering</option>
                        <option value="billing">Fakturering</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className={profileClasses.textSecondary}>
                        Label
                      </Label>
                      <Input
                        placeholder="e.g. Home, Office"
                        value={form.label}
                        onChange={handleChange('label')}
                        className="bg-[#FAF6F0] border-[#EAE1D3] placeholder:text-[#B7AB9C]"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-1.5 sm:col-span-2">
                  <Label className={profileClasses.textSecondary}>
                    Fulde navn
                  </Label>
                  <Input
                    value={form.fullName}
                    onChange={handleChange('fullName')}
                    className="bg-[#FAF6F0] border-[#EAE1D3]"
                    required
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className={profileClasses.textSecondary}>
                    Gadeadresse
                  </Label>
                  <Input
                    value={form.street}
                    onChange={handleChange('street')}
                    className="bg-[#FAF6F0] border-[#EAE1D3]"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className={profileClasses.textSecondary}>
                    Postnummer
                  </Label>
                  <Input
                    value={form.postalCode}
                    onChange={handleChange('postalCode')}
                    className="bg-[#FAF6F0] border-[#EAE1D3]"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className={profileClasses.textSecondary}>By</Label>
                  <Input
                    value={form.city}
                    onChange={handleChange('city')}
                    className="bg-[#FAF6F0] border-[#EAE1D3]"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className={profileClasses.textSecondary}>Land</Label>
                  <Input
                    value={form.country}
                    onChange={handleChange('country')}
                    className="bg-[#FAF6F0] border-[#EAE1D3]"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className={profileClasses.textSecondary}>
                    Telefonnummer
                  </Label>
                  <Input
                    value={form.phone}
                    onChange={handleChange('phone')}
                    className="bg-[#FAF6F0] border-[#EAE1D3]"
                    required
                  />
                </div>
              </div>

              {error && <p className="text-sm text-rose-600">{error}</p>}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={closeModal}
                  className="rounded-full px-5 text-sm font-medium text-neutral-500 hover:bg-neutral-100"
                >
                  Annuller
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className={cn(profileClasses.buttonDark, 'px-5 py-5')}
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Gemmer...
                    </span>
                  ) : modalMode === 'add' ? (
                    'Tilføj adresse'
                  ) : (
                    'Gem adresse'
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
