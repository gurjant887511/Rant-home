import React, { useState, useRef } from 'react';
import { api } from '../services/api';

// ─── NO CSS IMPORT NEEDED — Pure Tailwind ───────────────────────────────────

<img
  src={src}
  style={{
    position: 'absolute',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',   // ← yeh bhi important hai
  }}
/>


const MAX_IMAGES = 6;

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    area: '',
    type: '1BHK',
    images: [],          // stores base64 data-URL strings
    ownerName: '',
    phone: '',
    location: { lat: '', lng: '' },
  });

  const [loading, setLoading]   = useState(false);
  const [message, setMessage]   = useState({ text: '', type: '' }); // type: success | error | warn
  const fileInputRef            = useRef(null);

  // ── Field change handler ──────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const key = name.split('.')[1];
      setFormData(p => ({ ...p, location: { ...p.location, [key]: value } }));
    } else {
      setFormData(p => ({ ...p, [name]: value }));
    }
  };

  // ── Image handler — MAIN FIX ─────────────────────────────────────────────
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = MAX_IMAGES - formData.images.length;
    if (remaining <= 0) {
      setMessage({ text: `Maximum ${MAX_IMAGES} images already added.`, type: 'error' });
      e.target.value = '';
      return;
    }

    const filesToProcess = files.slice(0, remaining);
    if (files.length > remaining) {
      setMessage({ text: `Only ${remaining} more image(s) can be added.`, type: 'warn' });
    }

    // Convert each File → base64 data-URL using FileReader
    const readPromises = filesToProcess.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload  = (ev) => resolve(ev.target.result);
          reader.onerror = ()   => reject(new Error('Read failed'));
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readPromises)
      .then((dataUrls) => {
        setFormData(p => ({ ...p, images: [...p.images, ...dataUrls] }));
        setMessage({ text: `${filesToProcess.length} image(s) added!`, type: 'success' });
      })
      .catch(() => setMessage({ text: 'Could not read image files.', type: 'error' }));

    // Reset so same file can be selected again
    e.target.value = '';
  };

  const removeImage = (idx) =>
    setFormData(p => ({ ...p, images: p.images.filter((_, i) => i !== idx) }));

  // ── Geolocation ───────────────────────────────────────────────────────────
  const getGeolocation = () => {
    if (!navigator.geolocation) {
      setMessage({ text: 'Geolocation not supported.', type: 'error' });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setFormData(p => ({
          ...p,
          location: { lat: coords.latitude.toString(), lng: coords.longitude.toString() },
        }));
        setMessage({ text: 'Location captured!', type: 'success' });
      },
      (err) => setMessage({ text: 'Location error: ' + err.message, type: 'error' })
    );
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage({ text: '', type: '' });
      const payload = { ...formData, price: Number(formData.price) };
      const res = await api.createProperty(payload);
      if (res.data.success) {
        setMessage({ text: 'Property listed successfully!', type: 'success' });
        setFormData({
          title: '', description: '', price: '', city: '', area: '',
          type: '1BHK', images: [], ownerName: '', phone: '',
          location: { lat: '', lng: '' },
        });
      }
    } catch (err) {
      setMessage({ text: 'Error: ' + err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // ── Alert styles ──────────────────────────────────────────────────────────
  const alertStyle = {
    success: 'bg-green-50 border-green-400 text-green-800',
    error:   'bg-red-50 border-red-400 text-red-800',
    warn:    'bg-yellow-50 border-yellow-400 text-yellow-800',
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* ── Page Header ── */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl shadow-lg mb-3">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Add New Property</h1>
          <p className="text-slate-500 text-sm mt-1">List your rental property on RentHub</p>
        </div>

        {/* ── Alert Banner ── */}
        {message.text && (
          <div className={`border rounded-xl px-4 py-3 text-sm font-medium ${alertStyle[message.type]}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* ══ SECTION 1 — Property Details ══════════════════════════════ */}
          <Card title="🏠 Property Details">
            <FormField label="Property Title" required>
              <TextInput name="title" value={formData.title} onChange={handleChange}
                placeholder="e.g., Modern 2BHK Apartment" required />
            </FormField>

            <FormField label="Description" required>
              <textarea
                name="description" value={formData.description} onChange={handleChange}
                rows={4} required
                placeholder="Describe your property — furnishing, amenities, floor, condition…"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm
                           text-slate-800 placeholder-slate-400 resize-none
                           focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Monthly Rent (₹)" required>
                <TextInput type="number" name="price" value={formData.price}
                  onChange={handleChange} placeholder="e.g., 15000" required />
              </FormField>
              <FormField label="Property Type" required>
                <select name="type" value={formData.type} onChange={handleChange} required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm
                             text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400
                             focus:border-transparent transition">
                  {['1BHK','2BHK','3BHK','4BHK','5BHK'].map(t => (
                    <option key={t} value={t}>{t.replace('BHK', ' BHK')}</option>
                  ))}
                </select>
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="City" required>
                <TextInput name="city" value={formData.city} onChange={handleChange}
                  placeholder="e.g., Ganganagar" required />
              </FormField>
              <FormField label="Area / Locality" required>
                <TextInput name="area" value={formData.area} onChange={handleChange}
                  placeholder="e.g., Sector 5" required />
              </FormField>
            </div>
          </Card>

          {/* ══ SECTION 2 — Images ════════════════════════════════════════ */}
          <Card title="🖼️ Property Images">

            {/*
              HIDDEN FILE INPUT
              Using style={{ display: 'none' }} instead of className="hidden"
              to guarantee no CSS framework or global style can override it.
            */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />

            {/* Clickable upload zone */}
            <button
              type="button"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              disabled={formData.images.length >= MAX_IMAGES}
              className="w-full flex flex-col items-center justify-center gap-2 py-8
                         border-2 border-dashed border-indigo-300 rounded-2xl
                         text-indigo-500 hover:bg-indigo-50 hover:border-indigo-500
                         transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01
                     M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-semibold text-sm">
                {formData.images.length >= MAX_IMAGES
                  ? 'Maximum images reached'
                  : 'Click here to add images'}
              </span>
              <span className="text-xs text-slate-400">
                {formData.images.length} / {MAX_IMAGES} &nbsp;·&nbsp; JPG, PNG, WEBP supported
              </span>
            </button>

            {/*
              ══════════════════════════════════════════
              IMAGE PREVIEW GRID
              Using inline styles for position/size so
              NO external CSS can ever break the layout.
              ══════════════════════════════════════════
            */}
            {formData.images.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                marginTop: '16px',
              }}>
                {formData.images.map((src, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: 'relative',
                      width: '100%',
                      paddingBottom: '66.66%',   /* 3:2 aspect ratio box */
                      borderRadius: '10px',
                      overflow: 'hidden',
                      backgroundColor: '#cbd5e1',
                      boxShadow: '0 1px 6px rgba(0,0,0,0.15)',
                    }}
                  >
                    {/* ── THE PREVIEW IMAGE ── */}
                    <img
                      src={src}
                      alt={`Property preview ${idx + 1}`}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',        /* prevents phantom bottom gap */
                      }}
                    />

                    {/* Remove (×) button */}
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(220,38,38,0.9)',
                        color: '#ffffff',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        lineHeight: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        padding: 0,
                      }}
                    >
                      ×
                    </button>

                    {/* Index badge */}
                    <span style={{
                      position: 'absolute',
                      bottom: '6px',
                      left: '6px',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: '600',
                      borderRadius: '6px',
                      padding: '2px 7px',
                    }}>
                      {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* ══ SECTION 3 — Location ════════════════════════════════════ */}
          <Card title="📍 Location">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Latitude">
                <TextInput type="number" name="location.lat" value={formData.location.lat}
                  onChange={handleChange} placeholder="e.g., 29.5" step="0.00001" />
              </FormField>
              <FormField label="Longitude">
                <TextInput type="number" name="location.lng" value={formData.location.lng}
                  onChange={handleChange} placeholder="e.g., 73.1" step="0.00001" />
              </FormField>
            </div>
            <button
              type="button" onClick={getGeolocation}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                         border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
            >
              📍 Use My Current Location
            </button>
          </Card>

          {/* ══ SECTION 4 — Owner Info ═══════════════════════════════════ */}
          <Card title="👤 Owner Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Owner Name" required>
                <TextInput name="ownerName" value={formData.ownerName}
                  onChange={handleChange} placeholder="Your full name" required />
              </FormField>
              <FormField label="Phone Number" required>
                <TextInput type="tel" name="phone" value={formData.phone}
                  onChange={handleChange} placeholder="+91-9876543210" required />
              </FormField>
            </div>
          </Card>

          {/* ── Submit ── */}
          <button
            type="submit" disabled={loading}
            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99]
                       text-white font-bold text-base shadow-lg shadow-indigo-200 transition
                       disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Submitting…
              </>
            ) : '🏡 List My Property'}
          </button>

        </form>
      </div>
    </div>
  );
};

// ─── Reusable helpers ────────────────────────────────────────────────────────

const Card = ({ title, children }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
    <h2 className="text-base font-semibold text-slate-700 pb-3 border-b border-slate-100">{title}</h2>
    {children}
  </div>
);

const FormField = ({ label, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
      {label}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const TextInput = ({ ...props }) => (
  <input
    {...props}
    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm
               text-slate-800 placeholder-slate-400
               focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
  />
);

export default AddProperty;