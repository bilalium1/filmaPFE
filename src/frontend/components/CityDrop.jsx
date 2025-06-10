// MoroccanCityDropdown.jsx
import { useState, useRef, useEffect } from "react";

const cities = [
  "Agadir", "Al Hoceima", "Asilah", "Azilal", "Beni Mellal", "Berkane", "Berrechid",
  "Boujdour", "Casablanca", "Chefchaouen", "Dakhla", "El Jadida", "Errachidia",
  "Essaouira", "Fès", "Fquih Ben Salah", "Guelmim", "Ifrane", "Kenitra", "Khemisset",
  "Khouribga", "Laâyoune", "Larache", "Marrakech", "Meknès", "Mohammedia", "Nador",
  "Ouarzazate", "Oujda", "Rabat", "Safi", "Salé", "Settat", "Sidi Bennour", "Sidi Ifni",
  "Sidi Kacem", "Sidi Slimane", "Skhirat", "Tan-Tan", "Tanger", "Taounate", "Taourirt",
  "Taroudant", "Taza", "Témara", "Tétouan", "Tinghir", "Tiznit", "Zagora"
];

export default function MoroccanCityDropdown({value, onChange}) {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef(null);

  // Close dropdown if you click outside
  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Attach listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mt-4">
      <label htmlFor="location" className="block text-sm font-medium text-stone-300">
        City
      </label>
      <select
        id="location"
        name="location"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 bg-stone-900 text-stone-100 border-stone-700 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
      >
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
}
