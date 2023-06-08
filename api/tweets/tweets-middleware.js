const validator = require("validator");

const checkPayload = (req, res, next) => {
  try {
    const { content } = req.body;


    if (content.length > 280) {
      res.status(400).json({ message: "Text cannot be more than 280 characters." });
    } else if (!content.length) {
      res.status(400).json({ message: "Text is required." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};



module.exports = { checkPayload };
