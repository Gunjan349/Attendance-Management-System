const Subject = require('../Models/subjectModel.js');

module.exports.addSubject = async (req,res) => {
    const {subject, teacher} = req.body;
    const newSubject = new Subject({
        subject,
        teacher
    });

    const isSaved = await newSubject.save();

    if(isSaved) {
        return res.send({code : 200 , message: "subject saved successfully." , data: newSubject})
    }
    else {
        return res.send({code : 400 , message: "something went wrong."})
    }
};

module.exports.getSubjects = async (req, res) => {
    const subjects = await Subject.find();
    if(subjects) {
        return res.send({code : 200 , message: "subjects fetched successfully." , data: subjects})
    }
    else {
        return res.send({code : 400 , message: "something went wrong."})
    }
};
