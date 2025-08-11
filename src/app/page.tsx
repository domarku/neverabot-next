'use client';

import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navigation from '@/components/Navigation';
import LocationInput from '@/components/LocationInput';
import { getLocationFromIP } from '@/lib/geolocation';

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    city: '',
    country: '',
    signedInCity: '',
    isPersisted: true,
    isPublic: false,
    notBot: false,
  });
  const [locationInput, setLocationInput] = useState('');

  const [errors, setErrors] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const day = now.getDate();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    setCurrentDate(`${day} ${month} ${year}`);
  }, []);

  // Get user's location from IP address on page load
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const locationData = await getLocationFromIP();
        if (locationData && locationData.city && locationData.country) {
          // Pre-fill the signing location field
          setFormData(prev => ({
            ...prev,
            signedInCity: `${locationData.city}, ${locationData.country}`,
          }));
        }
      } catch (error) {
        console.error('Failed to get user location:', error);
      }
    };

    getUserLocation();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLocationSelect = (city: string, country: string) => {
    setFormData(prev => ({
      ...prev,
      city,
      country,
    }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.fullName) newErrors.push('Full Name');
    if (!formData.birthDate) newErrors.push('Birth Date');
    if (!formData.city) newErrors.push('City');
    if (!formData.country) newErrors.push('Country');
    if (!formData.signedInCity) newErrors.push('Signing Location');
    if (!formData.notBot) newErrors.push('Bot verification');

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create the print content
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Never a bot - Statement</title>
          <style>
            body { font-family: 'Publico Text Mono Web Roman', monospace; margin: 0; padding: 100px 60px; background: white; }
            .paper { max-width: 800px; margin: 0 auto; }
            .logo { margin-bottom: 32px; }
            .logo img { width: 100px; }
            h1 { margin-bottom: 64px; font-weight: 400; }
            .statement-body { margin-bottom: 64px; line-height: 1.6; }
            .foot { display: flex; margin-top: 100px; }
            .foot div { flex: 1; width: 33.33%; }
            @media print { body { padding: 100px 60px; } }
          </style>
        </head>
        <body>
          <div class="paper">
            <div class="logo">
              <img src="/assets/img/neverabot-logo.svg" alt="Never a bot logo">
            </div>
            <h1>Never a bot</h1>
            
            <div class="statement-body">
              <p>I, ${formData.fullName}, born on ${new Date(formData.birthDate).toLocaleDateString('en-GB')} in ${formData.city}, ${formData.country}, hereby state my explicit refusal for any person, organization, or system to use, reproduce, simulate, or otherwise process my personal communications, writings, images, recordings, or any other data about me for the purpose of creating, training, or deploying an artificial intelligence, chatbot, or any other system that imitates my likeness, personality, or voice after my death.</p>
              <p>This includes, but is not limited to:</p>
              <ul>
                <li>Private or public messages, emails, posts, images, and recordings.</li>
                <li>Data collected from any online or offline activity, regardless of its public availability.</li>
              </ul>
              <p>I have not granted and do not grant consent for such use, and my privacy, dignity, and identity must be respected beyond my lifetime.</p>
            </div>

            <div class="foot">
              <div>
                <p>Date:<br>${currentDate}</p>
              </div>
              <div>
                <p>Location:<br>${formData.signedInCity}</p>
              </div>
              <div>
                <p>Signature:<br>_____________</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Open print window
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="outer-container">
      <header></header>

      <Navigation />

      <div className={`paper ${errors.length > 0 ? 'shadow-red' : ''}`}>
        <div className={`logo ${errors.length > 0 ? 'error' : ''}`}></div>
        <h1>Never a bot</h1>
        <h2>Statement on the Integrity of Digital Remains</h2>

        <form className="statement" onSubmit={handleSubmit}>
          <div className="statement-body">
            {errors.length > 0 && !errors.includes('Bot verification') && (
              <div className="alert">
                <p>
                  Please fill out all of the fields. You left{' '}
                  <span className="alert__fields">{errors.join(', ')}</span>{' '}
                  blank.
                </p>
              </div>
            )}
            <div className="statement-text">
              <span>I, </span>
              <input
                id="full-name"
                type="text"
                placeholder="Full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                data-1p-ignore
              />
              <span>, born on </span>
              <input
                type="date"
                id="birthdate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                data-1p-ignore
              />
              <span> in </span>
              <LocationInput
                value={locationInput}
                onChange={setLocationInput}
                onLocationSelect={handleLocationSelect}
                placeholder="City, Country"
              />
              <span>
                , hereby state my explicit refusal for any person, organization,
                or system to use, reproduce, simulate, or otherwise process my
                personal communications, writings, images, recordings, or any
                other data about me for the purpose of creating, training, or
                deploying an artificial intelligence, chatbot, or any other
                system that imitates my likeness, personality, or voice after my
                death.
              </span>
            </div>
            <p>This includes, but is not limited to:</p>
            <ul>
              <li>
                Private or public messages, emails, posts, images, and
                recordings.
              </li>
              <li>
                Data collected from any online or offline activity, regardless
                of its public availability.
              </li>
            </ul>
            <p>
              I have not granted and do not grant consent for such use, and my
              privacy, dignity, and identity must be respected beyond my
              lifetime.
            </p>
          </div>

          <div className="form-grid">
            <div className="grid-item signing-location">
              <label htmlFor="location-input">Location:</label>
              <input
                name="signedInCity"
                className="location-input"
                id="location-input"
                type="text"
                placeholder="Place of residence"
                value={formData.signedInCity}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid-item date">
              <label>Date:</label>
              <p id="date">{currentDate}</p>
            </div>

            <div className="grid-item submit-section">
              <div className="submit-container">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="not-bot"
                    name="notBot"
                    checked={formData.notBot}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="not-bot">
                    <span></span>
                    <div className="label fake-captcha__label">
                      I&apos;m (still) not a bot
                    </div>
                  </label>
                  {errors.includes('Bot verification') && (
                    <div className="alert">
                      <p>Please confirm you&apos;re still human.</p>
                    </div>
                  )}
                </div>

                <input type="submit" value="Print statement" />
                <span>Opens your pre-filled statement ready to print.</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
