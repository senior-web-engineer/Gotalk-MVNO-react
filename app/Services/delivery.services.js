const {v4} = require('uuid');
const db = require("../Models/index");
const Delivery = db.Delivery;
const UserSimPlan = db.UserSimPlan;

class DeliveryServices {

    async create(data,isAdmin=false){
        console.log(data);
        data.deliveryId = data.deliveryId || v4();
        const delivery = await Delivery.create(data);
        if (isAdmin) await UserSimPlan.update({ deliveryId: delivery.id }, {where: {id: data.productId}});
        return delivery.id;
    };

    async delivered(deliveryId){
        return await Delivery.update({status: 'delivered'}, {where: {id: deliveryId}});
    };
}

module.exports = {
    DeliveryServices,
    deliveryServices: new DeliveryServices()
};