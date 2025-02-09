require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const personSchema = new Schema({
  name: { type: String, require: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
  person.save((err,data)=>{
    if (err) return  console.error(err);
    done(null ,data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err,data)=>{
    if (err) return  console.error(err);
    done(null ,data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err,data)=>{
    if (err) return  console.error(err);
    done(null ,data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,data)=>{
    if (err) return  console.error(err);
    done(null ,data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId},(err,data)=>{
    if (err) return  console.error(err);
    done(null ,data);
  })
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  const person = await Person.findById({_id:personId}).exec()
  person.favoriteFoods.push(foodToAdd)
  person.save((err,data)=>{
    if (err) return  console.error(err);
    done(null ,data);
  })
};

const findAndUpdate =async (personName, done) => {
  const ageToSet = 20;
  const {_id} = await  Person.findOne({name:personName})
  Person.findByIdAndUpdate(_id,{age:ageToSet},{new:true},(err,data)=>{
    if (err) return  console.error(err);
    done(null ,data);
  })
};

const removeById = (personId, done) => {
  Person.deleteOne(personId,(err,data)=>{
    if (err) return  console.error(err);
    done(null ,data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({name:nameToRemove},(err,data)=>{
    if (err) return  console.error(err);
    done(null ,data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
    .find({favoriteFoods:foodToSearch})
    .sort({name:1})
    .limit(2)
    .select(['name','favoriteFoods'])
    .exec((err,data)=>{
      if (err) return  console.error(err);
    done(null ,data);
    })
  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
