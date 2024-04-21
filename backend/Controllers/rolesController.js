const Role = require('../Models/rolesModel.js');

module.exports.addRole = async (req,res) => {
    const role = req.body.role;
    const permissions = req.body.permissions;

    const newRole = new Role({ role,
         permissions
    });

    const isSaved = await newRole.save();

    if (isSaved) {
        return res.send({
            code: 200,
            message: "Role added successfully.",
            data: isSaved
        });
    } else {
        return res.send({
            code: 400,
            message: "Role not added.",
            data: isSaved
        });
    }
}