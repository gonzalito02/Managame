const bcrypt = require('bcrypt');
const { Student, Rol } = require("C:/Users/gonza/Desktop/Managame/Managame/back/src/db.js");

async function createStudent(data) {

    const { id, name, password, email, rol } = data;
    try {

        const genSalt = await bcrypt.genSalt(5);
       
        const hash = bcrypt.hashSync(password, genSalt);
        //? crear usuario y asignar rol user por defecto 
        const role = await Rol.findOne({ where: { name: rol }});
        //const role = await Rol.findAll()
        
        
        const student = await Student.create({
            id: id,
            name: name,
            email: email,
            password: hash    
        });  
        
        //? asignar rol a userxrol 
        await role.addStudents(student);

        //await student.addRols(role);
        
        //student.password = undefined;

        //? enviar email de confirmacion de registro

        // ------------------------
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'bookstore1511@gmail.com',
        //         pass: 'qyrvkdsvuzwgotne'
        //     }
        // });
        // const mailOptions = {
        //     from: "BookStore <",
        //     to: user.email,
        //     subject: 'Confirmation of registration',
        //     text: 'Hello ' + user.name + ' ' + user.lastName + '\n\n' +
        //         'Thank you for registering on BookStore.\n' +
        //         'To confirm your registration, please click on the following link:\n\n' +
        //         'http://localhost:3000/confirmation/' + user.idUser + '\n\n' +
        //         "If it doesn't work, copy and paste the link into your browser.\n\n" +
        //         'Thank you,\n' +
        //         'BookStore'
        // };
        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });

        // ------------------------

        //? respuesta

        if (student.dataValues.id > 0) return ({message: `Student (id: ${id}, name: ${name}) generated`})

    } 

    catch (e) {
        throw new Error("Cannot create the student.")
    }

}


async function getStudentId(id) {
    
    try {
        const student = await Student.findByPk(id,{
            attributes: { exclude: ['password'] },
            include: {
                model: Rol,
                attributes: ['name']
            }
        });
        
        if (student) res.json(student);
        
    } catch (e) {
        throw new Error("Cannot find the student whit that id.")
    }
}

async function getStudents() {

    try {

        const count = await Student.count();

        const students = await Student.findAll({
            attributes: { exclude: ['password'] },
            include: {
                model: Rol,
                attributes: ['name']
            },
        })
        
        if (students) res.send({message:"Students obtained", total: count})
    
    } catch (e) {

        throw new Error("Cannot find the students")
    
    }
}

async function updateStudent(id, {name, password, email}) {
    
    try {
        const student = await Student.findOne({ where: { id: id } });
        
        if (!student) res.send("El usuario no existe")

        if (req.body.email) {
            delete req.body.email;
        }

        if (password) {
            const genSalt = await bcrypt.genSalt(5);
            const hash = bcrypt.hashSync(password, genSalt);
        }


        const change = await Student.update({
                                where: { id: id }
                            },
                            {
                                name: name,
                            },
                            {
                                email: email,
                            },
        );
        
        if (change) res.send(change)
   
    } catch (e) {

        throw new Error("Cannot change the student's data")
    
    }
}

async function deleteStudent(id) {

    try {
        
        const student = await Student.findOne({ where: { id: id } });

        if (!student) res.send("No student found")

        const destroy = await Student.destroy({ where: { id: id } });
        
        if (destroy) res.send(destroy)
    } 
    catch (e) {

        throw new Error("No student found")

    }
}

module.exports = { createStudent, getStudents, getStudentId, updateStudent, deleteStudent };

