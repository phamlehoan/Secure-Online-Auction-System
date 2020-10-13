import {check} from "express-validator/check";
import {updateUserMess} from "../langs/us/notification.us";

const UserValid = {}


UserValid.checkUserUpdate = [
    check("username", updateUserMess.err.username)
        .optional()
        .isLength({min:3, max:30})
        .matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/),
    check("personalInfo.firstname", updateUserMess.err.firstname)
        .optional()
        .isLength({min:1, max:15})
        .matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/),
    check("personalInfo.lastname", updateUserMess.err.lastname)
        .optional()
        .isLength({min:1, max:15})
        .matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/),
    check("gender", updateUserMess.err.gender)
        .optional()
        .isIn(["male","female"]),
    check("personalInfo.address.city", updateUserMess.err.city)
        .optional()
        .isLength({min:3, max:30}),
    check("personalInfo.address.district", updateUserMess.err.district)
        .optional()
        .isLength({min:3, max:30}),
    check("personalInfo.address.detailAddress", updateUserMess.err.detailAddress)
        .optional()
        .isLength({min:3, max:100}),
    check("phone",updateUserMess.err.phone)
        .optional()
        .isLength({min:10,max:11})
        .matches(/^(0)[0-9]{9,10}$/)
];

// let checkPassword = [
//     check('currentPassword',messErr.currenPassword)
//         .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
//     check('newPassword',messErr.newPassword)
//         .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
//     check('confirmPassword',messErr.confirmPassword)
//         .custom((value,{req}) => value === req.body.newPassword)
// ]

export default UserValid;
