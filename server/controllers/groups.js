const Teachers = require("../models/Teachers")

exports.index = async (req, res) => {
    const { idTeacher } = req.query
    const data = await Teachers.findById(idTeacher, ["group"])
    if (data) {
        res.json({ title: 'All teacher', data })
    }
}
// exports.show = async (req, res) => {
//     const data = await Teachers.findById(req.params.id)
//     if (data) {
//         res.json({ title: 'Special teacher', data })
//     }
// }
exports.create = async (req, res) => {
    let { title, day, time } = req.body
    let { idTeacher } = req.query
    try {
        const idTeacherCheck = await Teachers.findById(idTeacher)
        if (title && day && time) {
            const data = await Teachers.findByIdAndUpdate(idTeacher, { $push: { group: req.body } })
            if (data) {
                res.json({ title: 'Group added to teacher', data })
            } else {
                res.json('Xatolik')
            }
        } else {
            res.json('Malumot toliq emas')
        }
    }
    catch (err) {
        res.json({ title: 'Error', err })
    }
}
exports.remove = async (req, res) => {
    if (req.query.idTeacher && req.query.idGroup) {
        const data = await Teachers.findByIdAndUpdate(req.query.idTeacher, { $pull: { group: { _id :req.query.idGroup}}})
        res.json({ title: 'Group Deleted' })
    }
}
// exports.edit = async (req, res) => {
//     let { firstName, lastName, email, phoneNumber, password, subject } = req.body
//     if (firstName || lastName || email || phoneNumber || password || subject) {
//         const data = await Teachers.findByIdAndUpdate(req.params.id, req.body)
//         if (data) {
//             res.json({ title: 'Teacher Updated', data: data })
//         }
//     } else {
//         res.json('Malumot yoq')
//     }
// }