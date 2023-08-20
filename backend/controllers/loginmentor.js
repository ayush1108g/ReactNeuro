const mentorsignup = require("./../schema/student/signup");
exports.getmentorsignup = async (req, res) => {
  try {
    const newmentorsignup = await mentorsignup.find();
    res.status(200).json({
      status: "success",
      data: {
        newmentorsignup,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.creatementorsignup = async (req, res) => {
  try {
    const newmentorsignup = await mentorsignup.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        mentorsignup: newmentorsignup,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      massage: "invalid request",
    });
  }
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.emailid || !req.body.password) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
  next();
};
