'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Image from 'next/image'

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    city: '',
    country: '',
    signedInCity: '',
    isPersisted: true,
    isPublic: false,
    notBot: false
  })
  
  const [errors, setErrors] = useState<string[]>([])
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const now = new Date()
    const day = now.getDate()
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = monthNames[now.getMonth()]
    const year = now.getFullYear()
    setCurrentDate(`${day} ${month} ${year}`)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validateForm = () => {
    const newErrors: string[] = []
    
    if (!formData.firstName) newErrors.push('First Name')
    if (!formData.lastName) newErrors.push('Last Name')
    if (!formData.birthDay) newErrors.push('Birth Day')
    if (!formData.birthMonth) newErrors.push('Birth Month')
    if (!formData.birthYear) newErrors.push('Birth Year')
    if (!formData.city) newErrors.push('City')
    if (!formData.country) newErrors.push('Country')
    if (!formData.signedInCity) newErrors.push('Signing Location')
    if (!formData.notBot) newErrors.push('Bot verification')
    
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
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
              <p>I hereby declare that I, ${formData.firstName} ${formData.lastName},
                born on ${formData.birthDay}.${formData.birthMonth}.${formData.birthYear} in ${formData.city},
                ${formData.country}, don&apos;t want to be turned into a chatbot after I die because nobody asked for my permission, and nobody will be able to because I won&apos;t be alive.
              </p>
                              <p>I&apos;d rather have nobody tamper with my private messages, emails, tweets, public or private posts of any kind and/or use them as data for an intelligence that is not me.</p>
              <p>Please respect my privacy. I do not want to take on an eternal form I did not comply to.</p>
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
    `

    // Open print window
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
    }
  }

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
    'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador',
    'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France',
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
    'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
    'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait',
    'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
    'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru',
    'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman',
    'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
    'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
    'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
    'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
    'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
    'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ]

  return (
    <div className="outer-container">
      <header>
        {errors.length > 0 && (
          <div className="alert">
            <p>Please fill out all of the fields. You left <span className="alert__fields">{errors.join(', ')}</span> blank.</p>
          </div>
        )}
        <p className="still-human alert" style={{ display: errors.includes('Bot verification') ? 'block' : 'none' }}>
          Please confirm you&apos;re still human.
        </p>
      </header>

      <Navigation />

      <div className="paper">
        <div className="logo">
          <Image 
            src="/assets/img/neverabot-logo.svg" 
            alt="Never a bot logo" 
            width={100} 
            height={100}
            className="logo-hover"
          />
        </div>
        <h1>Never a bot</h1>

        <form className="statement" onSubmit={handleSubmit}>
          <div className="statement-body">
            <p>
              I hereby declare that I,{' '}
              <input
                id="first-name"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <input
                id="last-name"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
              />,
              born on{' '}
              <select
                id="birthday"
                name="birthDay"
                value={formData.birthDay}
                onChange={handleInputChange}
              >
                <option value="">Day</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select
                id="birthmonth"
                name="birthMonth"
                value={formData.birthMonth}
                onChange={handleInputChange}
              >
                <option value="">Month</option>
                {months.map((month, index) => (
                  <option key={index + 1} value={index + 1}>{month}</option>
                ))}
              </select>
              <select
                id="birthyear"
                name="birthYear"
                value={formData.birthYear}
                onChange={handleInputChange}
              >
                <option value="">Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              in{' '}
              <input
                name="city"
                id="city"
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
              />,{' '}
              <select
                name="country"
                id="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="">Country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>, don&apos;t want to be turned into a{' '}
              <span className="tooltip">
                chatbot
                <span className="tooltiptext">
                  Chatbot<br />
                  — noun<br />
                  a computer program which conducts a conversation via auditory or textual methods [...] often designed to convincingly simulate how a human would behave as a conversational partner, thereby passing the Turing test.<br />
                  (From Wikipedia, 22 November 2017)
                </span>
              </span>{' '}
              after I die because nobody asked for my permission, and nobody will be able to because I won&apos;t be alive.
            </p>
            <p>
              I&apos;d rather have nobody tamper with my private messages, emails, tweets, public or private posts of any kind and/or use them as data for an intelligence that is not me.
            </p>
            <p>
              Please respect my{' '}
              <span className="tooltip">
                privacy
                <span className="tooltiptext">
                  privacy<br />
                  — noun<br />
                  a state in which one is not observed or disturbed by other people.
                </span>
              </span>. I do not want to take on an eternal form I did not comply to.
            </p>
          </div>

          <div className="checkboxes">
            <div>
              <input
                type="checkbox"
                id="not-bot"
                name="notBot"
                checked={formData.notBot}
                onChange={handleInputChange}
              />
              <label htmlFor="not-bot">
                <span></span>
                <div className="label fake-captcha__label">I&apos;m (still) not a bot</div>
              </label>
            </div>
          </div>

          <div className="date">
            <p>Date:</p>
            <p id="date">{currentDate}</p>
          </div>

          <div className="location">
            <p>
              Location:<br />
              <input
                name="signedInCity"
                className="location-input"
                id="location-input"
                type="text"
                placeholder="Place of residence"
                value={formData.signedInCity}
                onChange={handleInputChange}
              />
            </p>
          </div>

          <div className="submit">
            <p>
              <input type="submit" value="Preview and print" />
              <span>Opens your pre-filled statement ready to print. Check your info one more time.</span>
            </p>
          </div>
        </form>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} neverabot.org</p>
      </footer>
    </div>
  )
}
