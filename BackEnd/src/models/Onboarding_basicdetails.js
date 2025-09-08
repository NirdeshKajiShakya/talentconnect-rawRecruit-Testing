import mongoose from "mongoose";

const basicDetailsSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  profileType: String,
  // profileImage: {
  //   type: String,
  //   default:
  //     "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  // },
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required :true },
});

export default mongoose.model("BasicDetail", basicDetailsSchema);
