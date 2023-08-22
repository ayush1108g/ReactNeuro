const resources = require('./../schema/material/resources');

exports.getresources = async (req, res) => {
    try {
      const newresources = await resources.find();
      res.status(200).json({
        status: "success",
        data: {
          newresources,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };
  exports.createresources = async (req, res) => {
    try {
      const newresources = await resources.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          resources: newresources,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        massage: "invalid request",
      });
    }
  };