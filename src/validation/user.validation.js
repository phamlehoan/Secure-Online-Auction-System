import { check } from "express-validator";
import { updateUserMess } from "../langs/us/notification.us";

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

UserValid.checkPassword = [
    check('currentPassword',updateUserMess.pass.oldPass)
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&_-]{8,}$/),
    check('newPassword',updateUserMess.pass.newPass)
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&_-]{8,}$/),
    check('confirmPassword',updateUserMess.pass.confirmPass)
        .custom((value,{req}) => value === req.body.newPassword)
];

UserValid.checkApplySeller = [
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
export default UserValid;
