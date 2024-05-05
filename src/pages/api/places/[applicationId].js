import { createRoute } from "@/api/createRoute"
import { ApplicationModel } from "@/database/models/Application"
 
const handler = createRoute(async (req, res) => {
  const { applicationId } = req.query
  const application = await ApplicationModel.findById(applicationId)
 
  if (!application) {
    res.status(404).send({ error: "not found" })
 
    return
  }
 
  // GET /applications/[applicationId] -> read resource item
  if (req.method === "GET") {
    res.send(application)
 
    return
  }
 
  // PATCH /applications/[applicationId] -> update resource item
  if (req.method === "PATCH") {
    const { typeCategory, name, address, city, zipCode, country, price } =
      req.body
 
    Object.assign(application, {
      typeCategory: typeCategory || application.typeCategory,
      name: name || application.name,
      address: address || application.address,
      city: city || application.city,
      zipCode: zipCode || application.zipCode,
      country: country || application.country,
      price: price || application.price,
    })
 
    await application.save()
 
    res.send(application)
 
    return
  }
 
  // DELETE /applications/[applicationId] -> delete resource item
  if (req.method === "DELETE") {
    await application.deleteOne()
 
    res.send(application)
  }
})
 
export default handler
 