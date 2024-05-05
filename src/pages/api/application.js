import { createRoute } from "@/api/createRoute"
import { ApplicationModel } from "@/database/models/Application"
 
const handler = createRoute(async (req, res) => {
  // GET /applicationx -> read resource collection
  if (req.method === "GET") {
    const { category } = req.query
    const lieux = await ApplicationModel.find(
      category ? { typeCategory: category } : {},
    )
 
    res.send(lieux)
 
    return
  }
 
  // POST /applicationx -> create resource
  if (req.method === "POST") {
    const newApplication = new ApplicationModel(req.body)
 
    await newApplication.save()
 
    res.send(newApplication)
  }
})
 
export default handler
 