module.exports = function (mongoose) {
  const modelName = "task";
  const { Types } = mongoose.Schema;

  const Schema = new mongoose.Schema({
    email: {
      type: Types.String,
      required: true,
      unique: true
    },
    password: {
      type: Types.String,
      required: true,
      exclude: true,
    }
  });
  
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {}
  };
  
  return Schema;
};