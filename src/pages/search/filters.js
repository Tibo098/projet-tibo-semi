import { useState, useEffect } from "react"
import axios from "axios"

export const getServerSideProps = async () => {
  const { data } = await axios("http://localhost:3000/api/application")

  return {
    props: { initialApplications: data }
  }
}
function ResultsPage({ initialApplications }) {
  const [applications] = useState(initialApplications)
  const [filters, setFilters] = useState({
    category: "",
    priceRange: { min: 0, max: 1000 },
    city: ""
  })

  useEffect(() => {
    // Vous pourriez récupérer les données filtrées depuis une API lorsque les filtres changent
    // fetchApplications()
  }, [filters])
  
  const handleCategoryChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: event.target.value
    }))
  }
  const handleCityChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      city: event.target.value
    }))
  }
  const handlePriceChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: { ...prevFilters.priceRange, [key]: value }
    }))
  }
  const filteredApplications = filterApplications(applications, filters)

  return (
    <div>
      <FilterOptions
        filters={filters}
        onCategoryChange={handleCategoryChange}
        onCityChange={handleCityChange}
        onPriceChange={handlePriceChange}
      />
      <ApplicationList applications={filteredApplications} />
    </div>
  )
}

function filterApplications(applications, filters) {
  return applications.filter((application) => {
    const { category, city, priceRange } = filters
    const { typeCategory, city: appCity, price } = application

    return (
      (!category ||
        typeCategory.toLowerCase().includes(category.toLowerCase())) &&
      (!city || appCity.toLowerCase().includes(city.toLowerCase())) &&
      price >= priceRange.min &&
      price <= priceRange.max
    )
  })
}

function FilterOptions({ filters, onCategoryChange, onCityChange, onPriceChange }) {
  return (
    <div>
      <div>
        <select value={filters.category} onChange={onCategoryChange}>
          <option value="">Sélectionnez une catégorie</option>
          <option value="restaurant">Restaurant</option>
          <option value="bar">Bar</option>
          <option value="store">Magasin</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          value={filters.city}
          onChange={onCityChange}
          placeholder="Filtrer par ville"
        />
      </div>
      <div>
        <input
          type="number"
          value={filters.priceRange.min}
          onChange={(e) => onPriceChange("min", e.target.value)}
          placeholder="Prix min"
        />
      </div>
      <div>
        <input
          type="number"
          value={filters.priceRange.max}
          onChange={(e) => onPriceChange("max", e.target.value)}
          placeholder="Prix max"
        />
      </div>
    </div>
  )
}

function ApplicationList({ applications }) {
  return (
    <ul>
      {applications.map((application) => (
        <li key={application._id}>
          <div>
            {application.typeCategory} - {application.name}
          </div>
          <div>
            {application.address}, {application.city} {application.zipCode},{" "}
            {application.country}
          </div>
          <div>{application.price}€</div>
        </li>
      ))}
    </ul>
  )
}

export default ResultsPage
