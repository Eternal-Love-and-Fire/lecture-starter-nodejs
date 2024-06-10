const responseMiddleware = (req, res, next) => {
  res.sendResponse = (data, status = 200) => {
    res.status(status).json({ data });
  };

  res.sendError = (message, status = 400) => {
    res.status(status).json({ error: true, message });
  };

  res.sendNotFound = (message = "Not Found") => {
    res.status(404).json({ error: true, message });
  };

  next();
};

export { responseMiddleware };
