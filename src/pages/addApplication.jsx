import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import { listCategory, listCountries } from "@/utils/constant"
import axios from "axios"
import { Formik } from "formik"
import { useState } from "react"
import * as yup from "yup"

export const getServerSideProps = async () => {
  const { data: applications } = await axios("http://localhost:3000/api/application")
 
  return {
    props: {
      applications,
    },
  }
}
const initialValues = {
  description: "",
  category: "Application",
}
const validationSchema = yup.object({
  typeCategory: yup.string().required().oneOf(listCategory),
  name: yup.string().min(1).required(),
  address: yup.string().min(1).required(),
  city: yup.string().min(1).required(),
  zipCode: yup.string().min(1).required(),
  country: yup.string().min(1).required(),
  price: yup.string().min(1).required()
})
// eslint-disable-next-line max-lines-per-function
const ApplicationsPage = (props) => {
  const { applications: initialApplications } = props
  const [applications, setApplications] = useState(initialApplications)
  const submit = async (values, { resetForm }) => {
    const { data: newApplication } = await axios.post("/api/application", values)
    setApplications([newApplication, ...applications])
    resetForm()
  }
 
  return (
    <div className="flex flex-col gap-8">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={submit}
      >
        <Form>
          <FormField component="select" name="typeCategory" applicationholder="Category">
            {listCategory.map(typeCategory => (
              <option key={typeCategory} value={typeCategory}>{typeCategory}</option>
            ))}
          </FormField>
          <FormField name="name" applicationholder="Name" />
          <FormField name="address" applicationholder="Address" />
          <FormField name="city" applicationholder="City" />
          <FormField name="zipCode" applicationholder="Zip Code" />
          <FormField component="select" name="country" applicationholder="Country">
            {listCountries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </FormField>
          <FormField name="price" applicationholder="Price" />
          <Button type="submit">ADD</Button>
        </Form>
      </Formik>
    </div>
  )
}
 
export default ApplicationsPage