const userM = require('../model/Users.m');
const doctorM = require('../model/Doctors.m');
const adminM = require('../model/Admin.m');
const CryptoJS = require('crypto-js');
const hashLength = 64;

exports.render = async (req, res, next) => {

    try {

        res.render('login', { errWrongPassword: "none", errWrongUsername: "none", display1: "d-block", display2: "d-none", role: "patient" });

    } catch (err) {

        next(err);

    }

}

exports.check = async (req, res, next) => {

    try {

        var user = req.body;

        if (user.role == "patient") {

            userM.getByUsername(user.Username).then(rs => {

                if (rs.length == 0) {

                    res.render('login', { errWrongPassword: "none", errWrongUsername: "block", Username: user.Username, Password: user.Password, display1: "d-block", display2: "d-none", role: user.role });

                    return false;

                } else {

                    const pwDb = rs[0].Password;

                    const salt = pwDb.slice(hashLength);

                    const pwSalt = user.Password + salt;

                    const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);

                    if (pwDb !== (pwHashed + salt)) {

                        res.render('login', { errWrongPassword: "block", errWrongUsername: "none", Username: user.Username, Password: user.Password, display1: "d-block", display2: "d-none", role: user.role });

                        return false;

                    }

                    req.session.Username = rs[0].Username;

                    req.session.Name = rs[0].Name;

                    res.redirect('/');

                    return true;

                }

            })

        } else if (user.role == "doctor") {

            doctorM.getByUsername(user.Username).then(rs => {

                if (rs.length == 0) {

                    res.render('login', { errWrongPassword: "none", errWrongUsername: "block", Username: user.Username, Password: user.Password, display1: "d-block", display2: "d-none", role: user.role });

                    return false;

                } else {

                    if (rs[0].Password !== user.Password) {

                        res.render('login', { errWrongPassword: "block", errWrongUsername: "none", Username: user.Username, Password: user.Password, display1: "d-block", display2: "d-none", role: user.role });

                        return false;

                    }

                    req.session.Username = rs[0].Username;

                    req.session.Name = rs[0].Name;

                    req.session.Doctor = true;

                    res.redirect('/');

                    return true;

                }

            })

        } else if (user.role == "admin") {
            adminM.getByUsername(user.Username).then(rs => {
                if (rs.length === 0 || rs[0].Password !== user.Password) {
                    res.render('login', { errWrongPassword: "block", errWrongUsername: "none", Username: user.Username, Password: user.Password, display1: "d-block", display2: "d-none", role: user.role });
                } else {
                    // Thiết lập session và chuyển hướng đến trang chính
                    req.session.Username = rs[0].Username;
                    req.session.Name = rs[0].Name;
                    req.session.Admin = true;
                    req.session.Patient = false; // Đảm bảo không có vai trò Patient
                    req.session.Doctor = false; // Đảm bảo không có vai trò Doctor
                    res.redirect('/');
                }
            });
        }


    } catch (err) {

        next(err);

    }

};