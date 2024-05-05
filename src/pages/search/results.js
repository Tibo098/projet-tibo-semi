import { useState } from "react"
import axios from "axios"

export const getServerSideProps = async () => {
  const { data } = await axios("http://localhost:3000/api/application")
 
  return {
    props: { initialApplications: data },
  }
}
 
function ResultsPage({ initialApplications, filter }) {
  const [applications] = useState(initialApplications)
  const filteredApplications = applications.filter((application) => {
    // Convert search term to lower case for case-insensitive comparison
    const searchTerm = filter.toLowerCase()
    // Check if any of the attributes includes the search term
    // This assumes all values are strings; adjust accordingly if there are other types
 
    return (
      application.typeCategory.toLowerCase().includes(searchTerm) ||
      application.name.toLowerCase().includes(searchTerm) ||
      application.city.toLowerCase().includes(searchTerm) ||
      application.price.toLowerCase().includes(searchTerm) ||
      application.zipCode.toLowerCase().includes(searchTerm) ||
      (application.country && application.country.toLowerCase().includes(searchTerm))
    )
  })
 
  return (
    <div>
      <ul>
        {filteredApplications.map((application) => (
          <li key={application._id}>
            <div>
              {application.typeCategory} - {application.name}
            </div>
            <div>
              {application.address} {application.city} {application.zipCode} {application.country}{" "}
              {application.price}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
 
export default ResultsPage