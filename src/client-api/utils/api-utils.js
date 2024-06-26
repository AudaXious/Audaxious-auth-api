

export const validateRequest =
  (schema) => (req, res, next) => {
    const { error } = schema.validate(
      req?.body ? req.body : req?.params ? req.params : req.query
    );

    if (error) {
      return res.status(400).json({
        success: false,
        error: { 
          code: 400, 
          message: error.details[0].message },
      });
    }

    return next();
  };

