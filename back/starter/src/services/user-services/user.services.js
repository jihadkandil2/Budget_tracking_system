import User from "../../models/user.model.js"
// ------------------------------- signup ------------------------------
export const addUser = async (req, res) => {

    try {
        const newUser = await User.create(req.body);
        const userId = newUser._id
        res.status(201).json({
            status: 'success',
            userId
        })
    } catch (err) {
        const firstErrorKey = Object.keys(err.errors || {})[0];
        if (firstErrorKey == 'name') {
            return res.status(400).json({
                status: 'fail',
                message: 'name is required !',

            })
        } else if (firstErrorKey == 'password') {
            return res.status(400).json({
                status: 'fail',
                message: 'password is required !',

            })
        } else if (firstErrorKey == 'email') {
            return res.status(400).json({
                status: 'fail',
                message: 'email is required ',

            })
        }
        else if (err.code === 11000) {

            return res.status(400).json({
                status: 'fail',
                message: 'email already exists !',
            });
        }
    }

}


// ------------------------------------login -----------------------------
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!req.body.email) {
        return res.status(400).json({
            status: 'fail',
            message: 'email is required ',

        })
    } else if (!req.body.password) {
        return res.status(400).json({
            status: 'fail',
            message: 'password is required ',

        })
    }


    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found!',
            });
        }

        const userPassword = user.password;
        if (userPassword != password) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password!',
            });
        }
        const userId = user._id;

        return res.status(200).json({
            status: 'success',
            message: 'logged in successfully',
            userId

        })
    } catch (err) {
        return res.status(500).json({
            status: 'fail',
            err
        })
    }
}



// ------------------------------- update user by Id------------------------------
export const updateUser = async (req, res) => {

    try {

        const { userId } = req.params;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });
        console.log(updatedUser);

        if (!updatedUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'user not found'
            })
        }
        return res.status(200).json({
            status: 'success',
            result: updatedUser
        })

    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: 'error updating Income',
            err
        })
    }
}



