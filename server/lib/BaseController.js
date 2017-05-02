'use strict';
/*
All methods return a promise.
*/

module.exports = class BaseController {
  constructor(model) {
      this.model = model || {}
  }

  find(req, res, next) {
    return this.model.find(req.query)
    .then(collection => res.status(200).json(collection))
    .catch(err => next(err));
  }

  findOne(req, res, next) {
    return this.model.findOne(req.body)
      .then(doc => {
        if (!doc) { return res.status(404).json({ error: 'Invalid Credentials. The username and password does not match.'}); }
        return res.status(200).json(doc);
      })
      .catch(err => next(err));
  }

  findById(req, res, next) {
    return this.model.findById(req.params.id)
    .then(doc => {
      if (!doc) { return res.status(404).end(); }
      return res.status(200).json(doc);
    })
    .catch(err => next(err));
  }

  create(req, res, next) {
    return this.model.create(req.body)
    .then(doc => res.status(201).json(doc))
    .catch(err => next(err));
  }

  update(req, res, next) {
    const conditions = { _id: req.params.id };

    return this.model.update(conditions, req.body)
    .then(doc => {
      if (!doc) { return res.status(404).end(); }
      return res.status(200).json(doc);
    })
    .catch(err => next(err));
  }

  remove(req, res, next) {
    return this.model.remove(req.params.id)
    .then(doc => {
      if (!doc) { return res.status(404).end(); }
      return res.status(204).end();
    })
    .catch(err => next(err));
  }

}