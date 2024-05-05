import axios from "axios"
import { useState } from "react"
import { Button } from "@/components/Button"
 
export const getServerSideProps = async () => {
  const { data } = await axios("http://localhost:3000/api/application")
 
  return {
    props: { initialApplications: data },
  }
}
const HomePage = ({ initialApplications }) => {
  const [applications, setApplications] = useState(initialApplications)
  const handleDelete = (applicationId) => async () => {
    /*Console.log("Deleting application")*/
    const deletedApplication = applications.find(({ _id }) => _id === applicationId)
    const newApplications = applications.filter(({ _id }) => _id !== applicationId)
    setApplications(newApplications)
 
    try {
      await axios.delete(`/api/places/${applicationId}`)
    } catch (err) {
      /*Console.error("Error deleting application:", err)*/
      setApplications([...newApplications, deletedApplication])
    }
  }
 
  return (
    <ul>
      {applications.map(
        ({ _id, typeCategory, name, address, city, zipCode, country, price }) => (
          <li key={_id}>
            <div>
              <p>{name}</p>
              <p>Category: {typeCategory}</p>
              <p>Address: {address}</p>
              <p>City: {city}</p>
              <p>Zip Code: {zipCode}</p>
              <p>Country: {country}</p>
              <p>Price: {price}</p>
            </div>
            <Button onClick={handleDelete(_id)}>DELETE</Button>
          </li>
        )
      )}
    </ul>
  )
}
 
export default HomePage
 