let productModel = require('./productModel');

const productList = async (req, res) => {
    try {
        let filter =  req.body?.filter
        let sortingColumn = req?.body?.sorting?.sortBy;
        let sortingDirection = 1;
        if (req?.body?.sorting?.direction == "asc") {
            sortingDirection = -1;
        }
        let page = ( req.body.page != undefined) ? req.body.page : 0;
        let limit = ( req.body.limit != undefined) ? req.body.limit : 100;
        let query = {
            availability : "inStock"
        }

        if(filter?.category) {
            query['category'] = filter?.category
        }
        if(filter?.priceStart) {
            query.price = { $gte: filter?.priceStart }
        }
        if(filter?.priceEnd) {
            query.price = { $lte: filter?.priceEnd }
        }
       
        if(filter?.priceStart && filter?.priceEnd) {
            query.price = { $gte: filter?.priceStart, $lte: filter?.priceEnd }
        }
       
        if(req?.body?.serach) {
            query.name = { $regex: req?.body?.serach, $options: 'i' }
        }
        let sort = {
            [`${sortingColumn}`] :sortingDirection 
        }
        
        let result = await productModel.find(query).sort(sort)
        let paginate =  await productModel.paginate(query, { page, limit: limit })
        
        if (result) {
            res.status(200).send({ status: true, message: "Successs", data : result, paginate : paginate })
        } else {
            res.status(500).send({ status: false, message: "failed" })
        }
    } catch (error) {
        res.status(200).send({ status: false, message: "Something went wrong " })
    }


}
const create = async (req, res) => {
    try {
        let data = req.body
        const product = new productModel(data)
        let result = await product.save()
        if (result) {
            res.status(200).send({ status: true,message: "Successs" })
        } else {
            res.status(500).send({ status: false, message: "fail" })
        }
    } catch (error) {
        res.status(500).send({ status: false, message: "Something went wrong " })
    }
}
const deleteProduct = async (req, res) => {
    try {
        let id = req.params.id
        const result = await productModel.deleteOne({ _id: id })
        if (result) {
            res.status(200).send({ status: true,message: "Successs" })
        } else {
            res.status(500).send({ status: false, message: "fail" })
        }
    } catch (error) {
        res.status(500).send({ status: false, message: "Something went wrong " })
    }
}
const updateProduct = async (req, res) => {
    try {
        let id = req.params.id
        let dataToUpdate = req.body;
        const result = await productModel.updateOne({ _id: id }, dataToUpdate)
        if (result) {
            res.status(200).send({ status: true,message: "Successs" })
        } else {
            res.status(500).send({status: false, message: "failed" })
        }
    } catch (error) {
        res.status(500).send({ status: false, message: "Something went wrong " })
    }
}


module.exports = {
    productList, create, deleteProduct, updateProduct
}