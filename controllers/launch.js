const Launch = require("../models/lunch");


/**
 * METHOD: POST
 * @api {post} /api/launch Create Launch Item
 * @apiName createLaunch
 */
exports.createLaunch = async (req, res, next) => {
    try {
        const launch = await Launch.create(req.body);
        res.status(201).json({
            success: true,
            data: launch,
            message: 'Launch created successfully',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Launch created failed',
        });
    }
};

/**
 * METHOD: GET
 * @api {get} /api/launch Get All Launch Items
 * @apiName getAllLaunch
 */
exports.getAllLaunch = async (req, res, next) => {
    try {

        const launches = await Launch.find({});
        res.status(200).json({
            success: true,
            data: launches,
            message: '',
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'All Launch Items failed',
        });
    }
};

/**
 * METHOD: GET
 * @api {get} /api/launch/:id Get Launch Item
 * @apiName getLaunch
 */
exports.getLaunch = async (req, res) => {
    try {
        const launch = await Launch.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: launch,
            message: 'Launch Item',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Launch Item failed',
        });
    }
};

