import mongoose from "mongoose";

export default async () => {
    return mongoose.connect(
      "mongodb+srv://oralpath:Oralpath123@cluster0.msq551o.mongodb.net/oralpathDB?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
};