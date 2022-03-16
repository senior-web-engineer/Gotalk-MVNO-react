exports.getPagination = (page = 1, per_page = 50) => {
    page = Number(page);
    per_page = Number(per_page);
    if (isNaN(page) || page <= 0) throw Error("Pagination error. Page number must be a positive number other than 0")
    if (isNaN(per_page) || per_page <= 0) throw Error("Pagination error. Per page number must be a positive number other than 0")
    const page_num = page - 1;
    const limit = per_page ? +per_page : 3;
    const offset = page_num ? page_num * limit : 0;
    return {limit, offset, page};
};

exports.getPagingData = (data, page, limit) => {
    let next_page = 1;
    if (page < Math.ceil(data.count / limit)) next_page = page + 1;
    if (page >= Math.ceil(data.count / limit)) next_page = null;
    return {
        data: data.rows,
        meta: {
            total: data.count ?? 0,
            page: Math.ceil(data.count / limit),
            per_page: limit,
            current_page: page ? +page : 1,
            next_page: next_page
        }
    };
};


exports.queueConstructor = (req, res, options = {}, Model) => {
    options = checkCompany(req, res, options, Model);
    options = checkUser(req, res, options, Model);
    // sort
    // filters
    return options;
};

function checkCompany(req, res, options = {}, Model) {
    const {user} = req;
    if (user && user.company_id && user.role !== "Owner") {
        if (!options.where) options.where = {};
        if (Model.name === "Company") {
            if (req.params.id != user.company_id)
                return res.status(404).json({message: "Do not have permission"});
            options.where.id = req.params.id ? req.params.id : user.company_id;
        } else
            options.where.companyId = user.company_id;
    }
    return options;
};

function checkUser(req, res, options = {}, Model) {
    const {user} = req;
    if (user && user.id && user.role !== "Owner") {
        if (!options.where) options.where = {};
        if (Model.name === "User") {
            if (req.params.id != user.id)
                return res.status(404).json({message: "Do not have permission"});
            options.where.id = user.id;
        }
    }
    return options;
};

exports.excludeAttributes = (attributes, keys) => {
    if (!attributes) return null;
    for (const key of keys) {
        delete attributes[key];
    }
    return attributes
};

exports.includeAttributes = (attributes, keys) => {
    if (!attributes) return null;
    let data = {};
    for (const key of keys) {
        if (attributes[key])
            data[key] = attributes[key];
    }
    return data
};