import mongoose from 'mongoose'
  
  const Schema = new mongoose.Schema({
    rank: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    donateDate: { type: String, required: true },
    needs: { type: String, required: true },
    whoNeeds: { type: String, required: true, default: 'Unknown' },
    deliveryOfAid: { type: String, required: true },
    whetherDelivered: { type: String, required: true }
  },{
    versionKey:false
  });


export default Schema