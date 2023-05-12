const Students = require("../models/Students")

exports.index = async (req, res) => {
    const data = await Students.find({})
    if (data) {
        res.json({
            title: 'All students',
            length: data.length,
            data: data
        })
    }
}
exports.show = async (req, res) => {
    const data = await Students.findById(req.params.id)
    if (data) {
        res.json({
            title: 'Special student',
            data: data
        })
    }
}
exports.create = (req, res) => {
    let { firstName, lastName, email, phoneNumber, ParentsPhoneNumber, password } = req.body
    if (firstName && lastName && email && phoneNumber || ParentsPhoneNumber && password) {
        let student = new Students({
            firstName,
            lastName,
            email,
            phoneNumber,
            ParentsPhoneNumber,
            password
        })
        student.save()
            .then(data => {
                res.json({
                    title: 'Student created',
                    data: data
                })
            })
    } else {
        res.json('Malumot toliq emas')
    }
}
exports.remove = async (req, res) => {
    const data = await Students.findByIdAndDelete(req.params.id)
    if (data) {
        res.json({
            title: 'Student Deleted'
        })
    }
}
exports.edit = async (req, res) => {
    let { firstName, lastName, email, phoneNumber, ParentsPhoneNumber, password } = req.body
    if (firstName || lastName || email || phoneNumber || ParentsPhoneNumber || password) {
        const data = await Students.findByIdAndUpdate(req.params.id, req.body)
        if (data) {
            res.json({
                title: 'Student edited',
                data: data
            })
        }
    } else {
        res.json('Malumot yoq')
    }
}