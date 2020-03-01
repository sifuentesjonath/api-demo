'use strict'
const connectDb = require('./db')
const {ObjectID} = require ('mongodb')

module.exports= {
    getCourses: async () => {
         let db 
         let courses =[]
         try {
             db = await connectDb()
             courses = await db.collection('courses').find().toArray()
         } catch (error) {
             console.error(error)   
         }
         return courses
        },
    getCourse: async (root, {_id}) =>{
        let db 
        let course
        try {
            db = await connectDb()
            course = await db.collection('courses').findOne({_id: ObjectID(_id)})
        } catch (error) {
            console.error(error)   
        }
        return course
    },
    getPersons: async () => {
        let db 
        let students =[]
        try {
            db = await connectDb()
            students = await db.collection('students').find().toArray()
        } catch (error) {
            console.error(error)   
        }
        return students
       },
   getPerson: async (root, {_id}) =>{
       let db 
       let student
       try {
           db = await connectDb()
           student = await db.collection('students').findOne({_id: ObjectID(_id)})
       } catch (error) {
           console.error(error)   
       }
       return student
   },
   searchItems: async (root, {keyword}) =>{
    let db 
    let items
    let courses
    let persons
    try {
        db = await connectDb()
        courses = await db.collection('courses').find({ $text: { $search: keyword }}).toArray()
        persons = await db.collection('students').find({$text: { $search: keyword }}).toArray()
        items = [...courses , ...persons]
    } catch (error) {
        console.error(error)   
    }
    return items
}
}