import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    orderId : {
        type : String,
        required : [true,"Provide OrderId"],
        unique : true
    },
    productId : {
        type : mongoose.Schema.ObjectId,
        ref : "product"
    },
    product_details : {
        name : String,
        image : Array,
    },
    paymentId : {
        type : String,
        default : ""
    },
    payment_Status : {
        type : String,
        default : "pending"
    },
    delivery_address : {
        type : mongoose.Schema.ObjectId,
        ref : 'address'
    },
    subTotalAmt : {
        type : Number,
        default : 0,
    },
    totalAmt : {
        type : Number,
        default : 0,
    },
    invoice_reciept : {
        type : String,
        default : ""
    }

},{
    timestamps : true 
})

const OrderModel = mongoose.model('order',orderSchema)

export default OrderModel